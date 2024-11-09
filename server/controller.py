from getProductDetails import ProductDetails
from gemini_sustainability import sustainability
from scrapeAlternateProducts import scrapeAlternateProducts
import json

class controller:
    @staticmethod
    def get_data(barcode):
        # This is a static method that returns a list of dictionaries
        # prod_desc=""
        print(type(barcode))
        prod_desc=ProductDetails.getDetails(barcode)
        # prod_desc={'products': [{'barcode_number': '8901765126122', 'barcode_formats': 'EAN-13 8901765126122', 'mpn': '', 'model': '', 'asin': '', 'title': 'Hauser XO Ball Pen (Pack of 50) Blue, Black, Red', 'category': '', 'manufacturer': '', 'brand': 'Hauser', 'contributors': [], 'age_group': '', 'ingredients': '', 'nutrition_facts': '', 'energy_efficiency_class': '', 'color': '', 'gender': '', 'material': 'Plastic', 'pattern': '', 'format': '', 'multipack': '', 'size': '', 'length': '', 'width': '', 'height': '', 'weight': '', 'release_date': '', 'description': 'With a minimal design and a super soft ergonomic matte body get ready for a secure, comfortable hold even after extended use. 40 blue | 7black | 3 red. Note : Images are for illustrationn only. Made of Plastic.', 'features': [], 'images': ['https://images.barcodelookup.com/32403/324038103-1.jpg', 'https://images.barcodelookup.com/32403/324038103-2.jpg', 'https://images.barcodelookup.com/32403/324038103-3.jpg', 'https://images.barcodelookup.com/32403/324038103-4.jpg'], 'last_update': '2024-07-17 04:20:28', 'stores': [], 'reviews': []}]}

        sustain=sustainability()
        sustainability_comment=sustain.get_sustainability_comment(prod_desc)
        prod_desc["sus_comment"]=sustainability_comment["sus_comment"]

        if "sustainability_score" not in prod_desc or not prod_desc["sustainability_score"]:
            prod_desc["sustainability_score"] = sustainability_comment["sustainability_score"]

        if "eco_grade" not in prod_desc or not prod_desc["eco_grade"]:
            prod_desc["eco_grade"] = sustainability_comment["eco_grade"]

        prod_desc["ingre_score"]=sustain.get_ingredients_score(prod_desc)
        alternate_products_raw=sustain.alternate_products(prod_desc)

        prod_desc["alternate"] = []
        alternate_products_raw=json.loads(alternate_products_raw)
        
        for product in alternate_products_raw[:3]:  # Only loop through the first three products
            # Use the product name to search via Google Search API
            desc=product["product_description"]
            product_details = scrapeAlternateProducts.getProductListing(product["product_name"])
          
            product_details = json.loads(product_details)
            if isinstance(product_details, list) and len(product_details) > 0:
                product_details = product_details[0]  # Get the first product if it's a list

            # Now safely add the description
            if isinstance(product_details, dict):
                product_details["product_description"] = desc
                prod_desc["alternate"].append(product_details)
            else:
                print("Unexpected format in product details:", product_details)
        prod_desc=json.dumps(prod_desc)
        print("prod_result_final",prod_desc)



        return prod_desc
    
# controller.get_data(8901012189351)
        
        

