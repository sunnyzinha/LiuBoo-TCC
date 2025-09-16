import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const GhostDefeatScreen = ({ navigation }) => {
  const handleContinue = () => {
    // Use navigation.navigate('Boss') to go to the Boss screen
    // Make sure 'Boss' is the correct name of the screen in your navigator
    navigation.navigate('Boss');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>OOH NO!</Text>
          
          <Text style={styles.subtitle}>
            THE GHOST{'\n'}DEFEATED YOU
          </Text>
          
          <View style={styles.characterContainer}>
            <View style={styles.imagePlaceholder}>
              <Image 
                source={require('../assets/liubootriste.png')} 
                style={styles.characterImage}
                resizeMode="contain"
              /> 
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.continueButton} 
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <View style={styles.buttonSolidColor}>
              <Text style={styles.buttonText}>AGAIN</Text>
              <Text style={styles.buttonArrow}>→</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: '#C9BCEE',
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
    marginTop: 20,
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
    marginBottom: -30,
    marginTop: -50,
  },
  continueButton: {
    width: 300,
    height: 60,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 0,
    marginBottom:50,
  },
  buttonSolidColor: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#8E73DB',
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