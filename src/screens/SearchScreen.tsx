import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface Book {
    id: number;
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

    useEffect(() => {
        setBooks([
            {
                id: 1,
                title: 'O Hobbit',
                author: 'J. R. R. Tolkien',
                categories: ['Fantasia', 'Aventura'],
                image: require('../../assets/images/livro1.jpg'),
            },
            {
                id: 2,
                title: 'O Senhor dos Anéis',
                author: 'J. R. R. Tolkien',
                categories: ['Fantasia', 'Aventura'],
                image: require('../../assets/images/livro2.jpg'),
            },
            {
                id: 3,
                title: 'Harry Potter e a Pedra Filosofal',
                author: 'J. K. Rowling',
                categories: ['Fantasia', 'Aventura'],
                image: require('../../assets/images/livro3.jpg'),
            },
            {
                id: 4,
                title: 'O Guia do Mochileiro das Galáxias',
                author: 'Douglas Adams',
                categories: ['Ficção científica', 'Humor'],
                image: require('../../assets/images/livro4.jpg'),
            },
            {
                id: 5,
                title: 'Fundação',
                author: 'Isaac Asimov',
                categories: ['Ficção científica'],
                image: require('../../assets/images/livro5.jpg'),
            },
            {
                id: 6,
                title: '1984',
                author: 'George Orwell',
                categories: ['Ficção distópica'],
                image: require('../../assets/images/livro6.jpg'),
            },
            {
                id: 7,
                title: 'O Processo',
                author: 'Franz Kafka',
                categories: ['Ficção', 'Drama'],
                image: require('../../assets/images/livro7.jpg'),
            },
        ]);
    }, []);

    const handleSearch = () => {
        console.log(`Pesquisando por: ${searchTerm}`);
    };

    const handleBookPress = (book) => {
        navigation.navigate('BookDetails', { book });
    };

    const renderBookItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleBookPress(item)}>
                <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.bookImage} resizeMode='contain' />
                </View>
                <View >
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
                    placeholder="Pesquisar livros
          "
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
                    data={books}
                    renderItem={renderBookItem}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    );
}

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
        color: '#EEE8AA',
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
        backgroundColor: '#F0FFF0'
    },
    bookImage: {
        width: 80,
        height: 120,
    },
});

export default SearchScreen;