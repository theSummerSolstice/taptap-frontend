import React, { useState } from 'react';
import styles from './NewBoardForm.module.scss';

const NewBoardForm = ({ user, routePage, createNewBoard }) => {
  const [boardInfo, setBoardInfo] = useState({
    owner: user._id,
    name: '',
    isPublic: true,
  });
  const [validationMessage, setValidationMessage] = useState(null);

  const handleInputsChange = ({ target }) => {
    setValidationMessage(null);
    const { name, value } = target;

    setBoardInfo({
      ...boardInfo,
      [name]: value,
    });
  };

  const handleConfirmButton = (event) => {
    event.preventDefault();

    if (!boardInfo.name) {
      setValidationMessage('should enter a board name');
      return;
    }
    createNewBoard(boardInfo);
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
        <p>{validationMessage}</p>
      </label>
      <label htmlFor='isPublic'>
        Project authorization
        <select name='isPublic' id='isPublic' onChange={handleInputsChange}>
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
