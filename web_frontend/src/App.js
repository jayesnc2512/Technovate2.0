
import React,{useState} from 'react';
import Navbar from './components/Navbar';
import MainCard from './components/MainCard'
import AltCards from './components/AltCards';
import { Box,Card } from '@mui/material';

const products = [
  {
    name: 'Eco-Friendly Shampoo',
    imageUrl: 'https://dcblog.b-cdn.net/wp-content/uploads/2021/02/Full-form-of-URL-1.jpg',
    description: 'Natural, biodegradable shampoo with zero waste packaging.',
    ecoScore: 85,
  },
  {
    name: 'Reusable Water Bottle',
    imageUrl: 'https://example.com/image2.jpg',
    description: 'Stainless steel, eco-friendly, and reusable.',
    ecoScore: 78,
  },
  {
    name: 'Organic Cotton T-Shirt',
    imageUrl: 'https://example.com/image3.jpg',
    description: '100% organic cotton, sustainably produced.',
    ecoScore: 62,
  },
  {
    name: 'Organic Cotton T-Shirt',
    imageUrl: 'https://example.com/image3.jpg',
    description: '100% organic cotton, sustainably produced.',
    ecoScore: 62,
  },
  {
    name: 'Organic Cotton T-Shirt',
    imageUrl: 'https://example.com/image3.jpg',
    description: '100% organic cotton, sustainably produced.',
    ecoScore: 62,
  },
  {
    name: 'Organic Cotton T-Shirt',
    imageUrl: 'https://example.com/image3.jpg',
    description: '100% organic cotton, sustainably produced.',
    ecoScore: 62,
  },
  // Add more products as needed
];

const App = () => {
  const [isSubmitted,setIsSubmitted]=useState(false);
  

  return (
    <div>
      <Navbar />
      

      {isSubmitted?
      <>
      <Box mt={3}> {/* Other components or content here */}
      <MainCard 
       imageSrc="" 
       name="Product Name" 
       productInfo="Detailed information about the product." 
       number="1234" 
       status="red" 
      />
     </Box>
      <AltCards products={products} />
      </>
      :
      <>
         <h1 style={{textAlign:"center",fontSize:"2.5rem",mt:0}} >CHECK YOUR PRODUCT</h1>
         <p style={{textAlign:"center"}}>*Enter  barcode of your product above</p>
         </>
     
   } 
    </div>
  );
};

export default App;