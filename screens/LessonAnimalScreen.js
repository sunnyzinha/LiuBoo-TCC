import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Modal, Keyboard, ImageBackground, Dimensions, } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const { width, height } = Dimensions.get('window')

// Imagens para o quiz
const images = {
  wolf: require('../assets/wolf.png'),
  cat: require('../assets/cat.png'),
  pig: require('../assets/pig.png'),
  cow: require('../assets/cow.png'),
  chicken: require('../assets/chicken.png'),
  lion: require('../assets/lion.png'),
  background: require('../assets/lessonbackground.png'),
  racoonHappy: require('../assets/liuboofeliz.png'),
  racoonSad: require('../assets/liubootriste.png'),
}

// Dados do quiz
const quizData = [
  {
    type: 'multipleChoiceImage',
    question: 'WHAT IS THE "GATO"?',
    options: [
      { name: 'wolf', image: images.wolf, isCorrect: false },
      { name: 'cat', image: images.cat, isCorrect: true },
      { name: 'pig', image: images.pig, isCorrect: false },
      { name: 'cow', image: images.cow, isCorrect: false },
    ],
  },
  {
    type: 'textInput',
    question: 'WHAT ANIMAL IS THIS?',
    image: images.wolf,
    correctAnswer: 'wolf',
  },
  {
    type: 'multipleChoiceImage',
    question: 'WHAT IS THE "LEÃO"?',
    options: [
      { name: 'chicken', image: images.chicken, isCorrect: false },
      { name: 'lion', image: images.lion, isCorrect: true },
      { name: 'pig', image: images.pig, isCorrect: false },
      { name: 'cat', image: images.cat, isCorrect: false },
    ],
  },
  {
    type: 'textInput',
    question: 'WHAT ANIMAL IS THIS?',
    image: images.pig,
    correctAnswer: 'pig',
  },
  {
    type: 'multipleChoiceImage',
    question: 'WHAT IS THE "VACA"?',
    options: [
      { name: 'cow', image: images.cow, isCorrect: true },
      { name: 'wolf', image: images.wolf, isCorrect: false },
      { name: 'lion', image: images.lion, isCorrect: false },
      { name: 'chicken', image: images.chicken, isCorrect: false },
    ],
  },
  {
    type: 'textInput',
    question: 'WHAT ANIMAL THIS IS?',
    image: images.chicken,
    correctAnswer: 'chicken',
  },
]

export default function LessonAnimal({ navigation }) {
  const [questions, setQuestions] = useState(quizData)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [wrongAnswers, setWrongAnswers] = useState([])
  const [correctlyAnsweredCount, setCorrectlyAnsweredCount] = useState(0)

  // Atualiza fila de perguntas quando o usuário erra
  useEffect(() => {
    if (currentQuestionIndex >= questions.length && wrongAnswers.length > 0) {
      setQuestions(wrongAnswers)
      setWrongAnswers([])
      setCurrentQuestionIndex(0)
    }
  }, [currentQuestionIndex, questions.length, wrongAnswers.length])

  const currentQuestion = questions[currentQuestionIndex]
  const progress = (correctlyAnsweredCount / quizData.length) * 100

  const handleAnswer = (answer, type) => {
    Keyboard.dismiss()
    let correct = false

    if (currentQuestion) {
      if (type === 'textInput') {
        const normalizedInput = String(answer).trim().toLowerCase()
        const normalizedCorrect = String(currentQuestion.correctAnswer)
          .trim()
          .toLowerCase()
        correct = normalizedInput === normalizedCorrect
        setUserInput(answer)
        setSelectedOption(null)
      } else if (type === 'multipleChoiceImage') {
        correct = answer.isCorrect
        setSelectedOption(answer)
      }
    }

    setIsCorrect(correct)
    setShowModal(true)
  }

  const handleNextQuestion = () => {
    // Lógica antiga (removida)
    /* if (
      currentQuestionIndex >= questions.length - 1 &&
      wrongAnswers.length === 0 &&
      isCorrect
    ) {
      setShowModal(false)
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      return
    } */

    if (isCorrect) {
      setCorrectlyAnsweredCount(correctlyAnsweredCount + 1)
    } else if (currentQuestion) {
      setWrongAnswers(prev => [...prev, currentQuestion])
    }

    setUserInput('')
    setSelectedOption(null)
    setIsCorrect(false)
    setShowModal(false)
    setCurrentQuestionIndex(prevIndex => prevIndex + 1) // Incrementa o índice
  }

  const getOptionStyle = option => {
    if (selectedOption && selectedOption.name === option.name) {
      return isCorrect ? styles.optionCorrect : styles.optionIncorrect
    }
    return null
  }

  const getModalText = () => {
    if (!currentQuestion) return ''
    if (isCorrect) return 'THAT IS CORRECT!'

    if (currentQuestion.type === 'textInput') {
      return `THAT'S NOT CORRECT. ANSWER: ${currentQuestion.correctAnswer.toUpperCase()}`
    }

    const correctOption = currentQuestion.options.find(opt => opt.isCorrect)
    return `THAT'S NOT CORRECT. ANSWER: ${correctOption?.name?.toUpperCase() || ''}`
  }

  const getModalImage = () => {
    return isCorrect ? images.racoonHappy : images.racoonSad
  }

  const renderInputArea = () => {
    if (!currentQuestion) return null

    if (currentQuestion.type === 'textInput') {
      return (
        <View style={styles.textInputContainer}>
          <Image source={currentQuestion.image} style={styles.textInputImage} />
          <TextInput
            style={[
              styles.textInput,
              userInput && isCorrect && styles.textInputCorrect,
              userInput && !isCorrect && styles.textInputIncorrect,
            ]}
            placeholder="type the name of animal"
            value={userInput}
            onChangeText={setUserInput}
            onSubmitEditing={() => handleAnswer(userInput, 'textInput')}
            editable={!showModal}
          />
          <TouchableOpacity
            style={styles.textInputButton}
            onPress={() => handleAnswer(userInput, 'textInput')}
            disabled={!userInput || showModal}
          >
            <Text style={styles.textInputButtonText}>Answer</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.optionButton, getOptionStyle(option)]}
            onPress={() => handleAnswer(option, 'multipleChoiceImage')}
            disabled={selectedOption !== null}
          >
            <Image source={option.image} style={styles.optionImage} />
            <Text style={styles.optionText}>{option.name.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  }

  return (
    <ImageBackground source={images.background} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Barra de Progresso */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
          <Text style={styles.progressText}>
            {correctlyAnsweredCount}/{quizData.length}
          </Text>
        </View>

        {/* Pergunta */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {currentQuestion ? currentQuestion.question : 'Lesson finished!'}
          </Text>
        </View>

        {/* Área de Resposta */}
        {renderInputArea()}

        {/* Modal de feedback */}
        <Modal animationType="slide" transparent visible={showModal}>
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.modalContent,
                { backgroundColor: isCorrect ? '#6A5ACD' : '#F44336' },
              ]}
            >
              <View style={styles.modalTextAndButtonContainer}>
                <Text style={styles.modalText}>{getModalText()}</Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleNextQuestion}
                >
                  <Icon
                    name="arrow-right"
                    size={24}
                    color={isCorrect ? '#6A5ACD' : '#F44336'}
                  />
                </TouchableOpacity>
              </View>
              <Image source={getModalImage()} style={styles.modalRacoonImage} />
            </View>
          </View>
        </Modal>

        {/* Finalização do Quiz */}
        {currentQuestionIndex >= questions.length && wrongAnswers.length === 0 && (
          <View style={styles.finishContainer}>
            <Text style={styles.finishText}>🎉 LESSON FINISHED!</Text>
            <TouchableOpacity
              style={styles.finishButton}
              onPress={() => navigation.navigate('Level')}
            >
              <Text style={styles.finishButtonText}>CONTINUE</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: height * 0.05,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  progressBarContainer: {
    width: width * 0.9,
    height: height * 0.01,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: height * 0.03,
    marginTop: height * 0.02,
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#82E0AA',
    borderRadius: 5,
  },
  progressText: {
    position: 'absolute',
    right: 0,
    top: height * 0.02,
    color: '#888',
    fontSize: width * 0.04,
  },
  questionContainer: {
    padding: width * 0.05,
    alignItems: 'center',
    marginTop: height * 0.05,
  },
  questionText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#6A5ACD',
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: width * 0.02,
  },
  optionButton: {
    width: width * 0.4,
    height: width * 0.4,
    margin: width * 0.02,
    borderRadius: 30,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 3,
    borderBottomWidth: 10,
    borderColor: '#6A5ACD',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3EFFF',
  },
  optionImage: {
    width: width * 0.25,
    height: width * 0.25,
    resizeMode: 'contain',
  },
  optionText: {
    marginTop: 5,
    fontSize: width * 0.035,
    fontWeight: 'bold',
    color: '#6A5ACD',
  },
  optionCorrect: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  optionIncorrect: {
    borderColor: '#F44336',
    backgroundColor: '#FFEBEE',
  },
  textInputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  textInputImage: {
    width: width * 0.6,
    height: width * 0.6,
    resizeMode: 'contain',
    marginBottom: height * 0.03,
  },
  textInput: {
    width: '80%',
    height: height * 0.06,
    borderColor: '#6A5ACD',
    borderWidth: 2,
    borderRadius: 30,
    paddingHorizontal: 15,
    fontSize: width * 0.045,
    textAlign: 'center',
    backgroundColor: '#F3EFFF',
  },
  textInputCorrect: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  textInputIncorrect: {
    borderColor: '#F44336',
    backgroundColor: '#FFEBEE',
  },
  textInputButton: {
    marginTop: height * 0.03,
    backgroundColor: '#6A5ACD',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.1,
    borderRadius: 50,
  },
  textInputButtonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },

  // Estilos do MODAL - REVERTIDOS E AJUSTADOS
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: width * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTextAndButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  modalText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: -150,
    marginBottom: 80,
  },

  modalButton: {
    backgroundColor: '#fff',
    width: 180,
    height: 45,
    borderRadius: (width * 0.15) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    marginTop: 70,
    shadowRadius: 2,
  },
  modalRacoonImage: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    marginLeft: 80,
    marginBottom: -55,
  },

  finishContainer: {
    marginTop: height * 0.05,
    alignItems: 'center',
  },
  finishText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#6A5ACD',
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  finishButton: {
    backgroundColor: '#6A5ACD',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.1,
    borderRadius: 50,
  },
  finishButtonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
})