import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Test() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const quizId = searchParams.get('quizId');
  const userId = sessionStorage.getItem('userid');

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [previousScore, setPreviousScore] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const result = await axios.get(`http://127.0.0.1:5000/test/${quizId}`);
      const shuffledQuestions = result.data.map(question => ({
        ...question,
        options: shuffleArray(question.options)
      }));
      setQuestions(shuffleArray(shuffledQuestions));
    };

    const fetchPreviousScore = async () => {
      const result = await axios.get(`http://127.0.0.1:5000/userDetails?userid=${userId}&quizid=${quizId}`);
      setPreviousScore(result.data.quiz_score.score);
    };

    fetchQuestions();
    fetchPreviousScore();
  }, [quizId, userId]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
    if (option.is_correct) {
      setScore(score + 1);
    }
  };

  const handleSkipQuestion = () => {
    setSelectedAnswer(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleNextQuestion = async () => {
    setSelectedAnswer(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    if (currentQuestionIndex === questions.length - 1 && score > previousScore) {
      axios.put('http://127.0.0.1:5000/updateScore', {
        userid: userId,
        quizid: quizId,
        score: score // use the score state variable instead of newScore
      });
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div style={{ display: 'flex', flexDirection: 'column'}}>
      {currentQuestion && (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <div key={currentQuestion.id} style={{display: 'flex',flexDirection: 'column', gap: '1rem'}}>
            <h2 style={{border: '3px solid rgb(18, 109, 255, 1)', borderRadius: '.5rem', padding: '1rem', verticalAlign: 'center'}}>{currentQuestion.question_text}</h2>
            <div style={{ display: 'flex',flexDirection: 'column', gap: '.6rem'}}>
                {currentQuestion.options.map(option => (
                <div
                    key={option.id}
                    onClick={() => handleAnswerSelect(option)}
                    style={{
                    borderLeft: selectedAnswer && option.id === selectedAnswer.id ? (option.is_correct ? '.3rem solid green' : '.3rem solid red') : 'white',
                    padding: '.5rem',
                    boxShadow: '0px 0px .4rem rgb(200,200,200, 1)',
                    cursor: 'pointer'
                    }}
                >
                    {option.option_text}
                </div>
                ))}
            </div>

            {selectedAnswer && (
                <div>
                <p>{selectedAnswer.is_correct ? 'Correct!' : 'Incorrect.'}</p>
                <p>{currentQuestion.explanation}</p>
                </div>
            )}
          </div>

            <div style={{ display: 'flex', justifyContent: 'end', gap: '1rem', alignItems: 'center', margin: '.7rem 0rem'}}>
                <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
                {!selectedAnswer && (
                    <button onClick={handleSkipQuestion} style={{backgroundColor: 'rgb(18, 109, 255, 1)', color: 'white', width: 'max-content', padding: '.5rem 1rem', borderRadius: '.4rem', border: 'none', cursor: 'pointer'}}>Skip</button>
                )}

                {selectedAnswer && (
                    <button onClick={handleNextQuestion} style={{backgroundColor: 'rgb(18, 109, 255, 1)', color: 'white', width: 'max-content', padding: '.5rem 1rem', borderRadius: '.4rem', border: 'none', cursor: 'pointer'}}>Next</button>
                )}
            </div>
        </div>
      )}
      {currentQuestionIndex === questions.length && <p>You answered {score} out of {questions.length} questions correctly.</p>}
    </div>
  );
}