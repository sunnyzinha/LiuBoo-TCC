import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Dimensions, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Importações do Firebase Auth e Firestore
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Certifique-se de que o caminho está correto

const { width } = Dimensions.get('window');
const liubooLogo = require('../assets/logo.png');

export default function CreateScreen({ navigation, route }) {
  const { userEmail, userSenha, parentName, parentAge, kidName, kidAge } = route.params;

  const [pin, setPin] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleNumberPress = (number) => {
    if (pin.length < 4) {
      setPin(pin + number);
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const handleContinue = () => {
    if (pin.length !== 4) {
      Alert.alert('Aviso', 'O PIN deve ter 4 dígitos.');
      return;
    }
    handleCadastroCompleto();
  };

  const handleModalContinue = () => {
    setIsModalVisible(false);
    navigation.navigate('Login');
  };

  const handleCadastroCompleto = async () => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userEmail, userSenha);
      const user = userCredential.user;

      await setDoc(doc(db, 'user', user.uid), {
        email: user.email,
        name: parentName,
        age: parentAge,
        password: userSenha, 
        pin: parseInt(pin),
      });

      const kidCollectionRef = collection(db, 'user', user.uid, 'kid');
      await addDoc(kidCollectionRef, {
        name: kidName,
        age: kidAge,
      });

      // MOSTRA O MODAL DE SUCESSO SOMENTE APÓS O SALVAMENTO COMPLETO
      setIsModalVisible(true);

    } catch (error) {
      let errorMessage = 'Ocorreu um erro no cadastro. Tente novamente.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Este email já está em uso. Tente outro.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'A senha deve ter no mínimo 6 caracteres.';
      }
      Alert.alert('Erro no Cadastro', errorMessage);
      console.error("Firebase Auth Error:", error);
    }
  };

  const renderPinDigits = () => {
    return (
      <View style={styles.pinDigitsContainer}>
        {[0, 1, 2, 3].map((index) => (
          <View key={index} style={styles.pinDigitWrapper}>
            <Text style={styles.pinDigitText}>
              {pin[index] || ''}
            </Text>
            <View
              style={[
                styles.pinDigitLine,
                index < pin.length && styles.pinDigitLineFilled
              ]}
            />
          </View>
        ))}
      </View>
    );
  };

  const renderKeypadButton = (number) => (
    <TouchableOpacity
      key={number}
      style={styles.keypadButton}
      onPress={() => handleNumberPress(number.toString())}
      activeOpacity={0.7}
    >
      <Text style={styles.keypadButtonText}>{number}</Text>
    </TouchableOpacity>
  );

  const renderKeypad = () => {
    const numbers = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    return (
      <View style={styles.keypadContainer}>
        {numbers.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.keypadRow}>
            {row.map(renderKeypadButton)}
          </View>
        ))}
        <View style={styles.keypadRow}>
          <View style={styles.emptyKeypadSpace} />
          {renderKeypadButton(0)}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
            activeOpacity={0.7}
          >
            <Text style={styles.deleteButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#C9BCEE', '#9D8EDC']} style={styles.gradient}>
        <View style={styles.backgroundCircle1} />
        <View style={styles.backgroundCircle2} />
        <View style={styles.content}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Image source={liubooLogo} style={styles.logoImage} resizeMode="contain" />
          <Text style={styles.instructionText}>
            Antes de finalizar, crie um pin para{'\n'}acesso parental!
          </Text>
          
          {renderPinDigits()}
          {renderKeypad()}

          <TouchableOpacity style={styles.continueButton} onPress={handleContinue} activeOpacity={0.8}>
            <Text style={styles.continueButtonText}>CONTINUAR</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* O Modal só deve ser exibido quando 'isModalVisible' for true */}
      {isModalVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Parabéns, conta criada!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleModalContinue}>
              <Text style={styles.modalButtonText}>CONTINUAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
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
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  backArrow: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'BalooBhaijaan',
  },
  
  logoImage: { 
    width: 300, 
    height: 250, 
    marginTop: -30,
    marginBottom: -95, 
  },
  instructionText: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    opacity: 0.9,
    marginTop: 20,
    fontFamily: 'BalooBhaijaan',
  },
  pinDigitsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    width: '60%',
    marginTop: -220
  },
  pinDigitWrapper: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  pinDigitText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    minWidth: 30,
    fontFamily: 'BalooBhaijaan',
  },
  pinDigitLine: {
    height: 2,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginTop: 5,
  },
  pinDigitLineFilled: {
    backgroundColor: 'white',
  },
  keypadContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  keypadButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 7.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  keypadButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
    fontFamily: 'BalooBhaijaan',
  },
  emptyKeypadSpace: {
    width: 70,
    height: 70,
    marginHorizontal: 7.5,
  },
  deleteButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center', 
    marginHorizontal: 7.5,
  },
  deleteButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'BalooBhaijaan',
  },
  continueButton: {
    width: width - 60,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'BalooBhaijaan',
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
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#C9BCEE',
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