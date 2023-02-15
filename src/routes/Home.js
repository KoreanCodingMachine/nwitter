import React, { useState, useEffect } from 'react';
import { dbService } from 'MyBase';
import {
  addDoc,
  collection,
  // getDocs,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import Nweet from 'components/Nweet';

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);

  // 오래된 방식

  // const getNweets = async () => {
  //   // db 검색
  //   const q = query(
  //     collection(dbService, 'nweets'),
  //     orderBy('createdAt', 'desc')
  //   );

  //   // docs 객체모음
  //   const querySnapshot = await getDocs(q);

  //   // 객체.forEach
  //   querySnapshot.forEach((doc) => {
  //     console.log('data', doc.data()); // data 객체 반환
  //     const nweetObj = {
  //       ...doc.data(),
  //       id: doc.id, // id는 doc.data()에 반환되지 않기때문에 최상휘 doc에서 반환
  //     };
  //     setNweets((prev) => [nweetObj, ...prev]);
  //   });
  // };

  useEffect(() => {
    const q = query(
      collection(dbService, 'nweets'),
      orderBy('createdAt', 'desc')
    );
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, 'nweets'), {
        text: nweet,
        createdAt: Date.now(),
        userId: userObj.uid,
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
              <Nweet
                nweetObj={nweet}
                key={nweet.id}
                isOwner={nweet.userId === userObj.uid}
              />
            ))}
      </div>
    </div>
  );
};

export default Home;
