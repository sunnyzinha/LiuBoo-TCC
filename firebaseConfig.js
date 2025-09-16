// Importa as funções que você precisa do SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Importa a função para o Firestore

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Sua configuração do Firebase
// Para Firebase JS SDK v7.20.0 e later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBV4ChoefXn94A9dOH37H9Pjn5uE7yOvXg",
  authDomain: "liuboo-8dc49.firebaseapp.com",
  projectId: "liuboo-8dc49",
  storageBucket: "liuboo-8dc49.firebasestorage.app",
  messagingSenderId: "813186041040",
  appId: "1:813186041040:web:25821058faab85b6bc4ad5",
  measurementId: "G-G009RW8DCF"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializa o Firestore
const db = getFirestore(app);

// Exporta o Firestore para que ele possa ser usado em outros arquivos
export { db, analytics };