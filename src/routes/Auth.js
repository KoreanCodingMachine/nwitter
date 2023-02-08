import React, { useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const auth = getAuth();

  // onChangeHandler
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

  // onSubmitHandler
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;

    let provider;
    try {
      if (name === 'google') {
        provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
      } else if (name === 'github') {
        provider = new GithubAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const credential = GithubAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
      }
    } catch (error) {
      setError(error.message);
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
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? 'sign in' : 'create account'}
      </span>
      <div>
        <button name='google' type='button' onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name='github' type='button' onClick={onSocialClick}>
          Continue with GitHub
        </button>
      </div>
    </div>
  );
};

export default Auth;
