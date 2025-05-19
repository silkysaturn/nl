import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const PlanMeal = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation(); // capture query string

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        if (!process.env.REACT_APP_SPOONACULAR_API_KEY) {
          throw new Error('Spoonacular API key is not configured');
        }

        const user = auth.currentUser;
        if (!user) {
          setError('User not logged in.');
          setLoading(false);
          return;
        }

        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();

        const diet = userData?.diet || '';
        const intolerances = userData?.intolerances?.join(',') || '';

        const res = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
          params: {
            number: 1,
            diet,
            intolerances,
            addRecipeInformation: true,
            apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
          },
        });

        if (res.data.results.length === 0) {
          setError('No recipe found matching your preferences.');
        } else {
          setRecipe(res.data.results[0]);
        }
      } catch (err) {
        console.error('Failed to fetch recipe:', err);
        let errorMessage = 'Failed to load recipe. ';

        if (axios.isAxiosError(err)) {
          if (err.response) {
            errorMessage += `Server error: ${err.response.status} - ${err.response.data?.message || err.message}`;
          } else if (err.request) {
            errorMessage += 'No response from server. Please check your internet connection.';
          } else {
            errorMessage += err.message;
          }
        } else {
          errorMessage += err.message;
        }

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchMealPlan();
  }, [location.search]); // <- refetch when query param changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} style={{ width: '300px' }} />
      <p dangerouslySetInnerHTML={{ __html: recipe.summary }} />
    </div>
  );
};

export default PlanMeal;
