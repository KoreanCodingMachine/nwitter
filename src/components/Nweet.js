import React, { useState } from 'react';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { dbService } from 'MyBase';
import { async } from '@firebase/util';

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const NweetTextRef = doc(dbService, 'nweets', `${nweetObj.id}`);

  const onDelete = async () => {
    const ok = window.confirm('Are you sure you want to delete this nweet');
    if (ok) {
      await deleteDoc(NweetTextRef);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(NweetTextRef, {
      text: newNweet,
    });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  return (
    <>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type='text'
              placeholder='edit your nweet'
              value={newNweet}
              required
              onChange={onChange}
            ></input>
            <input type='submit' value='Update Nweet' />
          </form>
          <button onClick={toggleEditing}>취소</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDelete}>삭제</button>
              <button onClick={toggleEditing}>수정</button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Nweet;
