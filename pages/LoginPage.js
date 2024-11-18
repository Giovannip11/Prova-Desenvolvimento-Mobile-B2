import React, { useState } from 'react';
import {SafeAreaView,StyleSheet,Button,View,TextInput,Image,Alert,KeyboardAvoidingView,Platform,ScrollView,} from 'react-native';
import Logo from '../assets/react-native-1.png';
import { supabase } from '../Utils/supabase';

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Erro no login:', error.message);

        if (error.message.includes('Invalid login credentials')) {
          Alert.alert(
            'Erro',
            'Credenciais de login inválidas. Verifique seu e-mail e senha.'
          );
        } else {
          Alert.alert('Erro', error.message);
        }
        return;
      }

      // Login bem-sucedido, redirecionar para a página principal
      navigation.navigate('Main');
    } catch (error) {
      console.error('Erro inesperado:', error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente.');
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Image style={styles.logo} source={Logo} />

          <TextInput
            style={styles.textInput}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.textInput}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={true}
          />

          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="Login" color="#000000" onPress={handleLogin} />
            </View>

            <View style={styles.button}>
              <Button
                title="Register"
                color="#000000"
                onPress={() => navigation.navigate('Register')}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Cor de fundo
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 40,
  },
  textInput: {
    height: 50,
    borderColor: '#021E73',
    borderWidth: 1,
    width: '90%',
    paddingHorizontal: 15,
    marginBottom: 20,
    borderRadius: 8,
    color: '#333',
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
    width: '100%',
  },
});
