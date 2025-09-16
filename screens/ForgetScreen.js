import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function EsqueciSenhaScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const enviarEmail = () => {
    if (email.trim() === '') {
      // Retorna sem mostrar alerta de erro
      return;
    }

    // Lógica de envio de e-mail (simulada)
    setIsSuccessModalVisible(true);
  };

  const handleModalContinue = () => {
    setIsSuccessModalVisible(false);
    setEmail(''); // Limpa o campo após enviar
    navigation.navigate('Login'); // Navega para a tela de Login
  };

  return (
    <LinearGradient
      colors={['#C9BCEE', '#9D8EDC']}
      style={styles.background}
    >
      {/* Elementos decorativos de fundo */}
      <View style={styles.backgroundCircle1} />
      <View style={styles.backgroundCircle2} />

      {/* Botão de voltar */}
      <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
        <Text style={styles.voltarTexto}> ← </Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
        
        <Text style={styles.titulo}>Esqueci minha senha</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome de usuário ou email"
          placeholderTextColor="#C9BAD9"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={enviarEmail}
        >
          <Text style={styles.botaoTexto}>ENVIAR EMAIL</Text>
        </TouchableOpacity>
      </View>
      
      {/* Modal de Sucesso */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isSuccessModalVisible}
        onRequestClose={handleModalContinue}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Verifique sua caixa de entrada para redefinir sua senha.</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleModalContinue}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
    marginBottom: 50,
  },
  titulo: { 
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'BalooBhaijaan',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: { 
    backgroundColor: '#fff',
    padding: 15,
    width: '100%',
    marginBottom: 20,
    borderRadius: 80,
    fontFamily: 'BalooBhaijaan',
    fontSize: 16,
  },
  botao: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 80,
    marginTop: 10,
  },
  botaoTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'BalooBhaijaan',
    textAlign: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modalContainer: {
    backgroundColor: '#C9BCEE',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'BalooBhaijaan',
  },
  modalButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'BalooBhaijaan',
  },
});
