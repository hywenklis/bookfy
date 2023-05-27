import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { Formik, FormikHelpers, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

type SignupScreenProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Campo obrigatório'),
  password: Yup.string().required('Campo obrigatório'),
  confirmPassword: Yup.string()
    .required('Campo obrigatório')
    .oneOf([Yup.ref('password')], 'As senhas não coincidem'),
});

type FormikProps = {
  handleSubmit: (values: FormValues, helpers: FormikHelpers<FormValues>) => void;
};

const SignupForm = ({ handleSubmit }: FormikProps) => {
  return (
    <Formik
      initialValues={{ email: '', password: '', confirmPassword: '' }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View>
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
          <ErrorMessage name="email" component={Text} style={styles.errorText} />

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
          <ErrorMessage name="password" component={Text} style={styles.errorText} />

          <View style={styles.inputContainer}>
            <MaterialIcons name="lock" size={24} color="#c4c4c4" style={styles.inputIcon} />
            <Field
              component={TextInput}
              style={styles.input}
              placeholder="Confirme sua Senha"
              name="confirmPassword"
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              textContentType="password"
              secureTextEntry
            />
          </View>
          <ErrorMessage name="confirmPassword" component={Text} style={styles.errorText} />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const SignupScreen = ({ navigation }: SignupScreenProps) => {
  const handleSignup = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    try {
      const auth = getAuth();

      await createUserWithEmailAndPassword(auth, values.email, values.password);

      Alert.alert('Cadastrado com sucesso!');
      resetForm();
      navigation.navigate('Login');
    } catch (error: any) {
      let errorMessage = 'Erro ao cadastrar usuário';

      switch (error.code) {
        case 'auth/weak-password':
          errorMessage = 'A senha precisa ter no mínimo 6 caracteres.';
          break;
        case 'auth/email-already-in-use':
          errorMessage = 'Este email já está em uso.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'O email informado é inválido.';
          break;
        default:
          break;
      }

      Alert.alert(errorMessage);
    }
  };

  const handleLoginAccount = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crie sua conta</Text>
      <View style={styles.form}>
        <SignupForm handleSubmit={handleSignup} />
        <View style={styles.loginAccountContainer}>
          <Text style={styles.loginAccountText}>Já possui conta?</Text>
          <TouchableOpacity onPress={handleLoginAccount}>
            <Text style={styles.loginAccountLink}>Clique aqui para entrar.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    loginAccountContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginAccountText: {
        fontFamily: 'Roboto',
        fontSize: 14,
        marginRight: 5,
    },
    loginAccountLink: {
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

export default SignupScreen;