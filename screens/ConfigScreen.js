import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  TextInput,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Custom Modal Component for alerts
const CustomAlertModal = ({ visible, title, message, onCancel, onConfirm, confirmText = 'Confirmar' }) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.alertBox}>
        <Text style={styles.alertTitle}>{title}</Text>
        <Text style={styles.alertMessage}>{message}</Text>
        <View style={styles.alertButtons}>
          <TouchableOpacity style={[styles.alertButton, styles.cancelButton]} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.alertButton, styles.confirmButton]} onPress={onConfirm}>
            <Text style={styles.confirmButtonText}>{confirmText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Custom component for toggle switch items
const ToggleItem = ({ title, value, onValueChange }) => (
  <View style={styles.toggleContainer}>
    <Text style={styles.toggleText}>{title}</Text>
    <Switch
      trackColor={{ false: '#767577', true: '#A855F7' }}
      thumbColor={value ? '#FFFFFF' : '#f4f3f4'}
      ios_backgroundColor="#3e3e3e"
      onValueChange={onValueChange}
      value={value}
      style={styles.switch}
    />
  </View>
);

// Custom component for input fields with an icon
const InputField = ({ placeholder, value, onChangeText, icon = 'pencil' }) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#888888"
      value={value}
      onChangeText={onChangeText}
    />
    <TouchableOpacity style={styles.editButton}>
      <Ionicons name={icon} size={20} color="#B8B8B8" />
    </TouchableOpacity>
  </View>
);

// Custom component for action buttons
const ActionButton = ({ title, color, textColor = '#FFFFFF', onPress }) => (
  <TouchableOpacity style={[styles.actionButton, { backgroundColor: color }]} onPress={onPress}>
    <Text style={[styles.actionButtonText, { color: textColor }]}>{title}</Text>
  </TouchableOpacity>
);

const ConfigScreen = ({ navigation }) => {
  // State variables
  const [soundEffects, setSoundEffects] = useState(true);
  const [dailyReminder, setDailyReminder] = useState(true);
  const [performanceChart, setPerformanceChart] = useState(true);
  const [newsUpdates, setNewsUpdates] = useState(true);
  const [username, setUsername] = useState('');
  const [birthDate, setBirthDate] = useState('');

  // States to control modal visibility
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteDataModal, setShowDeleteDataModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Handlers for button presses
  const handleAvatarPress = () => {
    // Navigates to the 'Avatar' screen
    navigation.navigate('Avatar');
  };

  const handleLogout = () => {
    // Shows the logout confirmation modal
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    // Handle the actual logout logic here
    console.log('User logged out');
    // Navigates to the 'Welcome' screen
    navigation.navigate('Welcome');
    setShowLogoutModal(false);
  };

  const confirmDeleteAccount = () => {
    // Handle account deletion logic here
    console.log('Account deleted');
    setShowDeleteModal(false);
  };

  const confirmDeleteData = () => {
    // Handle data deletion logic here
    console.log('Data deleted');
    setShowDeleteDataModal(false);
  };

  // Avatar component
  const AvatarImage = () => (
    <View style={styles.avatarContainer}>
      <View style={styles.avatarImageContainer}>
        <Image
          source={require('../assets/liu.png')}
          style={styles.avatarImage}
          resizeMode="cover"
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ImageBackground source={require('../assets/profileback.png')} style={styles.backgroundImage} resizeMode="cover">
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Configurações</Text>
          </View>

          {/* Avatar Section */}
          <AvatarImage />
          <TouchableOpacity onPress={handleAvatarPress} style={styles.avatarTextContainer}>
            <Text style={styles.avatarText}>Alterar avatar</Text>
            <Ionicons name="chevron-forward" size={20} color="#FFFFFF" style={styles.avatarChevron} />
          </TouchableOpacity>

          {/* General Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>GERAL</Text>
            <InputField placeholder="Nome de usuário" value={username} onChangeText={setUsername} />
            <InputField placeholder="Data de nascimento" value={birthDate} onChangeText={setBirthDate} icon="calendar-outline" />
          </View>

          {/* Sound Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SOM</Text>
            <ToggleItem title="Efeitos sonoros" value={soundEffects} onValueChange={setSoundEffects} />
          </View>

          {/* Notifications Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>NOTIFICAÇÕES</Text>
            <ToggleItem title="Lembrete diário" value={dailyReminder} onValueChange={setDailyReminder} />
            <ToggleItem title="Gráfico de desempenho" value={performanceChart} onValueChange={setPerformanceChart} />
            <ToggleItem title="Novidades e atualizações" value={newsUpdates} onValueChange={setNewsUpdates} />
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <ActionButton
              title="EXCLUIR CONTA"
              color="rgba(255, 255, 255, 0.2)"
              onPress={() => setShowDeleteModal(true)}
            />
            <ActionButton
              title="EXCLUIR OS DADOS"
              color="rgba(255, 255, 255, 0.2)"
              onPress={() => setShowDeleteDataModal(true)}
            />
            <ActionButton title="SAIR" color="#B91C1C" onPress={handleLogout} />
          </View>

          {/* Footer */}
          <TouchableOpacity style={styles.footer}>
            <Text style={styles.footerText}>Termos e Política de Privacidade</Text>
          </TouchableOpacity>
        </ImageBackground>
      </ScrollView>

      {/* Modals de Alerta */}
      <CustomAlertModal
        visible={showDeleteModal}
        title="Excluir Conta"
        message="Deseja mesmo excluir sua conta? Esta ação não pode ser desfeita."
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteAccount}
        confirmText="SIM"
      />

      <CustomAlertModal
        visible={showDeleteDataModal}
        title="Excluir Dados"
        message="Deseja mesmo excluir todos os seus dados? Esta ação não pode ser desfeita."
        onCancel={() => setShowDeleteDataModal(false)}
        onConfirm={confirmDeleteData}
        confirmText="Excluir"
      />

      <CustomAlertModal
        visible={showLogoutModal}
        title="Sair"
        message="Tem certeza que deseja sair da sua conta?"
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
        confirmText="Sair"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9333EA',
  },
  scrollView: {
    flex: 1,
  },
  backgroundImage: {
    minHeight: 1200,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 10,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
    marginBottom: -120,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  avatarImageContainer: {
    width: 90,
    height: 90,
    borderRadius: 40,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#8E73DB',
    alignItems: 'center',
  },
  avatarImage: {
    width: 125,
    height: 125,
    alignItems: 'center',
  },
  avatarTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  avatarText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  avatarChevron: {
    marginLeft: 8,
    opacity: 0.8,
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#BDADEA',
    marginBottom: 15,
    letterSpacing: 1,
    marginLeft: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5f5',
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 4,
    marginBottom: 8,
    borderWidth: 3,
    borderColor: '#BDADEA',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#888888',
  },
  editButton: {
    marginLeft: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  toggleText: {
    fontSize: 19,
    color: '#FFFFFF',
    fontWeight: '500',
    flex: 1,
    marginLeft: 2,
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  actionsContainer: {
    paddingHorizontal: 20,
    gap: 15,
    top: 20,
  },
  actionButton: {
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 19,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  footer: {
    alignItems: 'center',
    marginTop: 30,
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textDecorationLine: 'underline',
  },
  // Custom Modal Styles
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertBox: {
    width: '80%',
    backgroundColor: '#8E73DB',
    borderRadius: 30,
    padding: 25,
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  alertMessage: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  alertButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  alertButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    marginLeft: 20,
  },
  confirmButton: {
    backgroundColor: '#BF6463',
    marginRight: 20,
  },
  cancelButtonText: {
    color: 'red',
    fontSize: 19,
    fontWeight: 'bold',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
  },
});

export default ConfigScreen;