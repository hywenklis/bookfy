import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import moment from 'moment';
import books from '../data/books.json';

type BookDetailsScreenProps = {
    route: {
        params: {
            book: {
                id: string;
                title: string;
                author: string;
                borrowed: boolean;
                returnDate: string;
            };
        };
    };
    navigation: any;
};

const BookDetailsScreen: React.FC<BookDetailsScreenProps> = ({ route, navigation }) => {
    const { book } = route.params;
    const currentBook = books.find((b) => b.id === book.id)!;
    const [isAvailable, setIsAvailable] = useState(!currentBook.borrowed);
    const [returnDate, setReturnDate] = useState<Date>(moment(currentBook.returnDate).toDate());
    const remainingTime = moment(currentBook.returnDate).diff(moment());
    const remainingDays = moment.duration(remainingTime).asDays();
    const [duration, setDuration] = useState<number>(Math.ceil(remainingDays));

    const handleBorrow = () => {
        setIsAvailable(false);
        const newReturnDate = moment().add(duration, 'days').toDate();
        currentBook.borrowed = true;
        currentBook.returnDate = newReturnDate;
        setReturnDate(newReturnDate);
    };

    const handleReturn = () => {
        const newDate = moment().add(duration, 'days').toDate();
        setIsAvailable(true);
        currentBook.borrowed = false;
        currentBook.returnDate = newDate;
        setDuration(0);
    };

    const getRemainingTime = () => {
        const now = moment();
        const diff = moment.duration(moment(returnDate).diff(now));
        const days = Math.floor(diff.asDays());
        const hours = Math.floor(diff.asHours() - days * 24);
        const minutes = Math.floor(diff.asMinutes() - days * 24 * 60 - hours * 60);

        return `${days}d ${hours}h ${minutes}m`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{book.title}</Text>
            {isAvailable ? (
                <View style={styles.available}>
                    <Text style={styles.availableText}>Disponível para empréstimo</Text>
                    <TextInput
                        style={styles.input}
                        value={duration.toString()}
                        onChangeText={setDuration}
                        placeholder="Duração do empréstimo (em dias)"
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={styles.button} onPress={handleBorrow}>
                        <Text style={styles.buttonText}>EMPRESTAR</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.borrowed}>
                    <Text style={styles.borrowedText}>EMPRESTADO</Text>
                    <Text style={styles.dateText}>Data de devolução: {moment(returnDate).format('DD/MM/YYYY HH:mm:ss')}</Text>
                    <Text style={styles.remainingText}>Tempo restante: {getRemainingTime()}</Text>
                    <TouchableOpacity style={styles.button} onPress={handleReturn}>
                        <Text style={styles.buttonText}>DEVOLVER</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    available: {
        alignItems: 'center',
    },
    availableText: {
        fontSize: 18,
        marginBottom: 20,
    },
    borrowed: {
        alignItems: 'center',
    },
    borrowedText: {
        fontSize: 18,
        marginBottom: 20,
    },
    dateText: {
        fontSize: 16,
        marginBottom: 20,
    },
    remainingText: {
        fontSize: 16,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        width: '80%',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#00bfff',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BookDetailsScreen;