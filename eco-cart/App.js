import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import ScanScreen from './screens/ScanScreen';
import pfpicon from './assets/icon.png';
import homeicon from './assets/homeicon.png';
import shopicon from './assets/shopicon.png';
import settingicon from './assets/settingicon.png';
import CartScreen from './screens/CartScreen';
import SettingsPage from './screens/SettingScreen';
import ProductDetails from './screens/ProductDetails';
const Header = ({ navigation }) => (
  <View style={styles.header}>
    <TouchableOpacity>
      <Image style={styles.profileImage} source={pfpicon} />
    </TouchableOpacity>
    <Text style={styles.welcomeText}>Hello,</Text>
    <Text style={styles.guestText}>Guest</Text>
    <TouchableOpacity style={styles.loginButton}>
      <Text style={styles.loginText}>Logout</Text>
    </TouchableOpacity>
  </View>
);

const TabScreens = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: homeicon },
    { key: 'cart', title: 'Cart', icon: shopicon },
    { key: 'settings', title: 'Settings', icon: settingicon },
  ]);

  const renderScene = SceneMap({
    home: HomeScreen,
    cart: CartScreen,
    settings: SettingsPage,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: 300 }}
      style={styles.tabView}
      tabBarPosition="bottom"
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={styles.tabBar}
          indicatorStyle={styles.tabIndicator}
          labelStyle={styles.tabLabel}
          tabStyle={styles.tabStyle}
          renderIcon={({ route, focused }) => (
            <Image
              source={route.icon}
              style={[
                styles.tabIcon,
                { tintColor: focused ? '#fff' : '#B2DFDB' }
              ]}
            />
          )}
        />
      )}
    />
  );
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const MainScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Header navigation={navigation} />
    <TabScreens />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    padding: 10,
    backgroundColor: '#009688',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: '#fff',
  },
  guestText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
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
  mainContent: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  tabIcon: {
    width: 25,
    height: 25,
  },
  tabView: {
    backgroundColor: '#fff',
  },
  tabBar: {
    backgroundColor: '#009688',
    height: 70,
  },
  tabIndicator: {
    backgroundColor: 'white',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  tabStyle: {
    paddingVertical: 5,
  },
});
