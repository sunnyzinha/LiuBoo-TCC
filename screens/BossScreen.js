import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';

const quizQuestions = [
  {
    question: 'WHAT COLOR IS THE SUN?',
    options: ['RED', 'YELLOW', 'GREEN', 'BLUE'],
    correctAnswer: 'YELLOW',
  },
  {
    question: 'WHAT FRUIT IS "ABACAXI"?',
    options: ['APPLE', 'PEAR', 'PINEAPPLE', 'GRAPE'],
    correctAnswer: 'PINEAPPLE',
  },
  {
    question: 'WHAT ANIMAL IS "VACA"?',
    options: ['COW', 'BIRD', 'WOLF', 'CAT'],
    correctAnswer: 'COW',
  },
  {
    question: 'WHAT COLOR IS THE APPLE?',
    options: ['RED', 'BLACK', 'BLUE', 'GREEN'],
    correctAnswer: 'RED',
  },
  {
    question: 'WHAT THE COLOR IS THE GRASS?',
    options: ['BLUE', 'YELLOW', 'RED', 'GREEN'],
    correctAnswer: 'GREEN',
  },
  {
    question: 'WHICH OF THESE FRUITS IS PURPLE?',
    options: ['APPLE', 'GRAPE', 'PINEAPPLE', 'PEAR'],
    correctAnswer: 'GRAPE',
  },
  {
    question: 'WHICH ANIMAL IS THE "PIG"?',
    options: ['COW', 'CAT', 'WOLF', 'PIG'],
    correctAnswer: 'PIG',
  },
  {
    question: 'WHICH FRUIT IS "PERA"?',
    options: ['PEAR', 'ORANGE', 'STRAWBERRY', 'APPLE'],
    correctAnswer: 'PEAR',
  },
  {
    question: 'WHAT COLOR IS THE STRAWBERRY?',
    options: ['GREEN', 'BLUE', 'ORANGE', 'RED'],
    correctAnswer: 'RED',
  },
  {
    question: 'WHAT IS THE "LOBO"?',
    options: ['CAT', 'PIG', 'WOLF', 'COW'],
    correctAnswer: 'WOLF',
  },
];

const BossScreen = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [playerLives, setPlayerLives] = useState(3);
  const [enemyLives, setEnemyLives] = useState(10);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleAnswer = (selectedOption) => {
    let newPlayerLives = playerLives;
    let newEnemyLives = enemyLives;
    let isGameOver = false;
    let isGameWon = false;

    if (selectedOption === currentQuestion.correctAnswer) {
      newEnemyLives = enemyLives - 1;
      setEnemyLives(newEnemyLives);
      if (newEnemyLives <= 0) {
        isGameWon = true;
        isGameOver = true;
      }
    } else {
      newPlayerLives = playerLives - 1;
      setPlayerLives(newPlayerLives);
      if (newPlayerLives <= 0) {
        isGameOver = true;
      }
    }

    if (isGameOver) {
      if (isGameWon) {
        navigation.replace('Victory');
      } else {
        navigation.replace('Defeat');
      }
    } else if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // If all questions are answered and the game isn't over yet
      // this condition handles the case where the player runs out of questions
      // but still has lives, the game is also over.
      if (newEnemyLives > 0) {
        navigation.replace('Defeat');
      }
    }
  };

  const renderHearts = () => {
    const hearts = [];
    for (let i = 0; i < 3; i++) {
      hearts.push(
        <Image
          key={i}
          source={require('../assets/heart.png')}
          style={[styles.heart, i >= playerLives && styles.emptyHeart]}
        />
      );
    }
    return hearts;
  };

  const renderBossBar = () => {
    const progress = enemyLives / 10;
    const barFillWidth = `${progress * 100}%`;

    return (
      <View style={styles.bossHealthBarBackground}>
        <View style={[styles.bossHealthBarFill, { width: barFillWidth }]} />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../assets/bossback.png')}
        style={styles.gameArea}
      >
        <View style={styles.topBar}>
          <Text style={styles.enemyName}>THE GHOST!</Text>
          {renderBossBar()}
        </View>
        <Image
          source={require('../assets/ghost.png')}
          style={styles.enemyImage}
        />
        <Image
          source={require('../assets/boo.png')}
          style={styles.playerImage}
        />
        <View style={styles.heartsContainer}>{renderHearts()}</View>
      </ImageBackground>

      <View style={styles.questionSection}>
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </View>
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswer(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#006400',
    paddingHorizontal: 90,
  },
  gameArea: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    resizeMode: 'cover',
  },
  topBar: {
    position: 'absolute',
    top: 5,
    left: 10, // Ancorado à esquerda
    alignItems: 'flex-start', // Alinha conteúdo à esquerda
    width: '100%',
  },
  enemyName: {
    fontSize: 14, // Fonte menor
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    marginTop:25,
    marginLeft: 80,
  },
  bossHealthBarBackground: {
    width: 150, // Largura menor
    height: 8, // Altura menor
    backgroundColor: '#333',
    borderRadius: 8,
    overflow: 'hidden',
    marginLeft: 45,
  },
  bossHealthBarFill: {
    height: '100%',
    backgroundColor: '#ff0000',
    borderRadius: 8,
  },
  enemyImage: {
    position: 'absolute',
    bottom: '20%',
    right: '20%',
    width: 300,
    height: 280,
    marginBottom: -70,
    marginRight: -70,
    resizeMode: 'contain',
  },
  playerImage: {
    position: 'absolute',
    bottom: '10%',
    left: '20%',
    width: 200,
    height: 180,
    marginBottom: -80,
    marginLeft: -70,
    resizeMode: 'contain',
  },
  heartsContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 1,
    right: 40,
  },
  heart: {
    width: 30,
    height: 30,
    marginHorizontal: 3,
    resizeMode: 'contain',
  },
  emptyHeart: {
    opacity: 0.3,
  },
  questionSection: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  questionBox: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 10,
    borderColor: '#606068'
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  optionsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 20,
    marginBottom: 10,
    alignItems: 'center',
    height: 50,
    borderWidth: 5,
    borderColor: '#606068',
  },
  optionText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BossScreen;