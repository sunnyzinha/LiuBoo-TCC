import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';

export default function CadastroResponsavelScreen({ navigation, route }) {
  // Recebe os parâmetros da tela anterior
  const { userEmail, userSenha } = route.params; 
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState(new Date());
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [mostrarModalIdade, setMostrarModalIdade] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dataNascimento;
    setMostrarPicker(Platform.OS === 'ios');
    setDataNascimento(currentDate);
  };

  const formatarData = (date) => {
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const calcularIdade = (dataNascimento) => {
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mes = hoje.getMonth();
    const dia = hoje.getDate();
    
    if (mes < dataNascimento.getMonth() || (mes === dataNascimento.getMonth() && dia < dataNascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  const handleContinuar = () => {
    if (!nome.trim()) {
      return;
    }

    const idade = calcularIdade(dataNascimento);
    if (idade >= 18) {
      // Passando TODOS os dados coletados até agora para a próxima tela
      navigation.navigate('CadastroCrianca', {
        userEmail, 
        userSenha,
        parentName: nome,
        parentAge: idade
      });
    } else {
      setMostrarModalIdade(true);
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
        
        <Text style={styles.titulo}>Como você se chama?</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          placeholderTextColor="#C9BAD9"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.titulo}>Quantos anos você tem?</Text>
        <TouchableOpacity style={styles.input} onPress={() => setMostrarPicker(true)}>
          <Text style={styles.inputText}>{formatarData(dataNascimento)}</Text>
        </TouchableOpacity>

        {mostrarPicker && (
          <DateTimePicker
            value={dataNascimento}
            mode="date"
            display="default"
            onChange={onChange}
            maximumDate={new Date()}
          />
        )}

        <TouchableOpacity
          style={[styles.botao, !nome.trim() && styles.botaoDisabilitado]}
          onPress={handleContinuar}
          disabled={!nome.trim()}>
          <Text style={styles.botaoTexto}>CONTINUAR</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={mostrarModalIdade}
        onRequestClose={() => setMostrarModalIdade(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalIcone}>
              <Text style={styles.modalIconeTexto}>⚠️</Text>
            </View>
            <Text style={styles.modalTitulo}>Atenção</Text>
            <Text style={styles.modalTexto}>
              Você precisa ser maior de idade para criar uma conta de responsável no Liuboo
            </Text>
            <TouchableOpacity 
              style={styles.modalBotao}
              onPress={() => setMostrarModalIdade(false)}
            >
              <Text style={styles.modalBotaoTexto}>ENTENDI</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}
//... (Estilos, etc., permanecem inalterados)
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
    textAlign: 'center',
    fontFamily: 'BalooBhaijaan',
    marginBottom: 15,
  },
  input: { 
    backgroundColor: '#fff',
    padding: 12,
    width: '100%',
    marginBottom: 20,
    borderRadius: 80,
    fontFamily: 'BalooBhaijaan',
    alignItems: 'center',
    fontSize: 16,
    color: '#333',
  },
  inputText: {
    color: '#C9BAD9',
    fontFamily: 'BalooBhaijaan',
    fontSize: 16,
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
  botaoDisabilitado: {
    backgroundColor: '#C9BAD9',
  },
  botaoTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'BalooBhaijaan',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#C9BCEE',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '90%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalIcone: {
    width: 60,
    height: 60,
    backgroundColor: '#F3E8FF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalIconeTexto: {
    fontSize: 30,
  },
  modalTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7C3AED',
    fontFamily: 'BalooBhaijaan',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalTexto: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 25,
    fontFamily: 'BalooBhaijaan',
  },
  modalBotao: {
    backgroundColor: '#7C3AED',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: '#7C3AED',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  modalBotaoTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'BalooBhaijaan',
  },
});