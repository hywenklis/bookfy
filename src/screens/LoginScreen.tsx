import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import usersData from '../data/users.json';

type LoginScreenProps = {
  navigation: any;
};

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Campo obrigatório'),
  password: Yup.string().required('Campo obrigatório'),
});

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const handleLogin = ({ username, password }: { username: string, password: string }) => {
    const userExists = usersData.users.some((user: { username: string }) => user.username === username);

    if (userExists) {
      Alert.alert('Autenticado com sucesso.');
      navigation.navigate('Books');
    } else {
      Alert.alert('Este nome de usuário não existe.');
      return;
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate('Signup');
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
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
                placeholder="Usuário"
                name="username"
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                autoCapitalize="none"
                textContentType="username"
              />
            </View>
            {touched.username && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}
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
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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