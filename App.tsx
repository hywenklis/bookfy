import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import SearchScreen from './src/screens/SearchScreen'
import BookDetailsScreen from './src/screens/BookDetailsScreen';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './src/config/firebase';
import { getAnalytics } from "firebase/analytics";

const Stack = createStackNavigator();

const App = () => {

  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Books"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BookDetails"
          component={BookDetailsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;







