import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
    const userId = sessionStorage.getItem('userid')
      const result = await axios.get('http://127.0.0.1:5000/quiz');
      const quizzesWithScores = await Promise.all(result.data.map(async (quiz) => {
        const scoreResult = await axios.get(`http://127.0.0.1:5000/userDetails?userid=${userId}&quizid=${quiz.id}`);
        return { ...quiz, score: scoreResult.data.quiz_score.score };
      }));
      setQuizzes(quizzesWithScores);
    };

    fetchQuizzes();
  }, []);

  const handleClick = (quizId) => {
    navigate(`/test?quizId=${quizId}`);
  };

  return (
    <>
    <h1>Quiz</h1>
    <div style={{display: 'flex', flexDirection:'column', gap: '.7rem'}}>
      {quizzes.map(quiz => (
        <div key={quiz.id} style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', gap: '2rem'}} onClick={() => handleClick(quiz.id)}>
            <div style={{backgroundColor: 'rgb(18, 109, 255, 1)', display: 'flex', justifyContent: 'space-between', width: '100%', gap: '1rem', color: 'white', borderRadius: '.4rem'}}>
                <div style={{padding: '.5rem 1rem'}}>
                    <h2>{quiz.name}</h2>
                    <p>{quiz.description}</p>
                </div>

                <div style={{padding: '.5rem 1rem'}}>
                    <h2 style={{textAlign: 'center'}}>Score</h2>
                    <p style={{textAlign: 'center'}}>{quiz.score}</p>
                </div>
            </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default QuizList;