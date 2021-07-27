import React, { useContext, useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { AppStateContext } from '../../stateProvider';
import { useFriend } from '../hooks/useFriend';
import DropDown from './utils/Selector';

const FriendsFeeds = ({ navigation }) => {
  const { authContext } = useContext(AppStateContext);
  const [authState, authDispatch] = authContext; // distructuring
  const [selectedGroups, setSelectedGroups] = useState([]);

  const { user } = authState;
  return (
    <>
      <DropDown items={user.myGroups} setSelectedGroups={setSelectedGroups} />
      <ScrollView>
        {user?.friends.map((friendObj, i) => (
          <FriendCard
            key={i}
            friendObj={friendObj}
            selectedGroups={selectedGroups}
          />
        ))}
      </ScrollView>
    </>
  );
};

const FriendCard = ({ friendObj, selectedGroups }) => {
  const { removeFriend, user, inviteFriendToGroups } = useFriend();
  return (
    <View>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={styles.mv}>{friendObj.name}</ListItem.Title>
          <ListItem.Subtitle style={styles.mv}>
            Age: {friendObj.age}
          </ListItem.Subtitle>
          <Text style={styles.mv}> {friendObj.phone}</Text>
        </ListItem.Content>
        <TouchableOpacity
          onPress={() => {
            if (selectedGroups.length === 0) {
              console.log('pls select a group');
            }
            inviteFriendToGroups({ selectedGroups, friendUid: friendObj.uid });
          }}
          style={styles.invite}>
          <Text style={styles.remove}>invite to Gr</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            removeFriend(friendObj.uid);
          }}
          style={styles.roundButton1}>
          <Text style={styles.remove}>X</Text>
        </TouchableOpacity>
      </ListItem>
    </View>
  );
};
const styles = StyleSheet.create({
  mv: {
    paddingVertical: 5,
  },
  remove: {
    color: 'white',
    fontWeight: 'bold',
  },
  roundButton1: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#FF7F7F',
  },
  invite: {
    padding: 10,
    backgroundColor: 'grey',
    borderRadius: 10,
  },
});
export default FriendsFeeds;
