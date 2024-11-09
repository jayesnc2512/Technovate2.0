
// import React from 'react';
// import { Card, CardContent, Box, Typography } from '@mui/material';
// import { styled } from '@mui/material/styles';
// // import EcoIcon from '@mui/icons-material/Eco'; // Import Eco icon from Material UI

// // Your styled components and `MainCard` component code here...

// const StatusBar = styled('div')(({ theme, statusColor }) => ({
//     height: '6px',
//     backgroundColor: statusColor,
//     borderRadius: theme.shape.borderRadius,
// }));

// const StyledCard = styled(Card)(({ theme }) => ({
//     maxWidth: '90%', // Width slightly less from both ends
//     margin: '0 auto', // Centering the card horizontally
//     borderRadius: theme.shape.borderRadius,
//     boxShadow: theme.shadows[3],
// }));

// const ImageBox = styled(Box)({
//     width: '30%', // Adjust width of image section
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: '10px',
// });

// const InfoBox = styled(Box)({
//     flexGrow: 1,
//     padding: '10px',
// });

// const NumberBox = styled(Box)(({ statusColor }) => ({
//     position: 'absolute',
//     top: '10px',
//     right: '10px',
//     padding: '8px 14px',  // Larger padding for emphasis
//     background: `linear-gradient(135deg, ${statusColor}, #4CAF50)`, // Gradient background with the status color
//     borderRadius: '8px',
//     display: 'flex',
//     alignItems: 'center',
//     color: '#fff', // White text color for better contrast
//     fontWeight: 'bold',
//     boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',  // Soft shadow for a 3D effect
//     animation: 'pulse 2s infinite', // Subtle pulsing effect
//     fontSize: '1rem', // Adjust font size for visibility
//     textTransform: 'uppercase', // To emphasize the score type
//     gap: '8px', // Space between text and icon
// }));

// // Define keyframes for pulse animation
// const styles = `
// @keyframes pulse {
//   0%, 100% {
//     transform: scale(1);
//     box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
//   }
//   50% {
//     transform: scale(1.05); // Slightly larger at peak of pulse
//     box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
//   }
// }
// `;

// const NameBox = styled(Typography)(({ theme }) => ({
//     marginTop: '8px',
//     padding: '4px 8px',
//     backgroundColor: theme.palette.grey[200],
//     borderRadius: theme.shape.borderRadius,
//     textAlign: 'center',
//     width: '80%', // Adjust width of the name box
// }));

// // Function to determine color based on status value
// const getStatusColor = (status) => {
//     if (status === 'green') return 'green';
//     if (status === 'yellow') return 'yellow';
//     if (status === 'red') return 'red';
//     return 'gray';
// };


// export default function MainCard({ imageSrc, name, productInfo, number, status }) {
//     const statusColor = getStatusColor(status);

//     return (
//         <StyledCard>
//             {/* Status Bar */}
//             <StatusBar statusColor={statusColor} />

//             <CardContent style={{ display: 'flex', position: 'relative' }}>
//                 {/* Image Box */}
//                 <ImageBox>
//                     <img src={imageSrc} alt="Product" style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
//                     <NameBox variant="subtitle2">{name}</NameBox>
//                 </ImageBox>

//                 {/* Product Info Box */}
//                 <InfoBox>
//                     <Typography variant="h6" gutterBottom>
//                         Product Information
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                         {productInfo}
//                     </Typography>
//                 </InfoBox>

//                 {/* Number Box with Eco Score */}
//                 <NumberBox statusColor={statusColor}>
                    
//                     <Typography variant="body2" color="inherit">
//                         {number}
//                     </Typography>
//                 </NumberBox>
//             </CardContent>
//         </StyledCard>
//     );
// }




import React from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StatusBar = styled('div')(({ theme, statusColor }) => ({
    height: '6px',
    backgroundColor: statusColor,
    borderRadius: theme.shape.borderRadius,
}));

const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: '90%',
    margin: '0 auto',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    display: 'flex',
    flexDirection: 'column',
}));

const ImageBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    borderRight: '1px solid #ddd',
    width: '35%',
});

const DetailsBox = styled(Box)({
    flexGrow: 1,
    padding: '10px',
});

const NumberBox = styled(Box)(({ statusColor }) => ({
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '8px 14px',
    backgroundColor: statusColor, // Solid background color based on status
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1rem',
    textTransform: 'uppercase',
    gap: '8px',
}));

const NameBox = styled(Typography)(({ theme }) => ({
    marginTop: '8px',
    padding: '4px 8px',
    backgroundColor: theme.palette.grey[200],
    borderRadius: theme.shape.borderRadius,
    textAlign: 'center',
    width: '80%',
}));
const MainCardContainer = styled(Box)({
    position: 'relative',
    width: '100%',
    padding: '20px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
    backgroundColor: '#fff',
  });
  
  const ScoreBoxContainer = styled(Box)({
    position: 'absolute',
    top: '10px',
    right: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px', // Adds spacing between the boxes
  });
  
  const ScoreBox = styled(Box)({
    padding: '5px 10px',
    backgroundColor: '#ddd',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: '100px',
  });
  
  const ScoreLabel = styled(Typography)({
    fontSize: '0.8rem',
    fontWeight: 'bold',
    marginRight: '5px',
  });

// Function to determine color based on status value
const getStatusColor = (status) => {
    if (status === 'green') return 'green';
    if (status === 'yellow') return '#FFC107'; // Darker shade of yellow
    if (status === 'red') return 'red';
    return 'gray';
};

export default function MainCard({ imageSrc, name, productInfo, number, status }) {
    const statusColor = getStatusColor(status);

    return (
        <StyledCard>
            <StatusBar statusColor={statusColor} />
            <CardContent style={{ display: 'flex', position: 'relative' }}>
                
                {/* Image and Name Box */}
                <ImageBox>
                    <img src={imageSrc} alt="Product" style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
                    <NameBox variant="subtitle2">{name}</NameBox>
                </ImageBox>

                {/* Product Details Box */}
                <DetailsBox>
                    <Typography variant="h6" gutterBottom>
                        Product Information
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {productInfo}
                    </Typography>
                </DetailsBox>

                {/* Number Box with Eco Score */}
                <NumberBox statusColor={statusColor}>
                    <Typography variant="body2" color="inherit">
                        {number}
                    </Typography>
                </NumberBox>
            </CardContent>
        </StyledCard>
    );
}

// import React from 'react';
// import { Box, Typography } from '@mui/material';
// import styled from '@emotion/styled';

// const MainCardContainer = styled(Box)({
//   position: 'relative',
//   width: '100%',
//   padding: '20px',
//   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
//   borderRadius: '8px',
//   backgroundColor: '#fff',
// });

// const ScoreBoxContainer = styled(Box)({
//   position: 'absolute',
//   top: '10px',
//   right: '10px',
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '5px', // Adds spacing between the boxes
// });

// const ScoreBox = styled(Box)({
//   padding: '5px 10px',
//   backgroundColor: '#ddd',
//   borderRadius: '4px',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   minWidth: '100px',
// });

// const ScoreLabel = styled(Typography)({
//   fontSize: '0.8rem',
//   fontWeight: 'bold',
//   marginRight: '5px',
// });

// const MainCard = ({ product }) => {
//   return (
//     <MainCardContainer>
//       {/* Other Main Card content goes here */}
      
//       {/* Score Boxes */}
//       <ScoreBoxContainer>
//         <ScoreBox>
//           <ScoreLabel>Eco Score:</ScoreLabel> {product.ecoScore}
//         </ScoreBox>
//         <ScoreBox>
//           <ScoreLabel>Eco Grid:</ScoreLabel> {product.ecoGrid}
//         </ScoreBox>
//         <ScoreBox>
//           <ScoreLabel>Carbon Footprint:</ScoreLabel> {product.carbonFootprint}
//         </ScoreBox>
//       </ScoreBoxContainer>
//     </MainCardContainer>
//   );
// };

// export default MainCard;

