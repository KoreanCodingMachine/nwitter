import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from 'MyBase';

function App() {
  // firebase 초기화
  const [init, setInit] = useState(false);

  // 로그인 상태 유지
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        const uid = user.uid;
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'initializing....'}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
