import React, { useEffect, useLayoutEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserFeed from './UserFeed';
import GroupeFeeds from './GroupeFeeds';
import FriendsFeeds from './FriendsFeeds';
import { Avatar } from 'react-native-elements';
import LandingScreen from './LandingScreen';
import SignOutButton from './SignOutButton';
import { useHomeListner } from '../hooks/useHomeListners';
const FeedTab = createMaterialTopTabNavigator();

function HomeScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <SignOutButton navigation={navigation} />
          <Avatar
            containerStyle={{ backgroundColor: 'blue', marginRight: 7 }}
            size={40}
            rounded
            title="MD"
            onPress={() => {
              navigation.navigate('Profile');
            }}
          />
        </>
      ),
    });
  }, [navigation]);
  const { listenOnGroups } = useHomeListner();
  useEffect(() => {
    const unsubscribeGroups = listenOnGroups();
    return unsubscribeGroups;
  }, [listenOnGroups]);
  return (
    <>
      <FeedTab.Navigator>
        <FeedTab.Screen
          options={{ tabBarLabel: 'My Calendar' }}
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
        <FeedTab.Screen
          options={{ tabBarLabel: 'Friends' }}
          name="Friends"
          component={FriendsFeeds}
        />
      </FeedTab.Navigator>
    </>
  );
}
export default HomeScreen;
