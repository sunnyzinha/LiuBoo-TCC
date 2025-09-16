import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

export default function CadastroScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [aceitaTermos, setAceitaTermos] = useState(false);
  const [aceitaPrivacidade, setAceitaPrivacidade] = useState(false);

  const handleContinuar = () => {
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'A senha e a confirmação de senha não coincidem.');
      return;
    }
    if (!aceitaTermos || !aceitaPrivacidade) {
      Alert.alert('Aviso', 'Você deve aceitar os Termos de Uso e a Política de Privacidade para continuar.');
      return;
    }
    // Passando o email e a senha para a próxima tela
    navigation.navigate('CadastroResponsavel', { userEmail: email, userSenha: senha });
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
        <Text style={styles.titulo}>Crie uma conta para acompanhar o progresso da sua criança</Text>

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
        <TextInput
          style={styles.input}
          placeholder="Confirme a senha"
          placeholderTextColor="#C9BAD9"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
        />

        <View style={styles.checkboxWrapper}>
          <CheckBox
            title="Ao clicar, você concorda em aceitar os Termos de Uso do Liuboo"
            checked={aceitaTermos}
            onPress={() => setAceitaTermos(!aceitaTermos)}
            containerStyle={styles.checkboxContainer}
            textStyle={styles.checkboxTexto}
          />
          <CheckBox
            title="Você concorda com a Política de Privacidade"
            checked={aceitaPrivacidade}
            onPress={() => setAceitaPrivacidade(!aceitaPrivacidade)}
            containerStyle={styles.checkboxContainer}
            textStyle={styles.checkboxTexto}
          />
        </View>

        <TouchableOpacity
          style={styles.botao}
          onPress={handleContinuar}>
          <Text style={styles.botaoTexto}>CONTINUAR</Text>
        </TouchableOpacity>

        <Text style={styles.titulo2}>OU</Text>

        <TouchableOpacity style={styles.botaoGoogle} onPress={() => Alert.alert('Aviso', 'Login com Google ainda não implementado.')}>
          <Image source={require('../assets/google-logo.png')} style={styles.googleLogo} />
          <Text style={styles.botaoGoogleTexto}>Continuar com o Google</Text>
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
    fontSize: 21,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'BalooBhaijaan',
    marginBottom: 30,
    textAlign: 'center',
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
  checkboxWrapper: {
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    alignSelf: 'flex-start',
    width: '100%',
    marginLeft: 0,
    padding: 0,
    marginBottom: 5,
  },
  checkboxTexto: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'normal',
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