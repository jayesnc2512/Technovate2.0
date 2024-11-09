import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const productData = {
  title: "Harima Baking Powder",
  image: require('../assets/featimg1.jpg'),
  grade: "B",
  description: "A versatile baking powder perfect for all your baking needs. Made with eco-friendly ingredients and a focus on reducing environmental impact.",
  ecoRating: 4.2,
  co2Rating: {
    score: 3.5,
    footprint: "3.2 kg CO2/kg",
    link: "https://example.com/carbon-footprint"
  },
  ingredients: [
    { name: "Sodium Bicarbonate", ecoRating: 4.5 },
    { name: "Monocalcium Phosphate", ecoRating: 4.0 },
    { name: "Cornstarch", ecoRating: 3.8 }
  ],
  alternatives: [
    "Weikfield Baking Powder",
    "Amazon Brand Baking Powder",
    "Royal Baking Powder"
  ],
  intakes: ['1.25g', '2.5g', '5g', '10g', '15g'],
  nutritionalFacts: [
    { label: 'Energy', amount: '5.10 kcal', percent: '0.26%', color: 'green' },
    { label: 'Total Fat', amount: '0.01 g', percent: '0.02%', color: 'green' },
    { label: 'Carbohydrates', amount: '1.25 g', percent: '0.43%', color: 'green' },
    { label: 'Total Sugars', amount: '0.00 g', percent: '0.0%', color: 'green' },
    { label: 'Sodium', amount: '600.00 mg', percent: '30.0%', color: 'red' }
  ]
};

function ProductDetails({ route1 }) {
  const [selectedIntake, setSelectedIntake] = useState(null);
  const navigation = useNavigation();

  const handlePress = (intake) => setSelectedIntake(intake);

  const getGradeImage = (grade) => {
    if (grade === "A") return require('../assets/gradA.png');
    if (grade === "B") return require('../assets/gradB.png');
    if (grade === "C") return require('../assets/gradC.png');
    return require('../assets/gradD.png');
  };

  const [showIngredients, setShowIngredients] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [showComments, setShowComments] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.backButtonText}>{"<"} Back</Text>
        </TouchableOpacity>
      </View>

      {/* Product Information */}
      <View style={styles.productContainer}>
        <Text style={styles.productType}>Processed Culinary Ingredients</Text>
        <Text style={styles.title}>{productData.title}</Text>
        <Image source={productData.image} style={styles.image} />
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>Eco Rating</Text>
          <Text style={styles.ratingScore}>Out of 5</Text>
        </View>
        <Image source={getGradeImage(productData.grade)} style={styles.gradeImage} />
      </View>

      {/* Nutritional Information */}
      <View style={styles.nutritionContainer}>
        <Text style={styles.customizeText}>Customize Your Intake</Text>
        <View style={styles.meterContainer}>
          {productData.intakes.map((intake) => (
            <TouchableOpacity
              key={intake}
              style={[
                styles.meterLabel,
                selectedIntake === intake && styles.selectedMeterLabel
              ]}
              onPress={() => handlePress(intake)}
            >
              <Text style={styles.labelText}>{intake}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.nutritionalFacts}>
          {productData.nutritionalFacts.map((item, index) => (
            <View key={index} style={styles.nutritionalRow}>
              <Text style={styles.nutritionalLabel}>{item.label}</Text>
              <Text style={styles.nutritionalAmount}>{item.amount}</Text>
              <Text style={styles.nutritionalPercent}>{item.percent}</Text>
              <View style={[styles.dot, { backgroundColor: item.color }]} />
            </View>
          ))}
        </View>
      </View>

      {/* Expandable Sections */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.button} onPress={() => setShowIngredients(!showIngredients)}>
          <Text style={styles.buttonText}>
            All Ingredients ({productData.ingredients.length})                                                     {showIngredients ? '^' : 'v'}
          </Text>
        </TouchableOpacity>
        {showIngredients && (
          <View style={styles.expandableContent}>
            {productData.ingredients.map((ingredient, index) => (
              <Text key={index} style={styles.ingredientText}>
                {ingredient.name} - Eco Rating: {ingredient.ecoRating}
              </Text>
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={() => setShowTags(!showTags)}>
          <Text style={styles.buttonText}>Product Tags (15)                                                     {showTags ? '^' : 'v'}</Text>
        </TouchableOpacity>
        {showTags && (
          <View style={styles.expandableContent}>
            <Text style={styles.ingredientText}>Tag 1, Tag 2, Tag 3...</Text>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={() => setShowComments(!showComments)}>
          <Text style={styles.buttonText}>Comments                                                                  {showComments ? '^' : 'v'}</Text>
        </TouchableOpacity>
        {showComments && (
          <View style={styles.expandableContent}>
            <Text style={styles.ingredientText}>User comment 1, User comment 2...</Text>
          </View>
        )}
      </View>

      {/* Similar Options */}
      <Text style={styles.sectionTitle}>Similar options for you</Text>
      <ScrollView horizontal contentContainerStyle={styles.alternativeContainer}>
        {productData.alternatives.map((alternative, index) => (
          <View key={index} style={styles.alternativeCard}>
            <Image source={productData.image} style={styles.alternativeImage} />
            <Text style={styles.alternativeText}>{alternative}</Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 16, paddingTop: 50 },
    backButton: { marginRight: 16 },
    backButtonText: { fontSize: 20, color: '#009688' },
  
    productContainer: { alignItems: 'center', padding: 16 },
    productType: { backgroundColor: '#00A550', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 5, fontSize: 14, color: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginVertical: 8, color: '#009688' },
    image: { width: 100, height: 100, borderRadius: 8, marginVertical: 16 },
    ratingContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
    ratingText: { color: '#009688', fontWeight: 'bold', fontSize: 16 },
    ratingScore: { marginLeft: 8, fontSize: 16, color: '#009688' },
    gradeImage: { width: 130, height: 60, marginVertical: 8 },
    expandableContent: { paddingLeft: 16, paddingTop: 8 },
    ingredientText: { fontSize: 14, color: '#666', marginBottom: 4 },
  
    nutritionContainer: { paddingHorizontal: 16, paddingVertical: 8 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8, color: '#009688',padding: 10 },
    customizeText: { color: '#009688', fontWeight: 'bold', fontSize: 16, textAlign: 'center', marginBottom: 16 },
    meterContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8 },
    meterLabel: {
        backgroundColor: '#e0e0e0', // Light gray background
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        minWidth: 50,
      },
      selectedMeterLabel: {
        backgroundColor: '#4CAF50', // Highlight color when selected
      },    
      labelText: {
        fontSize: 14,
        color: '#333', // Darker text color for readability
      },
        nutritionalFacts: { borderTopWidth: 1, borderTopColor: '#ddd', marginTop: 8 },
    nutritionalRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
    nutritionalLabel: { flex: 2, fontSize: 14 },
    nutritionalAmount: { flex: 1, fontSize: 14, color: '#00A550' },
    nutritionalPercent: { flex: 1, fontSize: 14, color: '#999' },
    dot: { width: 10, height: 10, borderRadius: 5, marginLeft: 8 },
  
    section: { paddingHorizontal: 16, paddingVertical: 8 },
    button: { backgroundColor: '#D8FFCB', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, marginVertical: 4 },
    buttonText: { fontSize: 16, color: '#009688', fontWeight: 'bold' },
  
    alternativeContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 8 },
    alternativeCard: { width: 120, alignItems: 'center', padding: 8, borderColor: '#00A550', borderWidth: 1, borderRadius: 8, marginHorizontal: 4 },
    alternativeImage: { width: 60, height: 60, borderRadius: 8, marginBottom: 8 },
    alternativeText: { fontSize: 14, textAlign: 'center', color: '#009688' },
  });
  
export default ProductDetails;
