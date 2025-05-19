import { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, 'users', user.uid), {
      email,
      surveyCompleted: false,
      allergies: [],
      dietType: '',
    });

    navigate('/survey');
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Sign Up</h1>
      <input className="block my-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="block my-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSignup}>
        Sign Up
      </button>
    </div>
  );
};

export default Signup;
