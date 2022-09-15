import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import SearchScreen from '../screens/Search';
import {HomeIcon, SearchIcon} from '../components/icons';
import {useTheme} from 'react-native-paper';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: () => {
          if (route.name === 'Home') {
            return <HomeIcon testID="home-icon" color={colors.backdrop} />;
          } else {
            return <SearchIcon testID="search-icon" color={colors.backdrop} />;
          }
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
        },
        tabBarActiveTintColor: colors.primary,
        tabBarTestID: 'tab-bar',
      })}>
      <Tab.Screen
        // @ts-ignore
        testID="home-tab"
        options={{tabBarTestID: 'home-tab'}}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        // @ts-ignore
        testID="search-tab"
        options={{tabBarTestID: 'search-tab'}}
        name="Search"
        component={SearchScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
