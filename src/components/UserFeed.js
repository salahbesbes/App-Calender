import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { AppStateContext } from '../../stateProvider';
import { useFriend } from '../hooks/useFriend';
import { useUsers } from '../hooks/useUsers';
import EventCard from './Cards/EventCard';
import CreateEvent from './Modals/CreateEvent';
import SignOutButton from './SignOutButton';

const UserFeed = ({ navigation }) => {
  const [allUsers, setAllUsers] = useState([]);
  const { ListenOnFriendsChanges, listenOnUsers, user, publicEvents } =
    useUsers();

  const allUsersExceptMe = allUsers.filter(el => el.uid !== user.uid);
  useEffect(() => {
    const unSub = listenOnUsers(setAllUsers);
    return unSub;
  }, [listenOnUsers]);
  useEffect(() => {
    const unsubscribeFriends = ListenOnFriendsChanges();
    return unsubscribeFriends;
  }, [ListenOnFriendsChanges]);

  return (
    <ScrollView>
      {allUsersExceptMe.map((userObj, i) => (
        <UserCard key={i} userObj={userObj} />
      ))}

      {publicEvents.map((eventObj, i) => (
        <EventCard key={i} eventObj={eventObj} navigation={navigation} />
      ))}
    </ScrollView>
  );
};

const UserCard = ({ userObj }) => {
  const { addFriend } = useFriend();
  const { authContext } = useContext(AppStateContext);
  const [authState, authDispach] = authContext;
  const { user } = authState;

  return (
    <ListItem bottomDivider>
      <ListItem.Content style={{}}>
        <ListItem.Title style={style.mv}>{userObj.name}</ListItem.Title>
        <ListItem.Subtitle style={style.mv}>
          Age: {userObj.age}
        </ListItem.Subtitle>
        <Text style={style.mv}> {userObj.phone}</Text>
      </ListItem.Content>
      {user.friends.map(friend => friend.uid).includes(userObj.uid) ? (
        <Button title="already friend" disabled />
      ) : (
        <Button
          title="Add"
          onPress={() => {
            addFriend(userObj);
          }}
        />
      )}
    </ListItem>
  );
};
const style = StyleSheet.create({
  mv: {
    paddingVertical: 5,
  },
});
export default UserFeed;
