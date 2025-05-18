import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Survey = () => {
  const [diet, setDiet] = useState('');
  const [intolerances, setIntolerances] = useState([]);
  const navigate = useNavigate();

  const handleSurveySubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) return;

    try {
      await setDoc(doc(db, 'users', user.uid), {
        diet,
        intolerances,
        surveyCompleted: true,
      }, { merge: true });

      navigate('/dashboard');
    } catch (err) {
      console.error("Error saving survey:", err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Please list your dietary restrictions.</h1>
      <form onSubmit={handleSurveySubmit}>
        {/* Diet Selection */}
        <label className="block mb-2">Select your diet:</label>
        <select
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="">None</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="ketogenic">Ketogenic</option>
          <option value="ketogenic">Low-Carb</option>
          <option value="ketogenic">Fasting</option>
        </select>

        {/* Intolerances (Checkboxes) */}
        <label className="block mb-2">Select any intolerances:</label>
        {['gluten', 'dairy', 'nuts', 'eggs', 'fish', 'alcohol', 'sugar'].map((item) => (
          <div key={item}>
            <label>
              <input
                type="checkbox"
                value={item}
                checked={intolerances.includes(item)}
                onChange={(e) => {
                  const updated = e.target.checked
                    ? [...intolerances, item]
                    : intolerances.filter(i => i !== item);
                  setIntolerances(updated);
                }}
              />
              {` ${item}`}
            </label>
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save Preferences
        </button>
      </form>
    </div>
  );
};

export default Survey;
