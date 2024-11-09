import requests


class scrapeAlternateProducts:

    @staticmethod
    def googleSearchApi(name):
        api_key = 'AIzaSyB1eXEgt0IttgOkLTGVcZfeofHcZdFubdY'
        cx = '76b22b7f523164c50'
        
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
            return results.get('items', [])[0]
        else:
            print(f"Error: {response.status_code}")
            return None


result=scrapeAlternateProducts.googleSearchApi("Ethique - 'The Warrior' Solid Face Wash")
print(result)