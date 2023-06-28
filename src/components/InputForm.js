import React, { useState } from 'react';
import axios from 'axios';

const InputForm = () => {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState(null);
  const apiKey = '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'; // Replace with your actual API key
  const apiUrl = 'https://api.openai.com/v1/completions'; // Replace with your API URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestData = {
        prompt: inputText,
        model: "text-davinci-003",
      };

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      };

      const response = await axios.post(apiUrl, requestData, { headers });
      setResponse(response.data);
      console.log(JSON.stringify(response, null, 2))
    } catch (error) {
      console.error(error);
    }
  };

  let text = null;
  if (response && response.choices && response.choices.length > 0) {
    text = response.choices[0].text;
  }

  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your text"
        />
        <button type="submit">Submit</button>
      </form>

      {response && (
        <div>
          <h2>Response:</h2>
          <h1>{text}</h1>
        </div>
      )}
    </div>
  );
};

export default InputForm;
