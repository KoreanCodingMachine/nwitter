import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Profile from 'routes/Profile';
import Navigation from 'components/Navigation';
import Antd from 'routes/Antd';

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path='/' element={<Home userObj={userObj} />}></Route>
            <Route
              path='/profile'
              element={<Profile userObj={userObj} refreshUser={refreshUser} />}
            ></Route>
          </>
        ) : (
          <>
            <Route path='/auth' element={<Auth />}></Route>
            <Route path='/antd' element={<Antd />}></Route>
          </>
        )}
      </Routes>
    </Router>
  );
};
export default AppRouter;
