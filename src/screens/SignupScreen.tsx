import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { Formik, FormikHelpers, Field } from 'formik';
import * as Yup from 'yup';
import usersData from '../data/users.json';

type SignupScreenProps = {
    navigation: {
        navigate: (screen: string) => void;
    };
};

type FormValues = {
    username: string;
    password: string;
    confirmPassword: string;
};

const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Campo obrigatório'),
    password: Yup.string().required('Campo obrigatório'),
    confirmPassword: Yup.string()
        .required('Campo obrigatório')
        .oneOf([Yup.ref('password')], 'As senhas não coincidem'),
});

const SignupScreen = ({ navigation }: SignupScreenProps) => {
    const handleSignup = (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
        // verifica se o nome de usuário já existe
        const userExists = usersData.users.some(
            (user: { username: string }) => user.username === values.username
        );
        if (userExists) {
            Alert.alert('Este nome de usuário já está em uso.');
            return;
        }

        // adiciona o novo usuário ao arquivo JSON
        const newUser = {
            username: values.username,
            password: values.password,
        };
        usersData.users.push(newUser);

        // redireciona para a tela de login
        Alert.alert('Cadastrado com sucesso!.');
        resetForm();
        navigation.navigate('Login');
    };

    const handleLoginAccount = () => {
        navigation.navigate('Login');
      };

    return (
        <Formik
            initialValues={{ username: '', password: '', confirmPassword: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleSignup}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.container}>
                    <Text style={styles.title}>Crie sua conta</Text>
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
                        {touched.confirmPassword && errors.confirmPassword && (
                            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                        )}
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Cadastrar</Text>
                        </TouchableOpacity>
                        <View style={styles.loginAccountContainer}>
                            <Text style={styles.loginAccountText}>Já possui conta?</Text>
                            <TouchableOpacity onPress={handleLoginAccount}>
                                <Text style={styles.loginAccountLink}>Clique aqui para entrar.</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
            }
        </Formik >
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