import requests

baseurlOFF = "https://world.openfoodfacts.org/api/v0/product/"


baseurlBarcodeLookupp1 = "https://api.barcodelookup.com/v3/products?barcode="
baseurlBarcodeLookupp2="&formatted=y&key=h0u99z9ceeuvp3xie7g1fg5yoexcvv"

payload = {}
headersBarcodeLookup = {
  'Cookie': '__cf_bm=w91jISTy8TPKBXlYVQYfzlYsGHigBvrp.SkU_fUs4jA-1731155025-1.0.1.1-HUFcKSyvsnAZ.o52z4kv2RNqNQlvvxaBCK5gPiSh1c_zDjNWws7vaT5h0RCaCBY4.5bA7S.TJLM5ny3nV5q37eAWr7DsV47l58P4E86KNBo; bl_csrf=fce387e81772bf389183a14deba11260'
}



class ProductDetails:
    @staticmethod
    def getDetails(barcode):
        rawDetailsOFF = ProductDetails.getOpenfoodFact(barcode)
        Details = ProductDetails.extract_product_info(rawDetailsOFF)
        if Details == None:
            Details=ProductDetails.getBarcodeLookup(barcode)
        print(Details)
        
    @staticmethod
    def getOpenfoodFact(barcode):
        url = baseurlOFF + str(barcode) + ".json"
        response = requests.get(url)
        # Parse the response as JSON
        if response.status_code == 200:
            return response.json()  # Parse JSON directly
        else:
            print(f"Error fetching data: {response.status_code}")
            return None
    
    @staticmethod
    def extract_product_info(response):
        # Check if the response is valid
        if not response or 'product' not in response:
            print("Product data not found.")
            return None

        product_data = response['product']
        product_info = {
            "product_name": product_data.get('product_name', 'N/A'),
            "product_description": product_data.get('ingredients_text', 'N/A'),
            "categories": product_data.get('categories_tags', []),
            "brands": product_data.get('brands_tags', []),
            "allergens": product_data.get('allergens_tags', []),
            "ingredients": [ingredient.get('text', 'N/A') for ingredient in product_data.get('ingredients', [])],
            "eco_grade": product_data.get('ecoscore_grade', 'N/A'),
            "carbon_footprint": product_data.get('ecoscore_data', {}).get('agribalyse', {}).get('co2_total', 'N/A'), 
            "carbon_footprint_description": "The carbon footprint is calculated based on the product's ingredients and packaging.", 
            "sustainability_score": product_data.get('ecoscore_score', 'N/A'), 
            
            "country_of_origin": product_data.get('countries_tags', []),
            
            "product_quantity": product_data.get('product_quantity', 'N/A'),
            "product_quantity_unit": product_data.get('product_quantity_unit', 'N/A')
        }
        return product_info
    
    @staticmethod
    def getBarcodeLookup(barcode):
        url=baseurlBarcodeLookupp1+str(barcode)+baseurlBarcodeLookupp2
        response = requests.request("GET", url, headers=headersBarcodeLookup, data=payload)
        return response.text



# Test the function
ProductDetails.getDetails(7622201756697)
 