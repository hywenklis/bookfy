import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import * as LocalAuthentication from 'expo-local-authentication';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

type LoginScreenProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Campo obrigatório'),
  password: Yup.string().required('Campo obrigatório'),
});

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async ({ email, password }: { email: string; password: string }) => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      await handleAuthentication();
    } catch (error) {
      Alert.alert('Nome de usuário ou senha incorretos.');
    }
  };

  async function handleAuthentication() {
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
  
    if (!isBiometricEnrolled) {
      return Alert.alert('Login', 'Nenhuma biometria encontrada. Por favor, cadastre no dispositivo.');
    }
  
    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login com Biometria',
      fallbackLabel: 'Biometria não reconhecida',
    });
  
    if (auth.success) {
      const authInstance = getAuth();
      const user = authInstance.currentUser;
  
      if (user) {
        setIsAuthenticated(true);
        Alert.alert('Autenticado com sucesso.');
        navigation.navigate('Books');
      } else {
        Alert.alert('Falha na autenticação.');
      }
    }
  }
  

  const handleCreateAccount = () => {
    navigation.navigate('Signup');
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Bookify</Text>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <MaterialIcons name="person" size={24} color="#c4c4c4" style={styles.inputIcon} />
              <Field
                component={TextInput}
                style={styles.input}
                placeholder="Email"
                name="email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                autoCapitalize="none"
                textContentType="email"
              />
            </View>
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            <View style={styles.inputContainer}>
              <MaterialIcons name="lock" size={24} color="#c4c4c4" style={styles.inputIcon} />
              <Field
                component={TextInput}
                style={styles.input}
                placeholder="Senha"
                name="password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                textContentType="password"
                secureTextEntry
              />
            </View>
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <View style={styles.createAccountContainer}>
              <Text style={styles.createAccountText}>Não possui conta?</Text>
              <TouchableOpacity onPress={handleCreateAccount}>
                <Text style={styles.createAccountLink}>Criar conta.</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  form: {
    width: '80%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderColor: '#c4c4c4',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  button: {
    backgroundColor: '#45b3e0',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    marginRight: 5,
  },
  createAccountLink: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: '#45b3e0',
  },
  errorText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
