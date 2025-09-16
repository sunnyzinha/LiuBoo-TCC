import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, Dimensions, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const { width, height } = Dimensions.get('window');

// Defina a tela de seleção de perfil
const ProfileSelectionScreen = ({ navigation }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Função para carregar os perfis de criança do Firestore
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const q = query(collection(db, 'user', user.uid, 'kid'));

      // Usa onSnapshot para ouvir atualizações em tempo real
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const kidsData = [];
        querySnapshot.forEach((doc) => {
          kidsData.push({ id: doc.id, ...doc.data() });
        });
        setProfiles(kidsData);
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
      // Alerta ou navega para a tela de login se não houver usuário logado
      Alert.alert('Aviso', 'Você precisa estar logado para ver os perfis.');
      navigation.navigate('Login');
    }
  }, [navigation]);

  const handleProfileSelect = (profileId) => {
    // Navega para a tela Home passando o ID do perfil selecionado
    navigation.navigate('Home', { profileId });
  };

  const handleAddProfile = () => {
    // Navega para a tela de cadastro de criança
    navigation.navigate('CadastroCrianca');
  };

  const handleResponsibleAccess = () => {
    // Navega para a tela de senha do responsável
    navigation.navigate('Senha');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Carregando perfis...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Quem está usando?</Text>

        <View style={styles.profilesContainer}>
          {/* 2. Mapeia a lista de perfis do estado para renderizar os cards */}
          {profiles.map((profile) => (
            <TouchableOpacity
              key={profile.id}
              style={styles.profileCard}
              onPress={() => handleProfileSelect(profile.id)}
              activeOpacity={0.8}
            >
              <View style={styles.profileIconContainer}>
                {/* A imagem precisa ser dinâmica. Por enquanto, usamos a do 'avatar1' */}
                <Image
                  source={require('../assets/avatar1.png')}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.profileName}>{profile.name}</Text>
            </TouchableOpacity>
          ))}

          {/* Botão para adicionar novo perfil */}
          <TouchableOpacity
            style={styles.addProfileButton}
            onPress={handleAddProfile}
            activeOpacity={0.8}
          >
            <View style={styles.addIcon}>
              <Text style={styles.plusSign}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.responsibleButton}
          onPress={handleResponsibleAccess}
          activeOpacity={0.8}
        >
          <Text style={styles.responsibleText}>Acesso do responsável</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C9BCEE',
    justifyContent: 'space-between',
  },
  loadingText: {
    flex: 1,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  header: {
    paddingTop: height * 0.05,
    alignItems: 'center',
    marginBottom: height * 0.05,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
    marginBottom: -180,
  },
  content: {
    flex: 1,
    paddingHorizontal: width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.075,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: height * 0.05,
    fontFamily: 'BalooBhaijaan',
  },
  profilesContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: height * 0.05,
    justifyContent: 'space-around',
    flexWrap: 'wrap', // Adicionado para quebrar a linha se houver muitos perfis
  },
  profileCard: {
    alignItems: 'center',
    width: width * 0.35,
    marginBottom: 20,
  },
  profileIconContainer: {
    width: width * 0.3,
    height: width * 0.3,
    backgroundColor: '#8E73DB',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  profileImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#8E73DB',
  },
  profileName: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'BalooBhaijaan',
  },
  addProfileButton: {
    width: width * 0.3,
    height: width * 0.3,
    backgroundColor: '#8E73DB',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  addIcon: {
    width: width * 0.25,
    height: width * 0.25,
    backgroundColor: '#A68BD1',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusSign: {
    fontSize: width * 0.12,
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    paddingBottom: height * 0.05,
    paddingHorizontal: width * 0.1,
  },
  responsibleButton: {
    alignSelf: 'center',
  },
  responsibleText: {
    fontSize: width * 0.06,
    color: 'white',
    textDecorationLine: 'underline',
    fontWeight: '500',
    fontFamily: 'BalooBhaijaan',
  },
});

export default ProfileSelectionScreen;