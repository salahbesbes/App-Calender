import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSignOut } from '../hooks/useSignOut';
import { Button } from 'react-native-elements';

export default function SignOutButton({ navigation }) {
  const { signOut } = useSignOut();
  return (
    <>
      <TouchableOpacity
        style={[styles.circular, { backgroundColor: 'red' }]}
        onPress={() => {
          signOut(navigation).then(data => navigation.navigate('SignInScreen'));
        }}>
        <Text style={{ color: 'white' }}> Out</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  circular: {
    height: 40,
    width: 40,
    marginRight: 10,
    borderRadius: 100,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
