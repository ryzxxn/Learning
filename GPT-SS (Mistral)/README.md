# PDF processing with Mistral LLM on local CPU

<!-- **Youtube**: <a href="https://www.youtube.com/watch?v=9RERupqcFL4" target="_blank">Invoice Data Processing with Mistral LLM on Local CPU</a> -->

## Quickstart

1. Download the Mistral model, check models/model_download.txt for the download link.
2. Install the requirements: 

`pip install -r requirements.txt`

3. Copy text PDF files to the `data` folder.
4. Run the script, to convert text to vector embeddings and save in FAISS index: 

`python ingest.py`

5. Run the script, to process data with Mistral LLL and return the answer: 

`python main.py "retrieve invoice number value"`

## API implementation:

I added a api implementation to make it easy to query the model 

run `python app.py`

Endpoint: `http://localhost:3000/ask`
Method: `POST`
Payload: `{"question": "What is the invoice number"}`

this can be added to your webapp integration to make your own UI
GoodLuck.