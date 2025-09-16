import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image,} from 'react-native';

const ProfileSelectionScreen = ({ navigation }) => {
  const handleProfileSelect = (profileName) => {console.log(`Perfil selecionado: ${profileName}`);
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
       <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />
       
        <View style={styles.logoContainer}>
        
          <View style={styles.pandaIcon}>
            
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Qual perfil você quer gerenciar?</Text>

        <View style={styles.profilesContainer}>
          <TouchableOpacity
            style={styles.profileCard}
            onPress={() => navigation.navigate ('Config')}
            activeOpacity={0.8}
          >
            <View style={styles.profileIconContainer}>
              <Image
                source={require('../assets/avatar1.png')} 
                style={styles.profileImage}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.profileName}>Bebê</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.profileCard}
            onPress={() => handleProfileSelect('Bebê 2')}
            activeOpacity={0.8}
          >
            <View style={styles.profileIconContainer}>
              <Image
                source={require('../assets/avatar2.png')}
                style={styles.profileImage}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.profileName}>Bebê 2</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C9BCEE', 
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 250,
    height: 70, 
    marginBottom: -400, 
    marginTop: 76
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
    marginTop: -70,
    fontFamily: 'BalooBhaijaan'
  },
  profilesContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 40,
    justifyContent: 'space-around',
  },
  profileCard: {
    alignItems: 'center',
    width: 140, 
  },
  profileIconContainer: {
    width: 130, 
    height: 130, 
    backgroundColor: '#8E73DB', 
    borderRadius: 25, 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
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
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    borderWidth: 3, 
    borderColor: '#8E73DB',
  },
  profileName: {
    fontSize: 20, 
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'BalooBhaijaan'
  },

});

export default ProfileSelectionScreen;