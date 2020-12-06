import React, { useState } from 'react';
import styles from './NewBoardForm.module.scss';

const NewBoardForm = ({ user, routePage, createBoard }) => {
  const [boardInfo, setBoardInfo] = useState({
    owner: user._id,
    name: '',
    isPublic: true,
  });

  const handleInputsChange = ({ target }) => {
    const { name, value } = target;

    setBoardInfo({
      ...boardInfo,
      [name]: value,
    });
  };

  const handleConfirmButton = (event) => {
    event.preventDefault();
    createBoard(boardInfo);
  };

  const handleCancelButton = (event) => {
    event.preventDefault();
    routePage('/');
  };

  return (
    <form className={styles.container}>
      <label htmlFor='name'>
        Project name
        <input
          type='text'
          id='name'
          name='name'
          placeholder='Write project name'
          value={boardInfo.name}
          onChange={handleInputsChange}
        />
      </label>
      <label htmlFor='isPublic'>
        Project authorization
        <select name='isPublic' id='isPublic' onChange={handleInputsChange}>
          <option>--Select--</option>
          <option value={true}>Public</option>
          <option value={false}>Private</option>
        </select>
      </label>
      <div className={styles.buttonContainer}>
        <button onClick={handleConfirmButton}>Confirm</button>
        <button onClick={handleCancelButton}>Cancel</button>
      </div>
    </form>
  );
};

export default NewBoardForm;
