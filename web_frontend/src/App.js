
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MainCard from './components/MainCard'
import AltCards from './components/AltCards';
import { Box, Card } from '@mui/material';
import BeforeSubmit from './components/BeforeSubmit';
import NA from "./Image_not_available.png";

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

// const data = {
//   "products": [
//     {
//       "barcode_number": "8901012189351",
//       "barcode_formats": "EAN-13 8901012189351",
//       "mpn": "",
//       "model": "",
//       "asin": "",
//       "title": "Clean & Clear Morning Energy Berry Blast Face Wash  Red  50 Ml",
//       "category": "",
//       "manufacturer": "Clean & Clear",
//       "brand": "",
//       "contributors": [],
//       "age_group": "",
//       "ingredients": "",
//       "nutrition_facts": "",
//       "energy_efficiency_class": "",
//       "color": "",
//       "gender": "",
//       "material": "",
//       "pattern": "",
//       "format": "",
//       "multipack": "",
//       "size": "",
//       "length": "",
//       "width": "",
//       "height": "",
//       "weight": "",
//       "release_date": "",
//       "description": "Clean & Clear Morning Energy Berry Blast Face Wash Red 50 ml.",
//       "features": [],
//       "images": [
//         "https://images.barcodelookup.com/101325/1013251282-1.jpg"
//       ],
//       "last_update": "2024-03-22 16:41:30",
//       "stores": [
//         {
//           "name": "Walmart",
//           "country": "US",
//           "currency": "USD",
//           "currency_symbol": "$",
//           "price": "8.99",
//           "sale_price": "",
//           "tax": [],
//           "link": "https://www.walmart.com/ip/Clean-Clear-Morning-Energy-Berry-Blast-Face-Wash-Red-50-ml/180197747",
//           "item_group_id": "",
//           "availability": "",
//           "condition": "",
//           "shipping": [],
//           "last_update": "2024-03-22 15:12:52"
//         }
//       ],
//       "reviews": []
//     }
//   ],
//   "sus_comment": "This product's eco-friendliness is difficult to assess without information on packaging materials, ingredients, and manufacturing processes.  It's recommended to look for products with recyclable packaging and natural, biodegradable ingredients.",
//   "sustainability_score": 35,
//   "eco_grade": null,
//   "ingre_score": null,
//   "alternate": [
//     {
//       "name": "Hydrating Facial Cleanser",
//       "image_link": "https://www.ceraveindia.com/-/media/project/loreal/brand-sites/cerave/americas/in/scx/products/pdp/packshots/hydrating-cleanser/hydrating-cleanser-473ml-lg.jpg?rev=-1?w=500&hash=399E1E55F5010A0E7C2400B61E0DB721",
//       "prod_url": "https://www.ceraveindia.com/ceramides-skin-care/cleansers/hydrating-cleanser",
//       "product_description": "This cleanser is formulated with ceramides, hyaluronic acid, and glycerin, which are all natural ingredients that help to hydrate and protect the skin. The formula is also fragrance-free and non-comedogenic, making it suitable for sensitive skin.  CeraVe is known for its commitment to sustainability, using recyclable packaging and sourcing ingredients responsibly."
//     },
//     {
//       "name": "Vanicream Gentle Facial Cleanser",
//       "image_link": "https://m.media-amazon.com/images/I/61oWDShsygL._AC_UF350,350_QL80_.jpg",
//       "prod_url": "https://www.amazon.com/Vanicream-Gentle-Facial-Cleanser-sensitive-Dispenser/dp/B00QY1XZ4W",
//       "product_description": "This gentle cleanser is free of fragrances, dyes, and other common irritants, making it a good choice for people with sensitive skin. It is also formulated with a blend of ceramides, which help to maintain the skin's natural barrier. Vanicream is a brand known for its focus on using sustainable packaging and practices."
//     },
//     {
//       "name": "Toleriane Hydrating Gentle Facial Cleanser",
//       "image_link": "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw8b2f3571/product/March%202023%20packshot%20updates/Toleriane_HydratingGentleCleanser_400ml-Pump.jpg",
//       "prod_url": "https://www.laroche-posay.us/our-products/face/face-wash/toleriane-hydrating-gentle-facial-cleanser-tolerianehydratinggentlefacialcleanser.html",
//       "product_description": "This cleanser is formulated with prebiotic thermal water, which helps to soothe and protect the skin. It is also fragrance-free and non-comedogenic, making it a good choice for sensitive skin. La Roche-Posay is a brand that is committed to sustainability, using recyclable packaging and sourcing ingredients responsibly."
//     }
//   ]
// }



const App = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [barCode, setBarCode] = useState();
  const [data, setData] = useState({});

  let productImage = data.products && data.products[0] ? data.products[0].images[0] : null;



  return (
    <div>
      <Navbar barCode={barCode} setBarCode={setBarCode} isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} data={data} setData={setData} />


      {isSubmitted ?
        <>
          <Box mt={3}> {/* Other components or content here */}
            <MainCard
              imageSrc={productImage}
              name={data.products && data.products[0] ? data.products[0].title : data.product_name}
              productInfo={data.products && data.products[0] ? data.products[0].description : data.product_description}
              s_score={data.sustainability_score}
              eco_grade={data.eco_grade}
              co2={data.carbon_footprint}
              status="red"
             
              sus_comment={data.sus_comment}
              ingredients={data.ingredients ?  data.ingredients:null}
              categories={data.categories}
              allergens={data.allergens}
              
            />
          </Box>
          <AltCards products={data.alternate} />
        </>
        :
        <BeforeSubmit />

      }
    </div>
  );
};

export default App;