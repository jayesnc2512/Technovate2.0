import os
from dotenv import load_dotenv
import google.generativeai as genai
import json


load_dotenv()

class sustainability:
    def __init__(self):
    
        api_key = os.getenv('API_KEY')

        if api_key is None:
            raise ValueError("API key not found in environment variables")

# Configure the API with the loaded API key
        genai.configure(api_key=api_key)

# Initialize the model
        self.model = genai.GenerativeModel("gemini-1.5-flash")

    def get_sustainability_comment(self, product_description :str):
        

        # Generate content (story about a magic backpack)
        prompt = f"for the given product justify in 2 3 lines comments on its ecofriendliness. the product is given as :{product_description}. if sustainability_score and eco grade is not present for this product desciption. predict the sustainability score and eco_grade otherwisew no need. output shoudl be stricly a json format. give only sus_comment, sustainability_score, eco grade nothing else. Stay restrcited to brackets onyl nothing aage piche"
        response = self.model.generate_content(prompt)

        # Print the result
        
        result = response.text
        result=json.loads(result)
        print(result)
        return result
    def get_ingredients_score(self,product_description :str):
        prompt = f"can you give sustainability score for ingedients of given product description. the product is given as :{product_description}.give output as json where ingredients score as a objcet under which key will be ingredient name and value will be sustaibility score. give a approximate sustainbality score. if an ingredient in description is not an ingredient then dont give. the output should h=only have the json nothing else, no explanation, no notes."
        response = self.model.generate_content(prompt)
        try:
            parsed_response = json.loads(response.text)
            print(json.dumps(parsed_response, indent=2))  # Pretty-print the JSON
            return parsed_response
        except json.JSONDecodeError:
            print("Failed to parse response as JSON.")
            return None
    
    def alternate_products(self,product_description :str):
        prompt = f"the product is given as :{product_description}. for the given product can you suggest any alternative sustainable or greener products. do not suggest any homemade or diy products.i want products names which can be found at other market places. i want output as array of json with 2 key value pairs where key will be prosuct name and product description stating why is it sustainbale.i only want json nothing else no extra explanation or note. strictly give outptu between brackets only and not add extra words or characters before and after"
        response = self.model.generate_content(prompt)
        print(response.text)
        return response.text
        


# Example usage:
# if __name__ == "__main__":
#     analyzer = sustainability()

#     product_description = """{'product_name': 'Oreo', 'product_description': 'Refined Wheat Flour (Maida), Sugar, Fractionated Fat, Palmolein, Invert Sugar, Cocca Solids (2%), Leavening Agents (500(i), 503(ii)), Starch, lodised Salt, Emulsifier (322), Nature Identical Flavouring Substances. *T&C apply Allergen Information: Contains Wheat, Sulphite, Soy. May Contain Milk and Barley. er day', 'categories': ['en:snacks', 'en:sweet-snacks', 'en:biscuits-and-cakes', 'en:biscuits', 'en:filled-biscuits', 'en:biscuit-cookie-snack-w-chocolate-filling'], 'brands': ['cadbury'], 'allergens': ['en:gluten', 'en:soybeans', 'en:sulphur-dioxide-and-sulphites'], 'ingredients': ['Refined Wheat Flour', 'Sugar', 'Fractionated Fat', 'Palmolein', 'Invert Sugar', 'Cocca Solids', 'Leavening Agents', 'Starch', 'lodised Salt', 'Emulsifier', 'Nature Identical Flavouring Substances', 'er day', 'Maida', '500', '503', '322', 'i', 'ii'], 'eco_grade': 'e', 'carbon_footprint': 5.848293084, 'carbon_footprint_description': "The carbon footprint is calculated based on the product's ingredients and packaging.", 'sustainability_score': 27, 'country_of_origin': ['en:india'], 'product_quantity': 43.75, 'product_quantity_unit': 'g'}"""
#     analyzer.get_sustainability_comment(product_description)

#     analyzer.get_ingredients_score(product_description)
#     analyzer.alternate_products(product_description)