import React, { useState } from 'react';
import styles from './NewBoardForm.module.scss';
import Button from '../Button';

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
      <div className={styles.wrapper}>
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
          <p className={styles.validationMessage}>{validationMessage}</p>
        </label>
        <label htmlFor='isPublic'>
          Project authorization
          <select name='isPublic' id='isPublic' onChange={handleInputsChange}>
            <option value={true}>Public</option>
            <option value={false}>Private</option>
          </select>
        </label>
        <div className={styles.buttonContainer}>
          <Button className='defaultButton' onClick={handleConfirmButton} text='Confirm' />
          <Button className='defaultButton' onClick={handleCancelButton} text='Cancel' />
        </div>
      </div>
    </form>
  );
};

export default NewBoardForm;
