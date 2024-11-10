import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import CircularProgress from '@mui/material/CircularProgress'; // Import loader
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  const [loading, setLoading] = useState(false); // Loader state

  const handleSubmit = async () => {

    setLoading(true); // Show loader
    // alert(props.barcode);
    try {
      const response = await fetch('http://127.0.0.1:8000/product-details-web', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "barcode": `${props.barCode}` }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle response data here
        props.setData(data);
        console.log("Response Data:", data);
        
      } else {
        
        alert("Error: Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error: Something went wrong");
    } finally {
      setLoading(false); // Hide loader
      props.setIsSubmitted(true);
      
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#388e3c' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
            ECO-CART
          </Typography>
          <Search>
            <SearchIconWrapper>
              <QrCodeScannerIcon />
            </SearchIconWrapper>
            <StyledInputBase
              type="number"
              placeholder="Enter Product Barcode Number"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => props.setBarCode(e.target.value)}
            />
            <IconButton
              size="small"
              color="inherit"
              sx={{
                position: 'absolute',
                marginLeft: "10px",
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'white',
                color: '#388e3c',
                '&:hover': { backgroundColor: '#2e7d32' },
              }}
              onClick={handleSubmit}
              aria-label="submit barcode"
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : <ArrowForwardIcon />}
            </IconButton>
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
