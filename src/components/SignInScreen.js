import React from 'react';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuthUserChanges } from '../hooks/useAuthUserChanges';
import useSignIn from '../hooks/useSignIn';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('salah@gmail.com');
  const [password, setPassword] = useState('123456');
  const { loading, error, signIn } = useSignIn();
  useAuthUserChanges({ navigation });
  return (
    <View style={{ flex: 1, marginTop: 50 }}>
      <Button
        title={'go to profile'}
        onPress={() => navigation.navigate('Profile')}
      />
      <TextInput style={styles.input} onChangeText={setEmail} value={email} />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />
      <Button
        title={'LogIn'}
        onPress={async () => {
          await signIn({ email, password });
        }}
      />

      <Button
        title={'SignUp'}
        color="green"
        onPress={() => {
          navigation.navigate('SignUpScreen');
        }}
      />

      <View>
        <Text
          style={[
            styles.box,
            { backgroundColor: error ? 'red' : loading ? 'yellow' : null },
          ]}>
          {error ? `error => ${error}` : loading ? 'LOADING ... ' : null}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  box: {
    height: 50,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default SignInScreen;
