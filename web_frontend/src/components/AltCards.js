// File: AltCards.js
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const Title = styled(Typography)({
  fontSize: '24px',
  fontWeight: 'bold',
  padding: '20px 0',
  textAlign: 'center',
  color: '#2e7d32', // Eco-friendly green shade
});

const EcoCard = styled(Card)({
  position: 'relative',
  width: '100%',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  overflow: 'hidden',
  cursor: 'pointer', // Added for indicating clickable elements
});

const ColorBar = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '8px',
  width: '100%',
  backgroundColor: '#66bb6a', // Fixed green color for eco-friendly indication
});

const ImageBox = styled(Box)({
  width: '100%',
  height: '150px', // Adjusted to a smaller height for compact display
  overflow: 'hidden',
  cursor: 'pointer', // Adds a pointer cursor to indicate clickable action
});

const ProductName = styled(Typography)({
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '10px 0',
  textAlign: 'center',
  color: '#004d40', // Dark teal for product name
  cursor: 'pointer', // Cursor pointer for clickability
});

const ExpandableContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: 'max-height 0.3s ease',
  overflow: 'hidden',
  maxHeight: 0, // Initially collapsed
});

const ExpandButton = styled(Button)({
  margin: '10px auto',
  backgroundColor: '#81c784', // Light green button for expand
  color: '#fff',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#66bb6a',
  },
});

const ScoreBoxContainer = styled(Box)({
  position: 'absolute',
  top: '10px',
  right: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: '5px', // Space between boxes
});

const ScoreBox = styled(Box)({
  padding: '5px 10px',
  backgroundColor: '#f1f8e9', // Light green background
  color: '#388e3c', // Dark green text
  borderRadius: '4px',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  fontSize: '12px', // Smaller font size for compact display
});

const ScoreLabel = styled(Typography)({
  fontSize: '12px',
  marginRight: '5px',
  fontWeight: 'normal',
});

const AltCards = ({ products }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleExpandClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const openProductLink = (url) => {
    window.open(url, '_blank');
  };

  return (
    <Box pd="20">
      <Title>Alternate Products</Title>
      <Grid container spacing={2} padding="0 10px" justifyContent="center">
        {products?.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}> {/* Set to md={4} for three cards per row */}
            <EcoCard>
              <ColorBar style={{ backgroundColor: 'green' }} />
              <ImageBox onClick={() => window.open(product.prod_url, '_blank')} pt="10px">
                <CardMedia
                  component="img"
                  image={product.image_link}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </ImageBox>
              <ProductName onClick={() => openProductLink(product.prod_url)}>
                {product.name}
              </ProductName>
              {/* <ScoreBoxContainer>
                <ScoreBox>
                  <ScoreLabel>Eco Score:</ScoreLabel> {product.ecoScore}
                </ScoreBox>
                <ScoreBox>
                  <ScoreLabel>Eco Grid:</ScoreLabel> {product.ecoGrid}
                </ScoreBox>
                <ScoreBox>
                  <ScoreLabel>Carbon Footprint:</ScoreLabel> {product.carbonFootprint}
                </ScoreBox>
              </ScoreBoxContainer> */}
              <ExpandButton onClick={() => handleExpandClick(index)}>
                {expandedIndex === index ? 'Collapse' : 'Expand'}
              </ExpandButton>
              <ExpandableContent
                style={{ maxHeight: expandedIndex === index ? '150px' : '0' }}
              >
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {product.product_description}
                  </Typography>
                </CardContent>
              </ExpandableContent>
            </EcoCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AltCards;
