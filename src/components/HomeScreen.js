import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserFeed from './UserFeed';
import GroupeFeeds from './GroupeFeeds';
import FriendsFeeds from './FriendsFeeds';
import { Avatar } from 'react-native-elements';
import LandingScreen from './LandingScreen';
import SignOutButton from './SignOutButton';
import { useHomeListner } from '../hooks/useHomeListners';
import { useLandingScreen } from '../hooks/useLandingScreen';
import { AppStateContext } from '../../stateProvider';
import UpdateEvent from './Modals/UpdateEvent';
import ProfileNavigation from './ProfileNavigation';
const FeedTab = createMaterialTopTabNavigator();

function HomeScreen({ navigation }) {
  const { authContext } = useContext(AppStateContext);
  const [authState, authDispach] = authContext;
  const { user } = authState;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Avatar
          containerStyle={{ backgroundColor: 'blue', marginRight: 7 }}
          size={40}
          rounded
          title={`${user.name && user.name[0] + user.name[1]}`}
          onPress={() => {
            navigation.navigate('ProfileNavigation');
          }}
        />
      ),
    });
  }, [navigation, user.name]);

  const { listenOnGroups, listnerPublicEvents, listenOnEvents } =
    useHomeListner();

  useEffect(() => {
    const unsubscribeGroups = listenOnGroups();
    return unsubscribeGroups;
  }, [listenOnGroups]);
  useEffect(() => {
    const unsubscribeAllEvents = listenOnEvents();
    return unsubscribeAllEvents;
  }, [listenOnEvents]);
  useEffect(() => {
    const unsubscribePubEvents = listnerPublicEvents();
    return unsubscribePubEvents;
  }, [listnerPublicEvents]);
  return (
    <>
      <FeedTab.Navigator>
        <FeedTab.Screen
          options={{ tabBarLabel: 'Calendar' }}
          name="Calendar"
          component={LandingScreen}
        />
        <FeedTab.Screen
          options={{ tabBarLabel: 'Users' }}
          name="UserFeed"
          component={UserFeed}
        />
        <FeedTab.Screen
          options={{ tabBarLabel: 'Groups' }}
          name="GroupeFeeds"
          component={GroupeFeeds}
        />
      </FeedTab.Navigator>
    </>
  );
}
export default HomeScreen;
