import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

// Importa todas as telas do seu aplicativo
import BemVindoScreen from './screens/BemvindoScreen';
import CadastroScreen from './screens/CadastroScreen';
import CadastroResponsavelScreen from './screens/CadastroResponsavelScreen';
import CadastroCriancaScreen from './screens/CadastroCriancaScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import LevelScreen from './screens/LevelScreen';
import ProfileSelectionScreen from './screens/ProfileSelectionScreen';
import SenhaScreen from './screens/SenhaScreen';
import ConfigScreen from './screens/ConfigScreen';
import AvatarScreen from './screens/AvatarScreen';
import ProfileScreen from './screens/ProfileScreen';
import GerenciarScreen from './screens/GerenciarScreen';
import CreateScreen from './screens/CreateSenha';
import ForgetScreen from './screens/ForgetScreen';
import LessonFruit from './screens/LessonFruitScreen';
import LessonAnimal from './screens/LessonAnimalScreen';
import LessonColor from './screens/LessonColorScreen';
import VictoryScreen from './screens/VictoryScreen';
import DefeatScreen from './screens/DefeatScreen';

// Importa o componente GameScreen
import BossScreen from './screens/BossScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    BalooBhaijaan: require('./assets/fonts/BalooBhaijaan-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BemVindo" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BemVindo" component={BemVindoScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="CadastroResponsavel" component={CadastroResponsavelScreen} />
        <Stack.Screen name="CadastroCrianca" component={CadastroCriancaScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Level" component={LevelScreen} />
        <Stack.Screen name="Perfis" component={ProfileSelectionScreen} />
        <Stack.Screen name="Config" component={ConfigScreen} />
        <Stack.Screen name="Avatar" component={AvatarScreen} />
        <Stack.Screen name="Perfil" component={ProfileScreen} />
        <Stack.Screen name="Senha" component={SenhaScreen} />
        <Stack.Screen name="Gerenciar" component={GerenciarScreen} />
        <Stack.Screen name="Create" component={CreateScreen} />
        <Stack.Screen name="Forget" component={ForgetScreen} />
        <Stack.Screen name="LessonFruit" component={LessonFruit} />
        <Stack.Screen name="LessonAnimal" component={LessonAnimal} />
        <Stack.Screen name="LessonColor" component={LessonColor} />
        <Stack.Screen name="Boss" component={BossScreen} /> 
        <Stack.Screen name="Victory" component={VictoryScreen} />
        <Stack.Screen name="Defeat" component={DefeatScreen} />  
      </Stack.Navigator>
    </NavigationContainer>
  );
}