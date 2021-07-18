import React, { useContext } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppStateContext } from '../../stateProvider';
import SignOutButton from './SignOutButton';

const FriendsFeeds = ({ navigation }) => {
  const { authContext } = useContext(AppStateContext);
  const [authState, authDispatch] = authContext; // distructuring
  const { user } = authState;
  return (
    <ScrollView>
      <SignOutButton navigation={navigation} />

      <Button
        title={'go sign In'}
        onPress={() => {
          navigation.navigate('SignInScreen');
        }}
      />
      {user?.friends.map((friendObj, i) => (
        <UserCard key={i} friendObj={friendObj} />
      ))}
    </ScrollView>
  );
};

const UserCard = ({ friendObj }) => {
  return (
    <View>
      <Text style={[style.textCard]}>name: {friendObj?.name}</Text>
      <Text style={[style.textCard]}>uid: {friendObj?.uid}</Text>
      <Text style={[style.textCard]}>phone: {friendObj?.phone}</Text>
      <Text style={[style.textCard]}>age: {friendObj?.age}</Text>
    </View>
  );
};
const style = StyleSheet.create({
  textCard: {
    // marginVertical: 10,
    paddingVertical: 5,
  },
});
export default FriendsFeeds;
