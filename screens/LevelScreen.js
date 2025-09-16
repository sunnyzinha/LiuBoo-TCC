import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const App = () => {
  const navigation = useNavigation();
  const localImage = require('../assets/Atividade.png');
  
  return (
    <ImageBackground
      source={localImage}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
        <Text style={styles.voltarTexto}> ← </Text>
      </TouchableOpacity>
    
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
 
          {/* This is the skull button. The onPress prop is correctly set to navigate to 'BossScreen'. */}
          <TouchableOpacity 
            style={styles.skullButton} 
            onPress={() => navigation.navigate('Boss')}
          >
            <Text style={styles.skullText}>💀</Text>
          </TouchableOpacity>

          <View style={styles.dashedLineSkullTo4} />

          <View style={[styles.pathSegment, styles.segment4]}>
            <TouchableOpacity style={styles.phaseButton}>
              <Text style={styles.phaseNumber}>4</Text>
            </TouchableOpacity>
            <View style={styles.dashedLine4To3} />
          </View>

          <View style={[styles.pathSegment, styles.segment3]}>
            <TouchableOpacity style={styles.phaseButton}
              onPress={() => navigation.navigate('LessonColor')}
            >
              <Text style={styles.phaseNumber}>3</Text>
            </TouchableOpacity>
            <View style={styles.dashedLine3To2} />
          </View>

          <View style={[styles.pathSegment, styles.segment2]}>
            <TouchableOpacity style={styles.phaseButton}
              onPress={() => navigation.navigate('LessonAnimal')}
            >
              <Text style={styles.phaseNumber}>2</Text>
            </TouchableOpacity>
            <View style={styles.dashedLine2To1} />
          </View>

          <View style={[styles.pathSegment, styles.segment1]}>
            <TouchableOpacity
              style={styles.phaseButton}
              onPress={() => navigation.navigate('LessonFruit')}
            >
              <Text style={styles.phaseNumber}>1</Text>
            </TouchableOpacity>
          </View>

        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  voltar: {
    position: 'absolute',
    top: height * 0.05,
    zIndex: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  voltarTexto: {
    color: 'black',
    fontSize: width * 0.08,
    fontFamily: 'BalooBhaijaan',
  },
  backgroundImage: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'transparent', 
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: height * 0.05,
  },
  skullButton: {
    width: '80%',
    height: height * 0.12,
    borderWidth: 4,
    borderColor: '#9F8BD9',
    borderBottomWidth: 13,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    backgroundColor: '#C9BCEE',
    top: height * 0.09,
  },
  skullText: {
    fontSize: width * 0.08,
    color: 'black',
  },
  pathSegment: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  segment1: {
    bottom: height * 0.1,
    left: width * 0.2,
  },
  segment2: {
    bottom: height * 0.28,
    right: width * 0.16,
  },
  segment3: {
    bottom: height * 0.45,
    left: width * 0.18,
  },
  segment4: {
    bottom: height * 0.55,
    right: width * 0.16,
  },
  phaseButton: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: 100,
    backgroundColor: '#C9BCEE',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    borderTopWidth: 2,
    borderRightWidth: 4,
    borderLeftWidth: 4,
    borderBottomWidth: 10,
    borderColor: '#9F8BD9',
    borderBottomColor: '#4B0082',
  },
  phaseNumber: {
    fontSize: width * 0.1,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;