import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';

export default function CadastroCriancaScreen({ navigation, route }) {
  const { userEmail, userSenha, parentName, parentAge } = route.params;

  const [nomeCrianca, setNomeCrianca] = useState('');
  const [dataNascimento, setDataNascimento] = useState(new Date());
  const [mostrarPicker, setMostrarPicker] = useState(false);

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
    if (!nomeCrianca.trim()) {
      Alert.alert('Aviso', 'Por favor, digite o nome da criança.');
      return;
    }
    navigation.navigate('Create', {
      userEmail, 
      userSenha,
      parentName,
      parentAge,
      kidName: nomeCrianca,
      kidAge: calcularIdade(dataNascimento)
    });
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
        <Text style={styles.titulo}>Agora vamos fazer o cadastro da sua criança</Text>

        <TextInput
          style={styles.input}
          placeholder="Primeiro nome"
          placeholderTextColor="#C9BAD9"
          value={nomeCrianca}
          onChangeText={setNomeCrianca}
        />

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
          style={styles.botao}
          onPress={handleContinuar}
        >
          <Text style={styles.botaoTexto}>CONTINUAR</Text>
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
  input: { 
    backgroundColor: '#fff',
    padding: 12,
    width: '100%',
    marginBottom: 10,
    borderRadius: 80,
    fontFamily: 'BalooBhaijaan',
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
  botaoTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'BalooBhaijaan',
  },
});