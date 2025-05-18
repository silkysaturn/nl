import React, { useState } from 'react';

const CheckDish = () => {
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  const knownAllergens = ['peanuts', 'gluten', 'dairy'];

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
    const formData = new FormData();
    formData.append('dish', image);

    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      const detectedIngredients = data.ingredients || [];

      setIngredients(detectedIngredients);

      const found = knownAllergens.filter((allergen) =>
        detectedIngredients.map(i => i.toLowerCase()).includes(allergen)
      );
      setAlerts(found);
    } catch (error) {
      console.error('Error checking dish:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🥘 Check a Dish</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

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
          <strong>⚠️ Allergens detected:</strong>
          <ul className="list-disc list-inside mt-2">
            {alerts.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ) : (
        ingredients.length > 0 && (
          <p className="text-green-700 mt-4">✅ No known allergens found.</p>
        )
      )}
    </div>
  );
};

export default CheckDish;
