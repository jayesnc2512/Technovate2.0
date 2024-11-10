from fastapi import FastAPI, File, UploadFile, HTTPException
from controller import controller
from pydantic import BaseModel

import google.generativeai as genai
from PIL import Image
import io
import os
import json
from fastapi.middleware.cors import CORSMiddleware


# Configure CORS settings
origins = [
    "http://localhost:3000",  # Example for local frontend
    "https://your-frontend-domain.com",  # Replace with your actual frontend URL
    # Add other allowed origins here
]




app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Origins that can access this API
    allow_credentials=True,  # Allows cookies to be sent
    allow_methods=["*"],     # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],     # Allows all headers (Authorization, Content-Type, etc.)
)

class BarcodeRequest(BaseModel):
    barcode: str


# Load environment variables for Gemini API
api_key = os.getenv("API_KEY")
genai.configure(api_key=api_key)

@app.post("/product-details")
async def get_product_details(image: UploadFile = File(...)):
    # Step 1: Read and process the image file
    try:
        image_bytes = await image.read()
        pil_image = Image.open(io.BytesIO(image_bytes))
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid image format") from e

    # Step 2: Use Gemini API to get the barcode from the image
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        prompt = "Extract the barcode number from this image.do not give nay thing elsee, only give barcode and ntohing else in words or anything give a complete barcode no. without any spaces"
        # Add image bytes to Gemini API if supported (pseudo-code, adapt as needed)
        result = model.generate_content([pil_image,prompt])

        # Extract barcode from response (assuming response contains the barcode number)
        barcode = result.text.strip()  # Adjust parsing as needed for actual API response format
        print("barcode",barcode)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Failed to extract barcode") from e

    # Step 3: Pass the barcode to the controller to get product details
    try:
        product_data = controller.get_data(int(barcode))
        product_json = json.loads(product_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to retrieve product details") from e

    # Return product details as JSON
    return product_json


@app.post("/product-details-web")
async def get_product_details_web(request: BarcodeRequest):
    # Step 1: Read and process the image file
    barcode = request.barcode

    # Step 3: Pass the barcode to the controller to get product details
    try:
        print(barcode)
        product_data = controller.get_data(int(barcode))
        product_json = json.loads(product_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to retrieve product details") from e

    # Return product details as JSON
    return product_json
