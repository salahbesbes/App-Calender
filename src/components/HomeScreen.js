import React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { useHomeListner } from '../hooks/useHomeListners';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserFeed from './UserFeed';
import GroupeFeeds from './GroupeFeeds';
import { useAuthUserChanges } from '../hooks/useAuthUserChanges';
import FriendsFeeds from './FriendsFeeds';

const FeedTab = createMaterialTopTabNavigator();

function HomeScreen({ navigation }) {
  useHomeListner();
  const [description, setDescription] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  return (
    <>
      <FeedTab.Navigator>
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
      {/* <View style={{ flex: 1, marginTop: 50 }}>
        <Text> this is Home Screen </Text>
        <Button
          title="go to login"
          onPress={() => {
            navigation.navigate('SignInScreen');
          }}
        />
        <Button
          color={'green'}
          title="go to Profile"
          onPress={() => {
            navigation.navigate('Profile');
          }}
        />
        <TextInput
          onChangeText={val => setEmail(val)}
          value={email}
          placeholder="email"
        />

        <Button color={'violet'} title="add Friend" onPress={() => {}} />

        <View style={[]}>
          <TextInput
            onChangeText={val => setName(val)}
            value={name}
            placeholder="Groupe Name"
          />

          <TextInput
            onChangeText={val => setDescription(val)}
            value={description}
            placeholder="Description"
          />

          <Button color={'orange'} title="create groupe" onPress={() => {}} />
        </View>
      </View> */}
    </>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
export default HomeScreen;
