import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const CheckDish = () => {
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [intolerances, setIntolerances] = useState([]);

  useEffect(() => {
    const fetchUserIntolerances = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        setIntolerances(data.intolerances || []);
      }
    };

    fetchUserIntolerances();
  }, []);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setIngredients([]);
      setAlerts([]);
    }
  };

  const handleCheck = async () => {
  if (!image) return;

  setLoading(true);

  try {
    const base64Image = await getBase64(image);

    const response = await fetch('http://localhost:3001/clarifai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ base64Image }),
    });

    const data = await response.json();

    const detectedIngredients = data.labels.map((item) => item.name.toLowerCase());

    setIngredients(detectedIngredients);

    const matchedAllergens = intolerances.filter((allergen) =>
      detectedIngredients.includes(allergen.toLowerCase())
    );

    setAlerts(matchedAllergens);
  } catch (error) {
    console.error('Error checking dish:', error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upload a photo of your dish and check for ingredients</h1>

      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />

      <button
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        onClick={handleCheck}
        disabled={loading}
      >
        {loading ? 'Checking...' : 'Check Ingredients'}
      </button>

      {ingredients.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Detected Ingredients:</h2>
          <ul className="list-disc list-inside text-gray-800">
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {alerts.length > 0 ? (
        <div className="bg-red-100 text-red-700 p-4 rounded mt-4">
          <strong>⚠ Allergens detected:</strong>
          <ul className="list-disc list-inside mt-2">
            {alerts.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ) : (
        ingredients.length > 0 && (
          <p className="text-green-700 mt-4">No known allergens found based on your profile.</p>
        )
      )}
    </div>
  );
};

export default CheckDish;
