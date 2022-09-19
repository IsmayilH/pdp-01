# PDP -01

Simple application which shows planets information from Star Wars. Has two pages, home - where you can find card for planet and search - where you can make a search for planet you want to find.

## Libraries used in app

    * React Navigation v6
    * Firebase Authentication
    * Firebase Analytics
    * Detox e2e testing

## Launching the app

```
    yarn install
    cd ios && pod install

    yarn run ios
```

## Launching e2e testing

Should install node and detox globally

```
brew install node
arn global add detox-cli
```

Then we can start testing our app

```
    detox build -c ios
    detox test -c ios
```
