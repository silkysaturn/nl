import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Login.css'
import './button.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
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
  } catch (error) {
    console.error('Login error:', error);
    alert('Login failed. Please check your email and password.');
  }
};


  
  return (
    <div>
      <h1 className="login-title">Welcome to NutriLINE</h1>

    <div className='auth-form'>
      <h3>Log In</h3>
      <input className="login-form" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br/>
      <input className='login-form' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <br/>
      <button className='button' onClick={handleLogin}>
        Log In
      </button>

      <p className="mt-4 text-center">
      Don’t have an account? <a href="/signup" className="text-blue-500 underline">Sign Up</a>
      </p>
    </div>
      
    </div>
  );
};

export default Login;
