import React from 'react';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import useSignUp from '../hooks/useSignUp';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('salah@gmail.com');
  const [password, setPassword] = useState('123456');
  const { loading, error, signUp } = useSignUp();
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
        title={'SignUp'}
        onPress={async () => {
          await signUp({ email, password });
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

export default SignUpScreen;
