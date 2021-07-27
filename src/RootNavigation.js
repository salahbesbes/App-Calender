import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import Profile from './components/Profile';
import SignInScreen from './components/SignInScreen';
import SignUpScreen from './components/SignUpScreen';
import UpdateEvent from './components/Modals/UpdateEvent';
import ProfileNavigation from './components/ProfileNavigation';
import EventsGroupsScreen from './components/EventsGroupsScreen';
import { useHomeListner } from './hooks/useHomeListners';

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          // options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen
          options={{ headerLeft: null }}
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen name="UpdateEvent" component={UpdateEvent} />
        <Stack.Screen name="ProfileNavigation" component={ProfileNavigation} />
        <Stack.Screen name="AllEvents" component={EventsGroupsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
