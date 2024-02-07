import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import livro1 from '../../assets/images/livro1.jpg';
import livro2 from '../../assets/images/livro2.jpg';
import livro3 from '../../assets/images/livro3.jpg';
import livro4 from '../../assets/images/livro4.jpg';
import livro5 from '../../assets/images/livro5.jpg';
import livro6 from '../../assets/images/livro6.jpg';
import livro7 from '../../assets/images/livro7.jpg';

interface Book {
    id: string;
    title: string;
    author: string;
    categories: string[];
    image: any;
}

interface SearchScreenProps {
    navigation: any;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const db = getFirestore();
                const querySnapshot = await getDocs(collection(db, 'books'));
                const fetchedBooks = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    const book: Book = {
                        id: doc.id,
                        title: data.title,
                        author: data.author,
                        categories: data.categories,
                        image: '',
                    };

                    // Mapear a imagem com base nos dados do livro
                    switch (book.title) {
                        case 'O Hobbit':
                            book.image = livro1;
                            break;
                        case 'O Senhor dos Anéis':
                            book.image = livro2;
                            break;
                        case 'Harry Potter e a Pedra Filosofal':
                            book.image = livro3;
                            break;
                        case 'O Guia do Mochileiro das Galáxias':
                            book.image = livro4;
                            break;
                        case 'Fundação':
                            book.image = livro5;
                            break;
                        case '1984':
                            book.image = livro6;
                            break;
                        case 'O Processo':
                            book.image = livro7;
                            break;
                        default:
                            break;
                    }

                    return book;
                });
                setBooks(fetchedBooks);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const handleSearch = () => {
        console.log(`Pesquisando por: ${searchTerm}`);
        const filteredBooks = books.filter((book) => {
            const titleLower = book.title.toLowerCase();
            const searchTermLower = searchTerm.toLowerCase();
            return titleLower.includes(searchTermLower);
        });
        setFilteredBooks(filteredBooks);
    };

    const handleBookPress = (book: Book) => {
        navigation.navigate('BookDetails', { book });
    };

    const renderBookItem = ({ item }: { item: Book }) => {
        return (
            <TouchableOpacity onPress={() => handleBookPress(item)}>
                <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.bookImage} resizeMode='contain' />
                </View>
                <View>
                    <Text style={styles.bookTitle}>{item.title}</Text>
                    <Text style={styles.bookAuthor}>{item.author}</Text>
                    <Text style={styles.bookCategory}>{item.categories.join(', ')}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const handleSearchInput = (text: string) => {
        setSearchTerm(text);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Pesquisar livros"
                    onChangeText={handleSearchInput}
                    value={searchTerm}
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>Pesquisar</Text>
                </TouchableOpacity>
            </View>
            {loading ? (
                <ActivityIndicator style={styles.loading} />
            ) : (
                <FlatList
                    data={filteredBooks.length > 0 ? filteredBooks : books}
                    renderItem={renderBookItem}
                    keyExtractor={(item) => item.id}
                />

            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderRadius: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    searchButton: {
        backgroundColor: '#0080ff',
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginLeft: 10,
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    bookTitle: {
        position: 'absolute',
        top: -115,
        left: 100,
        right: 10,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    bookAuthor: {
        position: 'absolute',
        top: -70,
        left: 100,
        right: 10,
        fontSize: 14,
        color: '#777',
    },
    bookCategory: {
        top: -50,
        left: 100,
        right: 10,
        fontSize: 14,
        color: '#baa53d',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: 80,
        height: 120,
        marginRight: 10,
        backgroundColor: '#F0FFF0',
    },
    bookImage: {
        width: 80,
        height: 120,
    },
});

export default SearchScreen;
