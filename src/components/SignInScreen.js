import React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { useAuthUserChanges } from '../hooks/useAuthUserChanges';
import useSignIn from '../hooks/useSignIn';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Input } from 'react-native-elements/dist/input/Input';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, signIn } = useSignIn();
  useAuthUserChanges({ navigation });
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
        buttonStyle={{
          backgroundColor: '#e76f51',
          width: 250,
          marginBottom: 10,
        }}
        title={'LogIn'}
        loading={loading}
        onPress={async () => {
          const success = await signIn({ email, password });
          success && navigation.navigate('HomeScreen');
        }}
      />

      <Button
        buttonStyle={{
          backgroundColor: 'orange',
          width: 250,
          marginBottom: 10,
        }}
        title={'SignUp'}
        color="green"
        onPress={() => {
          navigation.navigate('SignUpScreen');
        }}
      />
    </View>
  );
};

export default SignInScreen;
