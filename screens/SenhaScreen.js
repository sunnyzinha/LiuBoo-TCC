import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
  Modal,
  ImageBackground
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ResponsiblePasswordScreen({ navigation }) {
  const [password, setPassword] = useState('');
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const handleNumberPress = (number) => {
    if (password.length < 4) {
      setPassword(password + number);
    }
  };

  const handleDelete = () => {
    setPassword(password.slice(0, -1));
  };

  const handlePasswordSubmit = () => {
    if (password.length !== 4) {
      setIsErrorModalVisible(true);
      return;
    }
    setIsSuccessModalVisible(true);
  };

  const handleSuccessModalContinue = () => {
    setIsSuccessModalVisible(false);
    navigation.navigate('Perfil');
  };

  const handleErrorModalContinue = () => {
    setIsErrorModalVisible(false);
  };

  const renderPasswordDigits = () => {
    return (
      <View style={styles.passwordDigitsContainer}>
        {[0, 1, 2, 3].map((index) => (
          <View key={index} style={styles.passwordDigitWrapper}>
            <Text style={styles.passwordDigitText}>
              {password[index] || ''}
            </Text>
            <View
              style={[
                styles.passwordDigitLine,
                index < password.length && styles.passwordDigitLineFilled
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
    <ImageBackground
      source={require('../assets/backsenha.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}> ← </Text>
          </TouchableOpacity>

          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Acesso do Responsável</Text>
          <Text style={styles.subtitle}>Digite sua senha para continuar</Text>

          {renderPasswordDigits()}
          
          {renderKeypad()}

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handlePasswordSubmit}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Modal de Erro */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isErrorModalVisible}
        onRequestClose={handleErrorModalContinue}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Por favor, digite a senha.</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleErrorModalContinue}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Sucesso */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isSuccessModalVisible}
        onRequestClose={handleSuccessModalContinue}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Bem-vindo, responsável!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleSuccessModalContinue}
            >
              <Text style={styles.modalButtonText}>CONTINUAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    position: 'relative',
    zIndex: 2,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 10,
  },
  backText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'BalooBhaijaan',
  },
  logo: {
    width: 200,
    height: 56,
    marginTop: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'BalooBhaijaan',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 26,
    opacity: 0.9,
    fontFamily: 'BalooBhaijaan',
  },
  passwordDigitsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    width: '100%',
  },
  passwordDigitWrapper: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  passwordDigitText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    minWidth: 30,
    fontFamily: 'BalooBhaijaan',
  },
  passwordDigitLine: {
    height: 2,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginTop: 5,
  },
  passwordDigitLineFilled: {
    backgroundColor: 'white',
  },
  keypadContainer: {
    alignItems: 'center',
    marginBottom: -10,
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
  submitButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 90,
    borderRadius: 80,
    marginBottom: 15,
    marginTop: 15,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
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