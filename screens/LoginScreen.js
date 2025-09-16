import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Importa a função de Autenticação do Firebase
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Função para lidar com o login do usuário
  const handleLogin = async () => {
    const auth = getAuth();
    if (email === '' || senha === '') {
      Alert.alert('Aviso', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Tenta autenticar o usuário com e-mail e senha
      await signInWithEmailAndPassword(auth, email, senha);
      
      // Se o login for bem-sucedido, navega para a tela inicial
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      navigation.navigate('Perfis');

    } catch (error) {
      // Trata os erros de autenticação do Firebase
      let errorMessage = 'Ocorreu um erro no login. Tente novamente.';
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'O email fornecido é inválido.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'A senha está incorreta.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'Nenhum usuário encontrado com este email.';
      }
      Alert.alert('Erro no Login', errorMessage);
      console.error("Firebase Auth Error:", error);
    }
  };

  return (
    <LinearGradient
      colors={['#C9BCEE', '#9D8EDC']}
      style={styles.background}
    >
      <View style={styles.backgroundCircle1} />
      <View style={styles.backgroundCircle2} />

      <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
        <Text style={styles.voltarTexto}> ← </Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.titulo}>Bem-vindo de volta!</Text>
        <Text style={styles.subtitulo}>Entre com sua conta</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#C9BAD9"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#C9BAD9"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        <TouchableOpacity style={styles.esqueceuSenha} onPress={() => navigation.navigate('Forget')}>
          <Text style={styles.esqueceuSenhaTexto}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={handleLogin}>
          <Text style={styles.botaoTexto}>ENTRAR</Text>
        </TouchableOpacity>

        <Text style={styles.titulo2}>OU</Text>

        <TouchableOpacity style={styles.botaoGoogle} onPress={() => Alert.alert('Aviso', 'Login com Google ainda não implementado.')}>
          <Image source={require('../assets/google-logo.png')} style={styles.googleLogo} />
          <Text style={styles.botaoGoogleTexto}>Entrar com o Google</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: 'relative',
  },
  backgroundCircle1: {
    position: 'absolute',
    bottom: -50,
    left: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  backgroundCircle2: {
    position: 'absolute',
    bottom: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  voltar: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  voltarTexto: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'BalooBhaijaan',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 120,
    zIndex: 2,
  },
  logo: {
    width: 300,
    height: 70,
    marginBottom: 30,
  },
  titulo: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'BalooBhaijaan',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'BalooBhaijaan',
    textAlign: 'center',
    marginBottom: 20,
  },
  titulo2: {
    fontSize: 21,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'BalooBhaijaan',
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    width: '100%',
    marginBottom: 10,
    borderRadius: 80,
    fontFamily: 'BalooBhaijaan',
  },
  esqueceuSenha: {
    alignSelf: 'flex-end',
    marginRight: 15,
    marginBottom: 15,
  },
  esqueceuSenhaTexto: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'BalooBhaijaan',
    textDecorationLine: 'underline',
  },
  botao: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 90,
    borderRadius: 80,
    marginBottom: 15,
    marginTop: 10,
  },
  botaoTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'BalooBhaijaan',
  },
  botaoGoogle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 80,
    width: '100%',
    justifyContent: 'flex-start',
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  botaoGoogleTexto: {
    color: '#D6C4F2',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'BalooBhaijaan',
  },
});