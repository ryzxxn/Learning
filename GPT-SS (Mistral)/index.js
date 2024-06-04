const axios = require('axios');

const url = 'http://localhost:3000/ask';
const data = { question: 'When was the war on germany declared?' };
const headers = { 'Content-Type': 'application/json' };

axios.post(url, data, { headers })
  .then(response => {
    const correctAnswer = response.data.correct_awnser;
    const mappingOptions = response.data.options || {};
    const options = Object.entries(mappingOptions).map(([key, value]) => ({
      label: value,
      value: key,
      correct: key === correctAnswer
    }));

    console.log(`Question: ${data.question}`);
    console.log(`Correct answer: ${correctAnswer}`);
    console.log(`Options: ${JSON.stringify(options)}`);
  })
  .catch(error => {
    console.error(error);
  });
