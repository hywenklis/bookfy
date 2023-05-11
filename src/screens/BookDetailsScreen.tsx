import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import moment from 'moment';

const BookDetailsScreen = ({ route, navigation }) => {
    const { book } = route.params;
    const [isAvailable, setIsAvailable] = useState(!book.borrowed);
    const [returnDate, setReturnDate] = useState(moment(book.returnDate).toDate());
    const [duration, setDuration] = useState('');

    const handleBorrow = () => {
        setIsAvailable(false);
        setReturnDate(moment().add(duration, 'days').toDate());
    };

    const handleReturn = () => {
        setIsAvailable(true);
    };

    const getRemainingTime = () => {
        const now = moment();
        const diff = moment.duration(moment(returnDate).diff(now));
        const days = Math.floor(diff.asDays());
        const hours = Math.floor(diff.asHours() - days * 24);
        const minutes = Math.floor(diff.asMinutes() - days * 24 * 60 - hours * 60);

        return `${days} dias, ${hours} horas e ${minutes} minutos`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{book.title}</Text>
            {isAvailable ? (
                <View>
                    <Text>O livro está disponível para empréstimo.</Text>
                    <TextInput
                        style={styles.input}
                        value={duration}
                        onChangeText={setDuration}
                        placeholder="Duração do empréstimo em dias"
                    />
                    <TouchableOpacity style={styles.button} onPress={handleBorrow}>
                        <Text style={styles.buttonText}>Emprestar</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View>
                    <Text>O livro está emprestado até {moment(returnDate).format('DD/MM/YYYY HH:mm:ss')}</Text>
                    <Text>Você tem {getRemainingTime()} para devolver o livro.</Text>
                    <TouchableOpacity style={styles.button} onPress={handleReturn}>
                        <Text style={styles.buttonText}>Devolver</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create

    ({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
        },
        input: {
            borderWidth: 1,
            borderColor: 'gray',
            padding: 10,
            borderRadius: 5,
            marginBottom: 10,
            alignSelf: 'stretch',
        },
        button: {
            backgroundColor: '#2196F3',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            alignSelf: 'center',
            marginTop: 10,
        },
        buttonText: {
            color: '#fff',
            fontWeight: 'bold',
        },
    });

export default BookDetailsScreen;
