import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Modal } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import Icon from 'react-native-vector-icons/FontAwesome';
import { doc, onSnapshot, updateDoc, getFirestore, Timestamp } from 'firebase/firestore';

moment.locale('pt-br');

interface Book {
  id: string;
  title: string;
  author: string;
  borrowed: boolean;
  returnDate: Timestamp;
}

interface BookDetailsScreenProps {
  route: {
    params: {
      book: Book;
    };
  };
  navigation: any;
}

const BookDetailsScreen: React.FC<BookDetailsScreenProps> = ({ route, navigation }) => {
  const { book } = route.params;
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [returnDate, setReturnDate] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(getFirestore(), 'books', book.id), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as Book;
        setCurrentBook(data);
        setIsAvailable(!data.borrowed);
        setReturnDate(data.returnDate.toDate());
      }
    });

    return () => unsubscribe();
  }, []);

  const handleBorrow = async () => {
    setIsAvailable(false);
    console.log('currentBook:', currentBook);
    const newReturnDate = moment().add(duration, 'days').toDate();
    console.log('newReturnDate:', newReturnDate);
    if (currentBook) {
      const updatedBook: Book = {
        ...currentBook,
        borrowed: true,
        returnDate: Timestamp.fromDate(newReturnDate),
      };
      console.log('updatedBook:', updatedBook);
      try {
        await updateBook(updatedBook, book.id);
      } catch (error) {
        console.error('Error updating book:', error);
        throw error;
      }
    }
  };

  const handleReturn = async () => {
    setIsAvailable(true);
    const newReturnDate = moment().add(duration, 'days').toDate();
    if (currentBook) {
      const updatedBook: Book = {
        ...currentBook,
        borrowed: false,
        returnDate: Timestamp.fromDate(newReturnDate),
      };
      await updateBook(updatedBook, book.id);
      closeModal();
    }
  };

  const updateBook = async (book: Book, bookId: string) => {
    try {
      const db = getFirestore();
      const bookRef = doc(db, 'books', bookId);
      await updateDoc(bookRef, {
        borrowed: book.borrowed,
        returnDate: book.returnDate,
      });
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    }
  };


  const getRemainingTime = () => {
    if (returnDate) {
      const now = moment();
      const returnDateTime = moment(returnDate, 'DD/MM/YYYY HH:mm:ss');
      const diff = moment.duration(returnDateTime.diff(now));
      const days = Math.floor(diff.asDays());
      const hours = Math.floor(diff.asHours() - days * 24);
      const minutes = Math.floor(diff.asMinutes() - days * 24 * 60 - hours * 60);

      return `${days}d ${hours}h ${minutes}m`;
    }

    return '';
  };


  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (!currentBook) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {currentBook.title}{' '}
        <Icon
          name={isFavorite ? 'heart' : 'heart-o'}
          size={20}
          color={isFavorite ? 'red' : 'black'}
          onPress={toggleFavorite}
        />
      </Text>
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
          <Text style={styles.dateText}>
            Data de devolução: {moment(returnDate).format('DD/MM/YYYY HH:mm:ss')}
          </Text>
          <Text style={styles.remainingText}>Tempo restante: {getRemainingTime()}</Text>
          <TouchableOpacity style={styles.button} onPress={openModal}>
            <Text style={styles.buttonText}>DEVOLVER</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Tem certeza que deseja devolver o livro?</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleReturn}>
              <Text style={styles.modalButtonText}>DEVOLVER</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>CANCELAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#00bfff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookDetailsScreen;
