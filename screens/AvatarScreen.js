import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, ImageBackground, Dimensions, Image,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const AvatarScreen = ({ navigation, route }) => {
  const [selectedAvatarId, setSelectedAvatarId] = useState(null);

  // Dados dos avatares disponíveis com fotos internas
  const avatars = [
    { id: 'avatar1', name: 'Avatar 1', image: require('../assets/avatar1.png') },
    { id: 'avatar2', name: 'Avatar 2', image: require('../assets/avatar2.png') },
    { id: 'avatar3', name: 'Avatar 3', image: require('../assets/avatar3.png') },
  ];

  // Componente para renderizar cada avatar
  const AvatarComponent = ({ avatar, isSelected, onSelect }) => {
    return (
      <TouchableOpacity
        style={[
          styles.avatarItem,
          isSelected && styles.selectedAvatar
        ]}
        onPress={onSelect}
      >
        <View style={styles.avatarCircle}>
          <Image 
            source={avatar.image} 
            style={styles.avatarImage}
            resizeMode="cover"
          />
          {isSelected && (
            <View style={styles.selectedIndicator}>
              <Ionicons name="checkmark" size={20} color="#FFFFFF" />
            </View>
          )}
        </View>
        <Text style={styles.avatarName}>{avatar.name}</Text>
      </TouchableOpacity>
    );
  };

  const handleSelectAvatar = (avatarId) => {
    setSelectedAvatarId(avatarId);
  };

  const handleConfirm = () => {
    if (selectedAvatarId) {
      const selectedAvatar = avatars.find(avatar => avatar.id === selectedAvatarId);
      
      // Se usando React Navigation, você pode passar dados de volta
      if (navigation && navigation.goBack) {
        navigation.navigate('Config', { selectedAvatar });
      } else {
        console.log('Avatar selecionado:', selectedAvatar);
        // Alternativa: callback ou context para atualizar o avatar
      }
    }
  };

  const handleGoBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    } else {
      console.log('Voltar para configurações');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require('../assets/backsenha.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Escolher Avatar</Text>
        </View>

        {/* Instruções */}
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            Selecione um avatar para representar você no app
          </Text>
        </View>

        {/* Grid de Avatares */}
        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.avatarGrid}>
            {avatars.map((avatar) => (
              <AvatarComponent
                key={avatar.id}
                avatar={avatar}
                isSelected={selectedAvatarId === avatar.id}
                onSelect={() => handleSelectAvatar(avatar.id)}
              />
            ))}
          </View>
        </ScrollView>

        {/* Botão de Confirmar */}
        {selectedAvatarId && (
          <View style={styles.confirmContainer}>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmButtonText}>CONFIRMAR SELEÇÃO</Text>
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9333EA',
  },
  backgroundImage: {
    flex: 1,
    minHeight: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  instructionContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  instructionText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 22,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  avatarItem: {
    width: (width - 60) / 2,
    alignItems: 'center',
    marginBottom: 25,
    padding: 15,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedAvatar: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  selectedIndicator: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  confirmContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'rgba(147, 51, 234, 0.95 )',
  },
  confirmButton: {
    backgroundColor: '#10B981',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
});

export default AvatarScreen;