import React, { useContext } from 'react';
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

const FriendsFeeds = ({ navigation }) => {
  const { authContext } = useContext(AppStateContext);
  const [authState, authDispatch] = authContext; // distructuring
  const { user } = authState;
  return (
    <ScrollView>
      {user?.friends.map((friendObj, i) => (
        <UserCard key={i} friendObj={friendObj} />
      ))}
    </ScrollView>
  );
};

const UserCard = ({ friendObj }) => {
  const { removeFriend } = useFriend();
  return (
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
          removeFriend(friendObj.uid);
        }}
        style={styles.roundButton1}>
        <Text style={styles.remove}>X</Text>
      </TouchableOpacity>
    </ListItem>
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
});
export default FriendsFeeds;
