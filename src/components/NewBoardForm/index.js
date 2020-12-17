import React, { useState } from 'react';
import Button from '../Button';
import styles from './NewBoardForm.module.scss';
import ROUTE from '../../constants/route';

const NewBoardForm = ({ user, routePage, createBoard }) => {
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
      [name]: name === 'isPublic'
        ? value === 'true'
        : value,
    });
  };

  const handleConfirmButtonClick = (event) => {
    event.preventDefault();

    if (!boardInfo.name) {
      setValidationMessage('should enter a board name');
      return;
    }

    createBoard(boardInfo);
  };

  const handleCancelButtonClick = (event) => {
    event.preventDefault();
    routePage(ROUTE.MAIN);
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
          <p className={styles.validationMessage}>
            {validationMessage}
          </p>
        </label>
        <label htmlFor='isPublic'>
          Project authorization
          <select name='isPublic' id='isPublic' onChange={handleInputsChange}>
            <option value={true}>Public</option>
            <option value={false}>Private</option>
          </select>
        </label>
        <div className={styles.buttonContainer}>
          <Button className='defaultButton' onClick={handleConfirmButtonClick} text='Confirm' />
          <Button className='defaultButton' onClick={handleCancelButtonClick} text='Cancel' />
        </div>
      </div>
    </form>
  );
};

export default NewBoardForm;
