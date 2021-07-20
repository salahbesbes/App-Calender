import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFriend } from '../hooks/useFriend';
import { useUsers } from '../hooks/useUsers';
import SignOutButton from './SignOutButton';

const UserFeed = ({ navigation }) => {
  const [allUsers, setAllUsers] = useState([]);
  const { listenOnGroups, ListenOnFriendsChanges, listenOnUsers, user } =
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
  useEffect(() => {
    const unsubscribeGroups = listenOnGroups();
    return unsubscribeGroups;
  }, [listenOnGroups]);
  console.log('friends length', user.friends.length);
  return (
    <ScrollView>
      <SignOutButton navigation={navigation} />

      <Button
        title={'go sign In'}
        onPress={() => {
          navigation.navigate('SignInScreen');
        }}
      />
      {allUsersExceptMe.map((userObj, i) => (
        <UserCard key={i} userObj={userObj} />
      ))}
    </ScrollView>
  );
};

const UserCard = ({ userObj }) => {
  const { user, addFriend, removeFriend } = useFriend();
  return (
    <View>
      <Text style={[style.textCard]}>name: {userObj?.name}</Text>
      <Text style={[style.textCard]}>uid: {userObj?.uid}</Text>
      <Text style={[style.textCard]}>phone: {userObj?.phone}</Text>
      <Text style={[style.textCard]}>age: {userObj?.age}</Text>
      <Button
        title={'add to friend'}
        color="violet"
        onPress={() => {
          addFriend(userObj);
        }}
      />
      <Button
        title={'remove to friend'}
        color="red"
        onPress={() => {
          removeFriend(userObj.uid);
        }}
      />
    </View>
  );
};
const style = StyleSheet.create({
  textCard: {
    // marginVertical: 10,
    paddingVertical: 5,
  },
});
export default UserFeed;
