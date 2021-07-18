import React from 'react';
import { Button } from 'react-native';
import { useSignOut } from '../hooks/useSignOut';

export default function SignOutButton({ navigation }) {
  const { signOut } = useSignOut();
  return (
    <>
      <Button
        color={'red'}
        title={'log Out'}
        onPress={async () => {
          await signOut(navigation);
          navigation.navigate('SignInScreen');
        }}
      />
    </>
  );
}
