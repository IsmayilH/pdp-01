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
            return <HomeIcon color={colors.backdrop} />;
          } else {
            return <SearchIcon color={colors.backdrop} />;
          }
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
        },
        tabBarActiveTintColor: colors.primary,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
