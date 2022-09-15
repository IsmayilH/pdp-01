describe('App', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
    });
  });

  const sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  async function switchToLogin() {
    await expect(element(by.id('switch-login'))).toBeVisible();
    await element(by.id('switch-login')).tap();
    await waitFor(element(by.id('login-button'))).toBeVisible();
    await expect(element(by.label('Login'))).toBeVisible();
    await expect(element(by.id('password-repeat-input'))).not.toBeVisible();
  }

  async function loginUser(email, password) {
    await element(by.id('email-input')).typeText(email);
    await element(by.id('password-input')).typeText(password);
    await element(by.id('login-button')).tap();
  }

  async function logout() {
    await element(by.id('logout-button')).tap();
    await waitFor(element(by.id('auth-screen'))).toBeVisible();
  }

  async function registerUser(email, password, passwordRepeat) {
    await expect(element(by.id('email-input'))).toBeVisible();
    await expect(element(by.id('password-input'))).toBeVisible();
    await expect(element(by.id('password-repeat-input'))).toBeVisible();
    await expect(element(by.id('register-button'))).toBeVisible();

    await element(by.id('email-input')).typeText(email);
    await element(by.id('password-input')).typeText(password);
    await element(by.id('password-repeat-input')).typeText(passwordRepeat);

    await element(by.id('register-button')).tap();
  }

  it('should show auth screen', async () => {
    await expect(element(by.id('auth-screen'))).toBeVisible();
    await expect(element(by.id('email-input'))).toBeVisible();
    await expect(element(by.id('password-input'))).toBeVisible();
    await expect(element(by.id('password-repeat-input'))).toBeVisible();
    await expect(element(by.id('register-button'))).toBeVisible();
    await expect(element(by.id('have-account'))).toBeVisible();
  });

  it('should switch to login on login button click', async () => {
    await switchToLogin();
  });

  it('should show error on incorrect login or  password', async () => {
    await switchToLogin();

    await loginUser('asm123mail.com', 'qwerty123');

    await waitFor(element(by.id('error'))).toBeVisible();
    await waitFor(
      element(by.text('That email address is invalid!')),
    ).toBeVisible();

    await element(by.id('error-done-button')).tap();

    await element(by.id('email-input')).typeText('asm123@mail.com');
    await element(by.id('password-input')).typeText('qwerty123');
    await element(by.id('login-button')).tap();

    await waitFor(element(by.id('error'))).toBeVisible();
    await waitFor(
      element(by.text('That email address is not found!')),
    ).toBeVisible();

    await element(by.id('error-done-button')).tap();

    await loginUser('asm@gmail.com', 'qwerty12345');

    await waitFor(element(by.id('error'))).toBeVisible();
    await waitFor(
      element(by.text('That password is incorrect!')),
    ).toBeVisible();
  });

  it('should login and logout user', async () => {
    await switchToLogin();

    await loginUser('asm@gmail.com', 'qwerty123');
    await sleep(2000);

    await expect(element(by.id('logout-button'))).toBeVisible();
    await element(by.id('logout-button')).tap();
    await waitFor(element(by.id('auth-screen'))).toBeVisible();
  });

  it('should register new user', async () => {
    let userEmail =
      'asm' + Math.floor(Math.random() * 1000000000) + '@gmail.com';

    await registerUser(userEmail, 'qwerty123', 'qwerty123456');

    await waitFor(element(by.id('error'))).toBeVisible();
    await waitFor(element(by.text("Password doesn't match"))).toBeVisible();
    await element(by.id('error-done-button')).tap();

    await registerUser('asm@gmail.com', 'qwerty123', 'qwerty123');

    await waitFor(element(by.id('error'))).toBeVisible();
    await waitFor(
      element(by.text('That email address is already in use!')),
    ).toBeVisible();
    await element(by.id('error-done-button')).tap();

    await registerUser('asmmail.com', 'qwerty123', 'qwerty123');

    await waitFor(element(by.id('error'))).toBeVisible();
    await waitFor(
      element(by.text('That email address is invalid!')),
    ).toBeVisible();
    await element(by.id('error-done-button')).tap();

    await registerUser(userEmail, 'qwerty123', 'qwerty123');
    await sleep(2000);

    await expect(element(by.id('home'))).toBeVisible();

    await expect(element(by.id('logout-button'))).toBeVisible();
    await element(by.id('logout-button')).tap();
    await waitFor(element(by.id('auth-screen'))).toBeVisible();
  });

  it('should go through application', async () => {
    await switchToLogin();
    await loginUser('asm@gmail.com', 'qwerty123');

    await sleep(1000);

    await waitFor(element(by.id('card')))
      .toBeVisible()
      .withTimeout(2000);
    await sleep(1000);
    await expect(element(by.id('card-wrapper'))).toBeVisible();
    await expect(element(by.id('card-content'))).toBeVisible();

    for (let i = 0; i <= 10; i += 1) {
      await element(by.id('next-button')).tap();
      await waitFor(element(by.id('card')))
        .toBeVisible()
        .withTimeout(3000);

      await expect(element(by.id('card-wrapper'))).toBeVisible();
      await expect(element(by.id('card-content'))).toBeVisible();
    }

    for (let i = 0; i <= 9; i += 1) {
      await element(by.id('prev-button')).tap();
      await waitFor(element(by.id('card')))
        .toBeVisible()
        .withTimeout(3000);

      await expect(element(by.id('card-wrapper'))).toBeVisible();
      await expect(element(by.id('card-content'))).toBeVisible();
    }

    sleep(2000);

    await expect(element(by.label('Search'))).toBeVisible();
    await element(by.label('Search')).tap();

    await expect(element(by.id('search-title-container'))).toBeVisible();
    await expect(element(by.id('search-title'))).toBeVisible();
    await expect(element(by.id('search-icon-container'))).toBeVisible();
    await expect(element(by.id('search-button'))).toBeVisible();
    await expect(element(by.id('search-tab'))).toBeVisible();
    await element(by.id('search-tab')).tap();
    await element(by.id('search-bar')).typeText('tat');
    await element(by.id('search-button')).tap();

    await waitFor(element(by.id('search-card')))
      .toBeVisible()
      .withTimeout(2000);
    await element(by.id('search-button')).tap();
    await waitFor(element(by.label('Planet Name - Tatooine')))
      .toBeVisible()
      .withTimeout(2000);

    await sleep(1000);
    await element(by.id('search-bar')).typeText('tatasd');
    await element(by.id('search-button')).tap();
    await element(
      by.label('OK').and(by.type('_UIAlertControllerActionView')),
    ).tap();

    await element(by.id('home-tab')).tap();
    await logout();
  });
});
