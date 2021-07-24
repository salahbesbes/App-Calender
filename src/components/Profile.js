import React, { useContext, useLayoutEffect } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import { Input } from 'react-native-elements/dist/input/Input';
import { useProfile } from '../hooks/useProfile';
import SignOutButton from './SignOutButton';

function Profile({ navigation }) {
  const { user, updateProfile } = useProfile();
  // we create local state of this component
  const [age, setAge] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <SignOutButton navigation={navigation} />,
    });
  }, [navigation]);

  useEffect(() => {
    setAge(user.age);
    setName(user.name);
    setPhone(user.phone);
  }, [user.age, user.name, user.phone]);

  return user.uid ? (
    <ScrollView>
      <View style={{ marginTop: 50 }}>
        <Input
          onChangeText={val => setName(val)}
          value={name}
          placeholder="Name"
          label="Name"
        />

        <Input
          onChangeText={val => setPhone(val)}
          value={phone}
          placeholder="Phone"
          label="Phone"
        />
        <Input
          onChangeText={val => setAge(val)}
          value={age}
          placeholder="Age"
          label="Age"
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
