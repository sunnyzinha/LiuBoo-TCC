import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ImageBackground, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Componente para texto com letras de cores diferentes
const ColorfulText = ({ text, style }) => {
  const colors = [
    '#e6005c', // Cor base
    '#ff6347', 
    '#ffa500', 
    '#ffd700', 
    '#32cd32', 
    '#4682b4', 
    '#8a2be2', 
    '#da70d6',
  ];

  return (
    <Text style={style}>
      {text.split('').map((char, index) => {
        const color = colors[index % colors.length];
        return (
          <Text key={index} style={{ color }}>
            {char}
          </Text>
        );
      })}
    </Text>
  );
};

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/back.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <MaterialCommunityIcons name="menu" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Hi, Children!</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons name="cog" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.statsBar}>
          <View style={styles.statsItem}>
            <MaterialCommunityIcons name="book" size={24} color="#556" />
            <Text style={styles.statsLabel}>LESSONS:</Text>
            <Text style={styles.statsValue}>10</Text>
          </View>
          <View style={styles.statsItem}>
            <MaterialCommunityIcons name="skull" size={24} color="#f00" />
            <Text style={styles.statsLabel}>BOSS:</Text>
            <Text style={styles.statsValue}>2</Text>
          </View>
        </View>

        <View style={styles.lessonsContainer}>
          <Text style={styles.lessonsTitle}>LESSONS</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.firstScrollView}>
            <TouchableOpacity style={styles.lessonCard} onPress={() => navigation.navigate('Level')}>
              <Image source={require('../assets/liu.png')} style={styles.lessonImage} />
              <ColorfulText text="INTRODUCTION!" style={styles.lessonText} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.lessonCard}>
              <Image source={require('../assets/wolf.png')} style={styles.lessonImage} />
              <ColorfulText text="ANIMALS" style={styles.lessonText} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.lessonCard}>
              <Image source={require('../assets/morango.png')} style={styles.lessonImage} />
              <ColorfulText text="FRUITS!" style={styles.lessonText} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.lessonCard}>
              <Image source={require('../assets/numbers.png')} style={styles.lessonImage} />
              <ColorfulText text="NUMBERS" style={styles.lessonText} />
            </TouchableOpacity>
          </ScrollView>

          {/* Segunda linha */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.secondScrollView}>
            <TouchableOpacity style={styles.lessonCard}>
              <Image source={require('../assets/shapes.png')} style={styles.lessonImage} />
              <ColorfulText text="SHAPES" style={styles.lessonText} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.lessonCard}>
              <Image source={require('../assets/pudim.png')} style={styles.lessonImage} />
              <ColorfulText text="FOOD" style={styles.lessonText} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.lessonCard}>
              <Image source={require('../assets/colors.png')} style={styles.lessonImage} />
              <ColorfulText text="COLORS" style={styles.lessonText} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.lessonCard}>
              <Image source={require('../assets/bola.png')} style={styles.lessonImage} />
              <ColorfulText text="SPORTS" style={styles.lessonText} />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, paddingTop: 50, overflow: 'visible' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerText: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginLeft: -160, marginTop: 40 },
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 25,
    marginHorizontal: 20,
    padding: 15,
    marginBottom: 30,
    top: 40,
  },
  statsItem: { flexDirection: 'row', alignItems: 'center' },
  statsLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
    marginRight: 2,
    color: '#555',
  },
  statsValue: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  lessonsContainer: {
    flex: 1,
    paddingHorizontal: 30,
    overflow: 'visible',
    paddingBottom: -500,
  },
  lessonsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 20,
    top: 70,
  },
  firstScrollView: { overflow: 'visible', paddingBottom: 70, zIndex: 1 },
  secondScrollView: { marginTop: -50, overflow: 'visible', zIndex: 999, height: 400 },
  lessonCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 150,
    height: 100,
    top: 100,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 20,
    overflow: 'visible',
    marginBottom: 90,
  },
  lessonImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    position: 'absolute',
    top: -30,
    alignSelf: 'center',
  },
  lessonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e6005c',
    marginBottom: 8,
    textAlign: 'center',
  },
});