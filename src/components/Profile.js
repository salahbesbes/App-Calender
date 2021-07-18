import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import { useProfile } from '../hooks/useProfile';
import SignOutButton from './SignOutButton';

function Profile({ navigation }) {
  const { user, updateProfile } = useProfile();
  // we create local state of this component
  const [age, setAge] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  useEffect(() => {
    setAge(user.age);
    setName(user.name);
    setPhone(user.phone);
  }, [user.age, user.name, user.phone]);
  return user.uid ? (
    <ScrollView style={{}}>
      <View style={[]}>
        <TextInput
          onChangeText={val => setName(val)}
          value={name}
          placeholder="Name"
        />

        <TextInput
          onChangeText={val => setPhone(val)}
          value={phone}
          placeholder="Phone"
        />
        <TextInput
          onChangeText={val => setAge(val)}
          value={age}
          placeholder="Age"
        />
        <Button
          title={'update profile'}
          color={'orange'}
          onPress={() => {
            updateProfile({
              name,
              phone,
              age,
            });
          }}
        />
      </View>
    </ScrollView>
  ) : (
    <ScrollView style={{}}>
      <View>
        <Text style={{ backgroundColor: 'red' }}>not user</Text>
        <Button
          title="go to login"
          onPress={() => {
            navigation.navigate('SignInScreen');
          }}
        />
        <SignOutButton navigation={navigation} />
      </View>
    </ScrollView>
  );
}

export default Profile;
