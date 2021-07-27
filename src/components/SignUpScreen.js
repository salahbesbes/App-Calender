import React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import useSignUp from '../hooks/useSignUp';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Input } from 'react-native-elements/dist/input/Input';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, signUp } = useSignUp();

  return (
    <View style={{ flex: 1, marginTop: 50, alignItems: 'center' }}>
      <Input
        style={{}}
        onChangeText={setEmail}
        value={email}
        label="Email"
        placeholder="..."
        errorMessage={error}
        errorStyle={{ color: 'red' }}
      />
      <Input
        textContentType="password"
        style={{}}
        onChangeText={setPassword}
        value={password}
        label="Password"
        placeholder="..."
      />
      <Button
        loading={loading}
        buttonStyle={{
          backgroundColor: 'orange',
          width: 250,
          marginBottom: 10,
        }}
        title={'SignUp'}
        onPress={async () => {
          await signUp({ email, password });
        }}
      />
      <Button
        buttonStyle={{
          backgroundColor: '#e76f51',
          width: 250,
          marginBottom: 10,
        }}
        title={'Log In'}
        onPress={async () => {
          navigation.navigate('SignInScreen');
        }}
      />
    </View>
  );
};
export default SignUpScreen;
