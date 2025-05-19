// src/pages/UploadImage.js
import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = ({ onIngredientsDetected }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleUpload = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.clarifai.com/v2/models/food-item-v1.0/outputs',
        {
          inputs: [
            {
              data: {
                image: {
                  base64: image.split(',')[1],
                },
              },
            },
          ],
        },
        {
          headers: {
            Authorization: `Key ${process.env.REACT_APP_CLARIFAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const concepts = response.data.outputs[0].data.concepts;
      setResults(concepts);
      onIngredientsDetected(concepts.map(c => c.name));
    } catch (err) {
      console.error('Clarifai error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!image || loading}>
        {loading ? 'Classifying...' : 'Classify Image'}
      </button>
      {results.length > 0 && (
        <ul>
          {results.map((item) => (
            <li key={item.id}>{item.name} ({(item.value * 100).toFixed(2)}%)</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UploadImage;
