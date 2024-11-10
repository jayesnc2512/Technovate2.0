import { CameraView, CameraProps, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import * as FileSystem from 'expo-file-system';

import { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Alert } from 'react-native';
import axios from 'axios';
// import RNFS from 'react-native-fs';


import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const cameraRef = useRef(null);
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [pictureSizes, setPictureSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(undefined);
  const [imageUri, setImageUri] = useState(null);
  const [barcode, setBarcode] = useState('');

  useEffect(() => {
    async function getSizes() {
      if (permission?.granted && cameraRef.current) {
        try {
          const sizes = await cameraRef.current.getAvailablePictureSizesAsync();
          setPictureSizes(sizes);
        } catch (error) {
          console.error('Error fetching picture sizes:', error);
        }
      }
    }
    getSizes();
  }, [permission]);
  const uploadImage = async (uri) => {
    try {
      // Read the image as base64
      console.log('Image URI:', uri); 
      const base64Image = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Prepare the data to be sent as URL-encoded form data
      const data = new URLSearchParams();
      data.append('image_base64', base64Image);

      // Send POST request with the base64-encoded image
      const response = await axios.post('http://192.168.26.190:8000/product-details', data.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
      });

      setBarcodeData(response.data); // Handle the response data
    } catch (error) {
      console.error('Error uploading image:', error.message || error);
      alert('An error occurred while uploading the image.');
    }
  };


  // Handle permission status
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.uri);
      uploadImage(result.uri);
    }
  };

  const handleBarcodeSubmit = () => {
    if (barcode.length === 13) {
      Alert.alert("Barcode Submitted", `The barcode ${barcode} was submitted.`);
    } else {
      Alert.alert("Invalid Barcode", "Please enter a 13-digit barcode.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <CameraView
          style={styles.camera}
          facing={facing}
          ref={cameraRef}
          pictureSize={selectedSize}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>

      {/* Barcode Input Section */}
      <View style={styles.barcodeContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Barcode Number"
          value={barcode}
          onChangeText={(text) => setBarcode(text.replace(/[^0-9]/g, '').slice(0, 13))}
          keyboardType="numeric"
          maxLength={13}
        />
        <TouchableOpacity onPress={() => Alert.alert("Hint", "The barcode number can usually be found below the barcode on the product.")}>
          <Ionicons name="information-circle-outline" size={24} color="gray" />
        </TouchableOpacity>
        <Button title="Submit" onPress={handleBarcodeSubmit} />
      </View>

      <View style={{ flex: 1 }}>
        <Button
          title="Take Picture"
          style={styles.button_pic}
          onPress={async () => {
            if (cameraRef.current) {
              const photo = await cameraRef.current.takePictureAsync();
              alert(`Photo captured with dimensions: ${photo.width} x ${photo.height}`);
              console.log(JSON.stringify(photo));
            }
          }}
        />

        {/* Separator */}
        <View style={{ height: 1, backgroundColor: '#eee', marginVertical: 20 }} />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button_upload} onPress={pickImage}>
            <Text style={styles.text}>Upload Image</Text>
          </TouchableOpacity>
        </View>

        {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  button_pic: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#1ABC9C',
    padding: 10,
    borderRadius: 5,
  },
  button_upload: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#1ABC9C',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  barcodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
});
