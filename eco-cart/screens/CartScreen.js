import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, FlatList } from 'react-native';

const CartPage = () => {
  // State to store cart items
  const [cart, setCart] = useState([
    { id: '1', name: 'Apple', price: 1.5, quantity: 1 },
    { id: '2', name: 'Banana', price: 1.2, quantity: 2 },
    { id: '3', name: 'Orange', price: 2, quantity: 1 },
  ]);

  // Function to remove an item from the cart
  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Function to update the quantity of an item
  const updateQuantity = (id, type) => {
    setCart(prevCart => {
      return prevCart.map(item => 
        item.id === id
          ? { ...item, quantity: type === 'increase' ? item.quantity + 1 : item.quantity - 1 }
          : item
      );
    });
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Render each cart item
  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.itemText}>{item.name} - ${item.price.toFixed(2)} x {item.quantity}</Text>
      <View style={styles.itemActions}>
        <TouchableOpacity onPress={() => updateQuantity(item.id, 'decrease')}>
          <Text style={styles.actionText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updateQuantity(item.id, 'increase')}>
          <Text style={styles.actionText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeItem(item.id)}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      
      {/* Render cart items */}
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
      />
      
      {/* Total Price */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
      </View>

      {/* Checkout Button */}
      <Button title="Proceed to Checkout" onPress={() => alert('Proceeding to Checkout')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  removeText: {
    fontSize: 18,
    color: 'red',
    marginLeft: 10,
  },
  totalContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CartPage;
