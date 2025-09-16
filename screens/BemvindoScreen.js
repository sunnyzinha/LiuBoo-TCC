import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function BemVindoScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#C9BCEE', '#9D8EDC']}
      style={styles.container}
    >
      <Image
        source={require('../assets/mascote.png')}
        style={styles.mascote}
        resizeMode="contain"
      />
      <Text style={styles.titulo}>Bem-vindo ao</Text>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.botaoTexto}>Cadastre-se</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.linkTexto}>Já tem uma conta? Entre aqui!</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flexDirection: 'column',
  },
  mascote: {
    width: 400,
    height: 400, 
    alignItems: 'center',
  },
  titulo: {
    fontSize: 50,
    color: 'white',
    fontFamily: 'BalooBhaijaan',
    marginLeft: 5,
  },
  logo: {
    width: 250,
    height: 70, 
    marginBottom: 30, 
  },
  botao: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 90,
    borderRadius: 80,
    marginBottom: 20, 
  },
  botaoTexto: {
    color: '#C9BAD9',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkTexto: {
    color: 'white',
    textDecorationLine: 'underline',
    fontFamily: 'BalooBhaijaan',
  },
});
