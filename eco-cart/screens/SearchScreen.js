import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

const suggestions = ['Product 1', 'Product 2', 'Product 3', 'Product 4'];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleSearch = (text) => {
    setQuery(text);
    setFilteredSuggestions(suggestions.filter((item) => item.toLowerCase().includes(text.toLowerCase())));
  };

  const handleUpload = () => {
    // Handle the upload action here
    console.log("Upload button pressed");
  };

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBarContainer}>
        <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={query}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={filteredSuggestions}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Text style={styles.suggestionItem}>{item}</Text>
        )}
      />
      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <Icon name="cloud-upload" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 40, // Adjust padding to accommodate the icon
  },
  suggestionItem: {
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  uploadButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007bff',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
