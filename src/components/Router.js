import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <Route path='/home' element={<Home />}></Route>
        ) : (
          <Route path='/auth' element={<Auth />}></Route>
        )}
      </Routes>
    </Router>
  );
};
export default AppRouter;
