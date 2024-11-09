import requests
from dotenv import load_dotenv
import google.generativeai as genai
import os
import json

load_dotenv()
api_key = os.getenv("API_KEY")
genai.configure(api_key=api_key)



class scrapeAlternateProducts:
    @staticmethod
    def getProductListing(name):
        searchResult=scrapeAlternateProducts.googleSearchApi(name)
        singleProduct=scrapeAlternateProducts.getAlternateSingleProduct(searchResult)
        print(type(singleProduct))
        return singleProduct


    @staticmethod
    def googleSearchApi(name):
        api_key = 'AIzaSyAvJYAOCPw6Pmvq2vA3tO_qtMyueIP7VvI'
        cx = '917a14a1de01c44b1'
        
        # Endpoint URL for Google Custom Search API
        url = "https://www.googleapis.com/customsearch/v1"
        
        # Parameters for the request
        params = {
            'q': name,         # Search query
            'key': api_key,    # Google API key
            'cx': cx,          # Custom Search Engine ID
            'num': 10          # Number of results (optional)
        }

        # Make the request to the API
        response = requests.get(url, params=params)
        # Check if the request was successful
        if response.status_code == 200:
            results = response.json()
            # Extract items if they exist in the response
            return results.get('items', [])
        else:
            print(f"Error: {response.status_code}")
            return None
        

    @staticmethod
    def getAlternateSingleProduct(data):
        model = genai.GenerativeModel("gemini-1.5-flash")
        prompt=f"""{data} \n from the given data give me json "name":"","image_link":"","prod_url":"" of the only the item which is actual product and not any other link or irrelevant link.give end to end brackets no extra things."""
        result = model.generate_content(prompt)
        print(f"{result.text=}")
        return result.text  



# result=scrapeAlternateProducts.getProductListing("Ethique - 'The Warrior' Solid Face Wash")
# print(result)