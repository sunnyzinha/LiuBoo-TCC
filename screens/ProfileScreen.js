import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Modal, Dimensions, ImageBackground, Image,} from 'react-native';

// Importações das imagens dos ícones - COLOQUE SUAS IMAGENS AQUI!
const icons = {
  lessons: require('../assets/puzzle.png'),      
  clock: require('../assets/clock.png'),       // icon de relógio  
  words: require('../assets/abcd.png'),        // icon de abc
  audio: require('../assets/song.png'),   // icon de nota musical
  phrases: require('../assets/chat.png'),      // icon de balão de chat
  videos: require('../assets/devil.png'),       // icon de caveira
};

const { width, height } = Dimensions.get('window');

const ProfileScreen = ({ navigation }) => { // Adicione navigation como prop
  const [modalVisible, setModalVisible] = useState(false);
  const [sideMenuVisible, setSideMenuVisible] = useState(false);
  const [selectedChild, setSelectedChild] = useState({
    id: 1,
    name: 'Bebê 1',
    startDate: '03/2025',
    profileImage: require('../assets/avatar1.png'),
    performance: {
      lessons: 2,
      minutes: 20,
      words: 7,
      audios: 4,
      phrases: 5,
      videos: 0
    }
  });

  // Dados dos filhos
  const children = [
    {
      id: 1,
      name: 'Bebê 1',
      startDate: '03/2025',
      profileImage: require('../assets/avatar1.png'),
      performance: { lessons: 2, minutes: 20, words: 7, audios: 4, phrases: 5, videos: 0 }
    },
    {
      id: 2,
      name: 'Bebê 2',
      startDate: '01/2025',
      profileImage: require('../assets/avatar2.png'),
      performance: { lessons: 8, minutes: 45, words: 23, audios: 12, phrases: 15, videos: 3 }
    }
  ];

  // 🎯 AQUI ESTÃO AS CORES E ÍCONES DOS CONTAINERS DE PERFORMANCE!
  // Você pode alterar as cores mudando a propriedade 'color' de cada item
  // Os ícones agora são imagens importadas ao invés de emojis
  const performanceItems = [
    { key: 'lessons', label: 'Lições', icon: icons.lessons, color: '#95BD9A' },      // Verde
    { key: 'minutes', label: 'Minutos', icon: icons.clock, color: '#E4D8A7' },       // Amarelo
    { key: 'words', label: 'Palavras', icon: icons.words, color: '#F28AB0' },        // Laranja
    { key: 'audios', label: 'Áudios', icon: icons.audio, color: '#E39EB7' },         // Rosa
    { key: 'phrases', label: 'Frases', icon: icons.phrases, color: '#91BDFF' },      // Azul
    { key: 'videos', label: 'Vilões', icon: icons.videos, color: '#BF6463' },        // Roxo
  ];

  // Funções de navegação
  const navigateToManageProfiles = () => {
    closeSideMenu();
    navigation.navigate('Gerenciar'); // Navega para a tela Gerenciar
  };

  const navigateToWelcome = () => {
    closeSideMenu();
    navigation.navigate('BemVindo'); // Navega para a tela BemVindo
  };

  // Itens do menu lateral com navegação
  const menuItems = [
    { icon: '👤', label: 'Gerenciar Perfis', action: navigateToManageProfiles },
    { icon: '🚪', label: 'Sair', action: navigateToWelcome },
  ];

  // Funções
  const selectChild = (child) => {
    setSelectedChild(child);
    setModalVisible(false);
  };

  const openSideMenu = () => setSideMenuVisible(true);
  const closeSideMenu = () => setSideMenuVisible(false);
  const closeModal = () => setModalVisible(false);

  // Componente do card de performance COM IMAGENS!
  const PerformanceCard = ({ item, value }) => (
    <View style={[styles.performanceCard, { backgroundColor: item.color }]}>
      <View style={styles.iconContainer}>
        <Image 
          source={item.icon} 
          style={styles.performanceIcon}
          resizeMode="contain"
        />
      </View>
      <View style={styles.performanceContent}>
        <Text style={styles.performanceLabel}>{item.label}</Text>
        <Text style={styles.performanceValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/backperfil.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} onPress={openSideMenu}>
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </TouchableOpacity>
          <Text style={styles.greeting}>Hi, Mother!</Text>
        </View>

        {/* Card do Perfil */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <ImageBackground
                source={selectedChild.profileImage}
                style={styles.profileImage}
                imageStyle={styles.profileImageStyle}
              />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.childName}>{selectedChild.name}</Text>
              <Text style={styles.startDate}>Data de início: {selectedChild.startDate}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.changeProfileButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.changeProfileText}>Trocar de perfil</Text>
          </TouchableOpacity>
        </View>

        {/* Seção de Performance */}
        <View style={styles.performanceSection}>
          <Text style={styles.sectionTitle}>Desempenho geral</Text>
          <View style={styles.performanceGrid}>
            {performanceItems.map((item) => (
              <PerformanceCard
                key={item.key}
                item={item}
                value={selectedChild.performance[item.key]}
              />
            ))}
          </View>
        </View>

        {/* Menu Lateral */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={sideMenuVisible}
          onRequestClose={closeSideMenu}
        >
          <View style={styles.sideMenuOverlay}>
            <TouchableOpacity 
              style={styles.sideMenuBackground}
              activeOpacity={1}
              onPress={closeSideMenu}
            />
            <ImageBackground
              source={require('../assets/backmenu.png')} // Substitua pelo caminho da sua imagem de fundo
              style={styles.sideMenuContent}
              resizeMode="cover"
            >
              
              
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={item.action} // Chama diretamente a função de navegação
                >
                  <Text style={styles.menuItemIcon}>{item.icon}</Text>
                  <Text style={styles.menuItemLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ImageBackground>
          </View>
        </Modal>

        {/* Modal de Seleção de Perfil */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Selecionar Perfil</Text>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
              
              {children.map((child) => (
                <TouchableOpacity
                  key={child.id}
                  style={[
                    styles.childOption,
                    selectedChild.id === child.id && styles.selectedChildOption
                  ]}
                  onPress={() => selectChild(child)}
                >
                  <View style={styles.childOptionAvatarContainer}>
                    <ImageBackground
                      source={child.profileImage}
                      style={styles.childOptionAvatar}
                      imageStyle={styles.childOptionAvatarStyle}
                    />
                  </View>
                  <View style={styles.childOptionInfo}>
                    <Text style={styles.childOptionName}>{child.name}</Text>
                    <Text style={styles.childOptionDate}>Desde {child.startDate}</Text>
                  </View>
                  {selectedChild.id === child.id && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Containers principais
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'right',
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 20,
    marginBottom: 20,
  },
  menuButton: {
    marginRight: 15,
    padding: 8,
    borderRadius: 6,
  },
  menuLine: {
    width: 22,
    height: 3,
    backgroundColor: 'white',
    marginBottom: 4,
    borderRadius: 2,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  // Card do perfil
  profileCard: {
    backgroundColor: '#8E73DB',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 45,
    marginTop: 50,
    elevation: 5,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 15,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileImageStyle: {
    borderRadius: 30,
  },
  profileInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  startDate: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  changeProfileButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  changeProfileText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },

  // Seção de performance
  performanceSection: {
    backgroundColor: '#8E73DB',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  performanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  performanceCard: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 15,
    marginBottom: 12,
    elevation: 3,
  },
  // Container do ícone
  iconContainer: {
    width: 32,
    height: 32,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  performanceIcon: {
    width: 24,
    height: 24,
    tintColor: 'white', // Deixa o ícone branco
  },
  performanceContent: {
    flex: 1,
  },
  performanceLabel: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  performanceValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Menu lateral
  sideMenuOverlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sideMenuBackground: {
    flex: 1,
  },
  sideMenuContent: {
    width: 280,
    elevation: 15,
  },
menuItem: {
  flexDirection: 'row',
  alignItems: 'center',
  height: 50,
  width: 250,
  borderRadius: 20,
  marginTop: 150,
  marginBottom: -140,
  marginLeft: 15,
  
  borderBottomWidth: 1,
  borderBottomColor: '#ccc', // Cor suave para linha inferior
},
  menuItemIcon: {
    fontSize: 20,
    marginRight: 15,
    width: 25,
    textAlign: 'center',
  },
  menuItemLabel: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#8E73DB',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 20,
    minHeight: 300,
    maxHeight: height * 0.8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#666',
    fontWeight: 'bold',
  },

  // Opções de criança
  childOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: '#C9BCEE',
  },
  selectedChildOption: {
    backgroundColor: '#B4A1E7',
    borderWidth: 2,
    borderColor: '#9980DE',
  },
  childOptionAvatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  childOptionAvatar: {
    width: '100%',
    height: '100%',
  },
  childOptionAvatarStyle: {
    borderRadius: 25,
  },
  childOptionInfo: {
    flex: 1,
  },
  childOptionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 3,
  },
  childOptionDate: {
    fontSize: 14,
    color: '#ffffff',
  },
  checkmark: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;