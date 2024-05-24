import os
import json
import numpy as np
import requests

# Load embeddings from JSON file
def load_embeddings_from_json(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return np.array(data["context"], dtype=int)

# Main function
if __name__ == "__main__":
    # Identify the path to the JSON file in the project root directory
    root_path = os.path.abspath(os.sep)
    json_file_path = os.path.join(root_path, "context.json")

    # Load embeddings from JSON file
    embeddings = load_embeddings_from_json(json_file_path)

    # Convert embeddings to list and pass as context
    context = embeddings.tolist()

    # Prepare the request data
    request_data = {
        "model": "mistral",
        "prompt": "Who is the famous smuggler who aids the Rebel Alliance?",
        "stream": False,
        "context": context
    }

    # URL for the POST request
    url = "http://localhost:11434/api/generate"

    # Send POST request with request data
    response = requests.post(url, json=request_data)

    # Check if request was successful
    if response.status_code == 200:
        # Print response data
        print("Response data:", response.json())
    else:
        print("Failed to send POST request. Status code:", response.status_code)
