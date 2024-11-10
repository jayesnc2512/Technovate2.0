
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
import NA from "../Image_not_available.png";
import Tooltip from '@mui/material/Tooltip';


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
    backgroundColor: 'statusColor', // Solid background color based on status
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


function getEcoGradeColor(ecoGrade) {
    // Lowercase the ecoGrade first
    ecoGrade = ecoGrade.toLowerCase();

    switch (ecoGrade) {
        case 'a':
            return 'green';   // Excellent
        case 'b':
            return 'lightgreen';  // Good
        case 'c':
            return 'yellow';  // Average
        case 'd':
            return 'red';  // Below Average
        case 'e':
            return 'red';     // Poor
        default:
            return 'gray';    // Invalid grade
    }
}

// Function to determine color based on status value
const getStatusColor = (status) => {
    if (status === 'green') return 'green';
    if (status === 'yellow') return '#FFC107'; // Darker shade of yellow
    if (status === 'red') return 'red';
    return 'gray';
};

// const ingre_score = {
//     key1: "value1",
//     key2: "value2",
//     key3: "value3",
//     key4: "value4",
//     key5: "value5",
//     key6: "value6",
//     key7: "value7",
//     key8: "value8",
//     key9: "value9"
// };

// Function to format keys in a 3-column table
function formatIngreScoreTable(ingreScore) {
    const keys = Object.keys(ingreScore);
    let rows = [];

    // Divide keys into rows of 3
    for (let i = 0; i < keys.length; i += 3) {
        rows.push(keys.slice(i, i + 3));
    }

    return (
        <table>
            <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} style={{fontSize:"15px"}}>
                        {row.map((key, colIndex) => (
                            <td key={colIndex}>{key}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
} 
function formatList(list) {
    const keys = Object.keys(list);
    let rows = [];

    // Divide keys into rows of 3
   

    return (
        <table>
            <tbody>
                {list.map((row, rowIndex) => (
                    <tr key={rowIndex} style={{ fontSize: "15px" }}>
                        {list.map((key, colIndex) => (
                            <td key={colIndex}>{key}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}


export default function MainCard({ imageSrc, name, productInfo, number, status, s_score, eco_grade, co2,
    sus_comment,ingredients,allergens,categories }) {
    const statusColor = getStatusColor(status);
    const img = (src) => (src?src:NA)

    const s_score_color = (num) => {
        if (num >= 60) return 'green';
        else if (num >= 45) return 'yellow';
        else return 'red';
    }

    return (
        <StyledCard>
            <StatusBar statusColor={statusColor} />
            <CardContent style={{ display: 'flex', position: 'relative' }}>
                
                {/* Image and Name Box */}
                <ImageBox>
                    <img src={img(imageSrc)} alt="Product" style={{ maxWidth: '50vw', height: '300px', borderRadius: '4px' }} />
                    <NameBox variant="subtitle2">{name}</NameBox>
                </ImageBox>

                {/* Product Details Box */}
                <DetailsBox zIndex={0}>
                    <Typography variant="h6" gutterBottom>
                        Product Information
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ fontSize: "15px" }}>
                        {productInfo}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Why?
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ fontSize: "15px" }}>
                        {sus_comment}
                    </Typography>
                    {ingredients && 
                        <>
                    <Typography variant="h6" gutterBottom>
                        Ingredients
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                            {ingredients}
                        </Typography>
                        </>
                    }
                    {(categories && categories?.length !== 0) && 
                        <>
                    <Typography variant="h6" gutterBottom>
                        Categories
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ fontSize: "15px" }}>
                            {categories}
                    </Typography>
                    </>
                    }
                    {(allergens && allergens?.length !== 0) &&
                        <>
                            <Typography variant="h6" gutterBottom>
                                Allergens
                            </Typography>
                            <Typography variant="body2" color="text.secondary" style={{ fontSize: "15px" }}>
                               {allergens}
                            </Typography>
                        </>
                    }

                </DetailsBox>
                {/* Number Box with Eco Score */}
                {s_score &&
                    <Tooltip title="Sustainability Score">

                        <NumberBox backgroundColor={s_score_color(s_score)}>
                            <Typography variant="body2" color="inherit">
                                {s_score}
                            </Typography>
                        </NumberBox>
                    </Tooltip>
                }
                {co2 &&
                    <Tooltip title="Carbon_footprint per kg in kg">
                        <NumberBox backgroundColor={() => s_score_color(s_score)} marginRight="100px">
                            <Typography variant="body2" color="inherit">
                                {co2}
                            </Typography>
                        </NumberBox>
                    </Tooltip>
                }
                {eco_grade &&
                    <Tooltip title="Eco_Grade">
                        <NumberBox backgroundColor={getEcoGradeColor(eco_grade)} marginRight="50px">
                            <Typography variant="body2" color="inherit">
                                {eco_grade}
                            </Typography>
                        </NumberBox>
                    </Tooltip>
                }
            </CardContent>
        </StyledCard>
    );
}
