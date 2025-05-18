import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    if (!userData?.surveyCompleted) {
      navigate('/survey');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div style={{backgroundColor: "3c3f40"}}>
      <h1>Welcome to NutriLINE</h1>
      <h3 className="text-xl font-bold">Log In</h3>
      <input className="block my-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="block my-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleLogin}>
        Log In
      </button>

      <p className="mt-4 text-center">
      Don’t have an account? <a href="/signup" className="text-blue-500 underline">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
