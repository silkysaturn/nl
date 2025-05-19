import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        setUserData(userSnap.data());
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="profile">

      <div className="profile-header">

        <img src='/images/profile-user.png' />
        <h1>Your Profile</h1>

      </div>
        
      <h2>Your Profile</h2>
      {userData ? (
        <ul>
          <li><strong>Email:</strong> {userData.email}</li>
          <li><strong>Survey Completed:</strong> {userData.surveyCompleted ? 'Yes' : 'No'}</li>
          <li><strong>Diet Preference:</strong> {userData.dietPreference || 'Not set'}</li>
          <li><strong>Allergies:</strong> {userData.allergies || 'None'}</li>
          <li><strong>Goals:</strong> {userData.goals || 'Not set'}</li>
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
