import React, { useState, useEffect } from 'react';
import { dbService } from 'MyBase';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';

const Home = () => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);

  const getNweets = async () => {
    const q = query(collection(dbService, 'nweets'));
    console.log(q);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const nweetObj = {
        ...doc.data(),
        id: doc.id,
      };
      console.log(nweetObj);
      setNweets((prev) => [nweetObj, ...prev]);
    });
  };

  useEffect(() => {
    getNweets();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, 'nweets'), {
        nweet,
        createdAt: Date.now(),
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }

    setNweet('');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='whats on your mind'
          maxLength={120}
          onChange={onChange}
          value={nweet}
        />
        <input type='submit' name='Nweet' />
      </form>
      <div>
        {nweets.length === 0
          ? 'loading...'
          : nweets.map((nweet) => (
              <div key={nweet.id}>
                <h4>{nweet.nweet}</h4>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Home;
