import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  View,
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Logo from '../assets/react-native-1.png';
import { supabase } from '../Utils/supabase';

export default function RegisterPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        console.error('Erro ao criar conta:', error);
        Alert.alert('Erro', error.message);  // Mostra o erro no Alert
      } else {
        console.log('Conta criada com sucesso!', data.user);  // Corrigido para acessar 'data.user'
        Alert.alert('Sucesso', 'Conta criada com sucesso!');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Erro ao criar conta:', error);
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

          {/* Campo de E-mail */}
          <TextInput
            style={styles.textInput}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
          />

          {/* Campo de Senha */}
          <TextInput
            style={styles.textInput}
            onChangeText={setPassword}
            value={password}
            placeholder="Senha"
            placeholderTextColor="#999"
            secureTextEntry={true}
          />

          {/* Campo de Confirmar Senha */}
          <TextInput
            style={styles.textInput}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            placeholder="Confirmar Senha"
            placeholderTextColor="#999"
            secureTextEntry={true}
          />

          {/* Botão de Registro */}
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="Registrar" color="#000000" onPress={handleSignUp} />
            </View>

            <View style={styles.button}>
              <Button
                title="Voltar para Login"
                color="#000000"
                
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
    marginBottom: 30,
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
