import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: "text-davinci-003", // GPT-3 modeli
          prompt: inputText,
          max_tokens: 100,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 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    `, // API kalitingizni shu yerga qo'ying
          },
        }
      );

      setResponseText(response.data.choices[0].text.trim());
    } catch (error) {
      console.error('Xatolik yuz berdi:', error);
      setResponseText('Xatolik yuz berdi, iltimos keyinroq urinib ko\'ring.');
    }
  };

  return (
    <div className="App">
      <h1>OpenAI API bilan React Ilovasi</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Matn kiriting..."
          rows={5}
          cols={50}
        />
        <br />
        <button type="submit">Yuborish</button>
      </form>

      {responseText && (
        <div>
          <h2>Javob:</h2>
          <p>{responseText}</p>
        </div>
      )}
    </div>
  );
}

export default App;
