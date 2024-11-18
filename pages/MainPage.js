import React from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';

export default function Main() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.loggedInText}>Você está logado!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loggedInText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#021E73',
  },
});
