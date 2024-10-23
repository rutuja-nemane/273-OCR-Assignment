import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/extract-text', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setText(response.data.extracted_text);
    } catch (error) {
      console.error("Error uploading the image: ", error);
    }
  };

  return (
    <div className="App">
      <h1>OCR Text Extraction</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Extract Text</button>
      </form>
      <h2>Extracted Text:</h2>
      <p>{text}</p>
    </div>
  );
}

export default App;

