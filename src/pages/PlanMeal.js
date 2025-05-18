import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import axios from 'axios';

const PlanMeal = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealPlan = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();

      const diet = userData.diet || "";
      const intolerances = (userData.intolerances || []).join(',');

      const apiKey = "YOUR_SPOONACULAR_API_KEY";
      const url = `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&diet=${diet}&intolerances=${intolerances}&apiKey=${apiKey}`;

      try {
        const response = await axios.get(url);
        setMeals(response.data.meals);
      } catch (err) {
        console.error("Error fetching meals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMealPlan();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🥗 Your Personalized Meal Plan</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        meals.map(meal => (
          <div key={meal.id} className="border p-4 rounded mb-4 bg-white shadow">
            <h2 className="text-xl font-semibold">{meal.title}</h2>
            <a
              href={`https://spoonacular.com/recipes/${meal.title
                .toLowerCase()
                .replace(/ /g, "-")}-${meal.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Recipe
            </a>
          </div>
        ))
      )}
    </div>
  );
};

export default PlanMeal;
