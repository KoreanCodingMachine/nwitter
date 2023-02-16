import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { dbService } from './../MyBase';
import { updateProfile } from '@firebase/auth';

const Profile = ({ userObj, refreshUser }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    signOut(auth);
    navigate('/', { replace: true });
  };

  const getMyNweets = async () => {
    const q = query(
      collection(dbService, 'nweets'),
      where('userId', '==', userObj.uid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  };

  // get Nweets
  useEffect(() => {
    getMyNweets();
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(auth.currentUser, { displayName: newDisplayName });
      refreshUser();
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type='text'
          placeholder='Display name'
          value={newDisplayName}
        />
        <input type='submit' value='update Profile' />
      </form>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};
export default Profile;
