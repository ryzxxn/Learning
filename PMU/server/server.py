from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Hello, World!"

@app.route('/quiz')
def quiz():
    cnx = mysql.connector.connect(user='root', password='',host='localhost', database='pmu')
    # Create a cursor object
    cursor = cnx.cursor()

    # Execute a query to retrieve the quizzes
    query = "SELECT id, name, description FROM quizzes"
    cursor.execute(query)

    # Fetch all the rows
    rows = cursor.fetchall()

    # Close the cursor and connection
    cursor.close()
    cnx.close()

    # Convert the rows to a list of dictionaries
    quizzes = []
    for row in rows:
        quiz = {'id': row[0], 'name': row[1], 'description': row[2]}
        quizzes.append(quiz)

    # Return the quizzes as JSON
    return jsonify(quizzes)

@app.route('/test/<string:quiz_id>')
def test(quiz_id):
    cnx = mysql.connector.connect(user='root', password='',host='localhost', database='pmu')
    # Create a cursor object
    cursor = cnx.cursor()

    # Execute a query to retrieve the questions and options for the specified quiz
    query = """
        SELECT q.id, q.question_text, o.option_text, o.is_correct, q.explanation
        FROM questions q
        JOIN options o ON q.id = o.question_id
        WHERE q.quiz_id = %s
    """
    cursor.execute(query, (quiz_id,))

    # Fetch all the rows
    rows = cursor.fetchall()

    # Close the cursor and connection
    cursor.close()
    cnx.close()

    # Convert the rows to a list of dictionaries
    questions = []
    for row in rows:
        question = {
            'id': row[0],
            'question_text': row[1],
            'options': [{'option_text': row[2], 'is_correct': row[3]}],
            'explanation': row[4]
        }
        # If the question already exists in the list, add the option to it
        if any(q['question_text'] == question['question_text'] for q in questions):
            q = next(q for q in questions if q['question_text'] == question['question_text'])
            q['options'].append(question['options'][0])
        else:
            questions.append(question)

    # Return the questions as JSON
    return jsonify(questions)

@app.route('/userDetails')
def user_details():
    cnx = mysql.connector.connect(user='root', password='',host='localhost', database='pmu')
    # Get the user's ID and quiz ID from the query parameters
    user_id = request.args.get('userid')
    quiz_id = request.args.get('quizid')

    # Create a cursor object to execute SQL queries
    cursor = cnx.cursor()

    # Execute a SQL query to fetch the user's score for the specified quiz
    query = """
        SELECT quizzes.name, user_quiz_scores.score
        FROM users
        INNER JOIN user_quiz_scores ON users.id = user_quiz_scores.user_id
        INNER JOIN quizzes ON user_quiz_scores.quiz_id = quizzes.id
        WHERE users.id = %s AND quizzes.id = %s
    """
    cursor.execute(query, (user_id, quiz_id))

    # Fetch the row from the query result
    row = cursor.fetchone()

    # Close the cursor object
    cursor.close()

    # Convert the query result to a dictionary
    quiz_score = {
        'quiz_name': row[0],
        'score': row[1]
    }

    # Return the quiz score as a JSON response
    return {'quiz_score': quiz_score}


@app.route('/updateScore', methods=['PUT'])
def update_score():
    cnx = mysql.connector.connect(user='root', password='',host='localhost', database='pmu')
    # Get the user's ID, quiz ID, and new score from the request body
    user_id = request.json.get('userid')
    quiz_id = request.json.get('quizid')
    new_score = request.json.get('score')

    # Create a cursor object to execute SQL queries
    cursor = cnx.cursor()

    # Execute a SQL query to update the user's score for the specified quiz
    query = """
        UPDATE user_quiz_scores
        SET score = %s
        WHERE user_id = %s AND quiz_id = %s
    """
    cursor.execute(query, (new_score, user_id, quiz_id))

    # Commit the changes to the database
    cnx.commit()

    # Close the cursor object
    cursor.close()

    # Return a success message as a JSON response
    return {'message': 'Score updated successfully'}

@app.route('/login', methods=['POST'])
def login():
    cnx = mysql.connector.connect(user='root', password='',host='localhost', database='pmu')
    # Get the email and password from the request body
    email = request.json.get('email')
    password = request.json.get('password')

    # Create a cursor object to execute SQL queries
    cursor = cnx.cursor()

    # Execute a SQL query to fetch the user ID for the specified email and password
    query = """
        SELECT id
        FROM users
        WHERE email = %s AND password = %s
    """
    cursor.execute(query, (email, password))

    # Fetch the row from the query result
    row = cursor.fetchone()

    # Close the cursor object
    cursor.close()

    # If the query did not return any results, return an error message
    if row is None:
        return {'error': 'Invalid email or password'}, 401

    # Convert the query result to a dictionary
    user = {
        'id': row[0]
    }

    # Return the user ID as a JSON response
    return {'user': user}

if __name__ == '__main__':
    app.run(debug=True)
