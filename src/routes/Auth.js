import React, { useState } from 'react';
import Profile from './Profile';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(false);

  //      firebase 연동
  const auth = getAuth();
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     const user = userCredential.user;
    //     console.log(userCredential);
    //     console.log('user', user);
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorCode);
    //     console.log(errorMessage);
    //     // ..
    //   });

    if (newAccount) {
      // create account
    } else {
      // login
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name='email'
          type='text'
          placeholder='Email'
          required
          value={email}
          onChange={onChange}
        ></input>
        <input
          name='password'
          type='password'
          placeholder='Password'
          required
          value={password}
          onChange={onChange}
        ></input>
        <input
          type='submit'
          value={newAccount ? 'Create Account' : 'Log In'}
        ></input>
      </form>
      <div>
        <button type='button'>Continue with Google</button>
        <button type='button'>Continue with GitHub</button>
      </div>
    </div>
  );
};

export default Auth;
