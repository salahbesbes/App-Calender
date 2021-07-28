import React from 'react';
import { useState } from 'react';
import useSignUp from '../hooks/useSignUp';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Input } from 'react-native-elements/dist/input/Input';
import { ScrollView } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { loading, error, signUp } = useSignUp();

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1, marginTop: 50, alignItems: 'center' }}>
      <Input
        onChangeText={setName}
        value={name}
        label="User Name"
        placeholder="..."
      />
      <Input
        onChangeText={setEmail}
        value={email}
        label="Email"
        placeholder="..."
        errorMessage={error}
        errorStyle={{ color: 'red' }}
      />
      <Input
        secureTextEntry
        textContentType="password"
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
          await signUp({ email, password, name });
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
    </ScrollView>
  );
};
export default SignUpScreen;
