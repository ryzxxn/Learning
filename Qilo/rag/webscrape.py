import os
import requests
from bs4 import BeautifulSoup
import json

def scrape_wikipedia(topic):
    # Format the Wikipedia URL
    url = f"https://en.wikipedia.org/wiki/{topic}"

    # Send an HTTP request to the URL
    response = requests.get(url)

    # Check if the request was successful
    if response.status_code == 200:
        # Parse the HTML content of the page
        soup = BeautifulSoup(response.content, 'html.parser')

        # Find the main content of the page
        content = soup.find(id="mw-content-text")

        # Extract the text of the main content
        text = content.get_text()

        return text
    else:
        print("Failed to retrieve Wikipedia page.")
        return None

def chunk_text(text, chunk_size=300):
    chunks = []
    for i in range(0, len(text), chunk_size):
        chunk = text[i:i+chunk_size]
        chunks.append(chunk)
    return chunks

def process_chunks(chunks):
    context = []
    for chunk in chunks:  # Iterate through only the first 3 chunks for testing
        # Make a POST request with the chunk
        response = requests.post("http://localhost:11434/api/generate", json={
            "model": "mistral",
            "stream": False,
            "prompt": chunk
        })
        if response.status_code == 200:
            # Extract context from response
            response_data = json.loads(response.text)
            print(response_data["context"]) 
            context = context + response_data["context"]
            # Extend the context array
        else:
            print("Failed to get response for chunk:", chunk)
    return context

# Call the function to scrape the Wikipedia page for "Luke Skywalker"
luke_skywalker_text = scrape_wikipedia("Luke_Skywalker")

# Chunk the text into 300-character chunks
luke_skywalker_chunks = chunk_text(luke_skywalker_text)

# Process only the first 3 chunks and extract context
context = process_chunks(luke_skywalker_chunks)

# Define the absolute path for the JSON file in the root folder
root_path = os.path.abspath(os.sep)
json_file_path = os.path.join(root_path, "context.json")

# If the file exists, load its content
if os.path.exists(json_file_path):
    with open(json_file_path, "r") as json_file:
        existing_data = json.load(json_file)
else:
    existing_data = {"context": []}

# Append the new context to the existing data
existing_data["context"].extend(context)

# Write the updated context array to the JSON file
with open(json_file_path, "w") as json_file:
    json.dump(existing_data, json_file)

print("Context written to 'context.json' file in the root folder.")
