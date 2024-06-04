# Note: Precise formatting of spacing and indentation of the prompt template is important,
# as it is highly sensitive to whitespace changes. For example, it could have problems generating
# a summary from the pieces of context if the spacing is not done correctly

qa_template = """Use the following pieces of information to generate questions on the sub topic of the data and return it in a json array.

Context: {context}
Question: {question}

Only return Quiestions relevant to the topics of the information given and nothing else.
"""
