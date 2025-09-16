import React from 'react';
import {  View,  Text,  TouchableOpacity,  StyleSheet,  SafeAreaView,  Image,  Dimensions,  ImageBackground } from 'react-native';

const { width, height } = Dimensions.get('window');

const GhostDefeatScreen = ({ navigation }) => {
  const handleContinue = () => {
    // Use navigation.navigate('Level') to move to the Level screen
    // Make sure 'Level' is the correct name of the screen in your navigator
    navigation.navigate('Level');
  };

  return (
    <ImageBackground
      source={require('../assets/finalyback.png')} // Replace with your background image path
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          {/* Title */}
          <Text style={styles.title}>YOU DEFEATED</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            THE GHOST
          </Text>

          {/* Raccoon image */}
          <View style={styles.characterContainer}>
            <View style={styles.imagePlaceholder}>
              <Image 
                source={require('../assets/liuboofeliz.png')} 
                style={styles.characterImage}
                resizeMode="contain"
              /> 
            </View>
          </View>

          {/* Continue button */}
          <TouchableOpacity 
            style={styles.continueButton} 
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>CONTINUE</Text>
            <Text style={styles.buttonArrow}>→</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 3,
    marginTop: 50,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    lineHeight: 32,
    letterSpacing: 1,
  },
  characterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  characterImage: {
    width: 500,
    height: 500,
  },
  continueButton: {
    width: 300,
    height: 60,
    borderRadius: 15,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#8E73DB', // Add a button color since the gradient component was removed
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 10,
    letterSpacing: 2,
  },
  buttonArrow: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default GhostDefeatScreen;