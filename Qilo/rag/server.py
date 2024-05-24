from flask import Flask, request, jsonify
import requests
import json
import os
import numpy as np

app = Flask(__name__)

def load_embeddings_from_json(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return np.array(data["context"], dtype=int)

# Get the current working directory
current_dir = os.path.dirname(os.path.abspath(__file__))

# Load embeddings from the JSON file located in the project root
json_file_path = os.path.join(current_dir, "starwars.json")
embeddings = load_embeddings_from_json(json_file_path)

# Convert embeddings to list and pass as context
context = embeddings.tolist()
print("Initial context:")

@app.route('/rag/ask', methods=['POST'])
def rag_ask():
    global context  # Use the global context variable

    data = request.json
    
    # Extract the prompt from the request data
    prompt = data.get('prompt', '')
    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    # Define the request payload to the external service
    external_service_url = "http://localhost:11434/api/generate"
    request_payload = {
        "model": "mistral",
        "prompt": prompt,
        "stream": False,
        "context": context
    }

    try:
        # Send POST request to the external service
        response = requests.post(external_service_url, json=request_payload)

        if response.status_code == 200:
            response_data = response.json()
            new_context = response_data['context']
            print("New context received:")
            
            # Update the global context
            context.extend(new_context)
            print("Updated context:")
            
            return jsonify({"response": response_data["response"]}), 200
        else:
            return jsonify({"error": "Failed to get response from external service"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
