import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import imgban1 from '../assets/imgban1.png';
import scanimg from '../assets/scanimg.png';
import searchimg from '../assets/searchimg.png';
import featimg1 from '../assets/featimg1.jpg';
import featimg2 from '../assets/featimg2.jpg';
import featimg3 from '../assets/featimg3.jpg';
import banner2 from '../assets/banner2.png';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

export default function App() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Home', icon: searchimg  },
    { key: 'cart', title: 'Cart', icon: 'shopping-cart' },
    { key: 'settings', title: 'Settings', icon: 'settings' },
  ]);
  const navigation = useNavigation(); // Use useNavigation to access navigation

  const renderScene = BottomNavigation.SceneMap({
    home: () => (
      <View style={styles.mainContent}>
        {/* Home Content */}
        <Text style={styles.sectionTitle}>Home</Text>
        <Text>Welcome to EcoCart!</Text>
      </View>
    ),
    cart: () => (
      <View style={styles.mainContent}>
        {/* Cart Content */}
        <Text style={styles.sectionTitle}>Cart</Text>
        <Text>Your Cart is empty.</Text>
      </View>
    ),
    settings: () => (
      <View style={styles.mainContent}>
        {/* Settings Content */}
        <Text style={styles.sectionTitle}>Settings</Text>
        <Text>Manage your preferences.</Text>
      </View>
    ),
  });

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.mainContent}>
   
  {/* <View style={styles.header}>
    <TouchableOpacity>
      <Image
        style={styles.profileImage}
        source={{ uri: 'https://via.placeholder.com/40' }}
      />
    </TouchableOpacity>
    <Text style={styles.welcomeText}>Hello,</Text>
    <Text style={styles.guestText}>Guest</Text>
    <TouchableOpacity style={styles.loginButton}>
      <Text style={styles.loginText}>Logout</Text>
    </TouchableOpacity>
  </View> */}


        {/* Banner Section */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Scanning for a greener tomorrow</Text>
          <Image
            style={styles.bannerImage}
            source={imgban1}
          />
        </View>

        {/* Button Section */}
        <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Search')}>
          <Image
            style={styles.searchimg}
            source={searchimg}
          />
            <Text style={styles.buttonText}>Search & Discover</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Scan')}>
          <Image
            style={styles.scanimg}
            source={scanimg}
          />
            <Text style={styles.buttonText}>Scan & Uncover</Text>
          </TouchableOpacity>
        </View>

        {/* Featured Items Section */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Items</Text>
          <ScrollView horizontal style={styles.featuredItemsContainer}>
            <TouchableOpacity style={styles.featuredItem} onPress={() => navigation.navigate('ProductDetails')}>
              <Image
                style={styles.featuredItemImage}
                source={featimg1}
              />
              <Text style={styles.featuredItemText}>Cookies</Text>
            </TouchableOpacity>
            <View style={styles.featuredItem}>
              <Image
                style={styles.featuredItemImage}
                source={{ uri: 'https://imgs.search.brave.com/YBrNmG0InaKIBRZP8xpF-vn7AXxHf6IP1nYHYM6XHUM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFKUmdQTFJ2cUwu/anBn' }}
              />
              <Text style={styles.featuredItemText}>Pen</Text>
            </View>
            <View style={styles.featuredItem}>
              <Image
                style={styles.featuredItemImage}
                source={featimg3}
              />
              <Text style={styles.featuredItemText}>Chocolates</Text>
            </View>
          </ScrollView>
        </View>

        {/* About Us Section */}
        <View style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>About Us</Text>
          <Text style={styles.aboutText}>
            We are committed to a greener tomorrow by providing innovative solutions.
          </Text>
        </View>

        {/* Placeholder for additional content */}
        <Image
                style={styles.placeholder}
                source={banner2}
              />

      </View>

      {/* Bottom Navigation */}
      {/* <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={styles.bottomNav}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: '#000',
  },
  guestText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  loginButton: {
    marginLeft: 'auto',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderColor: '#00A550',
    borderWidth: 1,
  },
  loginText: {
    color: '#00A550',
    fontWeight: 'bold',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#009688',
    padding: 25,
    borderRadius: 10,
    marginBottom: 20,
  },
  bannerText: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bannerImage: {
    width: 80,
    height: 80,
  },
  searchimg: {
    width: 40,
    height: 40,
  },
  scanimg: {
    width: 40,
    height: 40,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#D8FFCB',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  featuredSection: {
    marginBottom: 20,
  },
  featuredItemsContainer: {
    flexDirection: 'row',
  },
  featuredItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  featuredItemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  featuredItemText: {
    color: '#000',
    fontSize: 14,
  },
  aboutSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  aboutText: {
    color: '#000',
    fontSize: 14,
    lineHeight: 20,
  },
  placeholder: {
    // backgroundColor: '#E0E0E0',
    height: 100,
    width: 360,
    borderRadius: 10,
  },
  bottomNav: {
    backgroundColor: '#00A550',
  },
});
