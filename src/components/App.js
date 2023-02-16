import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from 'MyBase';
import { ref } from '@firebase/storage';

function App() {
  // firebase 초기화
  const [init, setInit] = useState(false);

  // 로그인 상태 유지
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 유저 정보
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
        const uid = user.uid;
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = auth.currentUser;
    // 객체에 담긴 정보가 많기 때문에 리액트에게 재런더링할 객체를 명확하게 명시해줘야함
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          userObj={userObj}
          isLoggedIn={isLoggedIn}
        />
      ) : (
        'initializing....'
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
