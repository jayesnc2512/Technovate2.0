import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import CircularProgress from '@mui/material/CircularProgress';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
  const [imageFile, setImageFile] = useState(null); // For storing the uploaded file

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Update the file state
    }
  };

  const handleSubmit = async (isImage) => {
    setLoading(true); // Show loader
    try {
      let url = 'http://127.0.0.1:8000/product-details-web'; // Default URL for barcode submission
      let method = 'POST';
      let body ={ "barcode": props.barCode };

      // If image is uploaded, send the request to product-details instead
      if (isImage && imageFile) {
        url = 'http://127.0.0.1:8000/product-details';
        const formData = new FormData();
        formData.append('image', imageFile);

        method = 'POST'; // Ensure it is a POST request
        body = formData;
      }

      const response = await fetch(url, {
        method: method,
        headers: isImage ? {} : { 'Content-Type': 'application/json' }, // Correct header for barcode JSON
        body: isImage ? body : JSON.stringify(body), // Correct body formatting for barcode JSON
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
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
            ECO-CART
          </Typography>

          {/* Barcode and Image Upload Section */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Barcode Input Section */}
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
                  marginLeft: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'white',
                  color: '#388e3c',
                  '&:hover': { backgroundColor: '#2e7d32' },
                }}
                onClick={() => handleSubmit(false)} // Submit Barcode
                aria-label="submit barcode"
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <ArrowForwardIcon />
                )}
              </IconButton>
            </Search>

            {/* Image Upload Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <IconButton
                  component="span"
                  color="inherit"
                  aria-label="upload image"
                  sx={{
                    backgroundColor: 'white',
                    color: '#388e3c',
                    '&:hover': { backgroundColor: '#2e7d32' },
                  }}
                >
                  <CloudUploadIcon />
                </IconButton>
              </label>
              {imageFile && (
                <Typography sx={{ ml: 2, color: 'white', fontSize: '0.9rem' }}>
                  {imageFile.name}
                </Typography>
              )}
              <IconButton
                size="small"
                color="inherit"
                sx={{
                  position: 'absolute',
                  marginLeft: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'white',
                  color: '#388e3c',
                  '&:hover': { backgroundColor: '#2e7d32' },
                }}
                onClick={() => handleSubmit(true)} // Submit Image
                aria-label="submit image"
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <ArrowForwardIcon />
                )}
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
