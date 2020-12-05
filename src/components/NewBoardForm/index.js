import React, { useState } from 'react';
import styles from './NewBoardForm.module.scss';

const NewBoardForm = ({ user, routePage, createBoard }) => {
  const [email, setEmail] = useState('');
  const [boardInfo, setBoardInfo] = useState({
    owner: user._id,
    name: '',
    isPublic: true,
    authorizedUsers: [],
  });
  const { authorizedUsers } = boardInfo;

  const handleInputsChange = ({ target }) => {
    const { name, value } = target;

    setBoardInfo({
      ...boardInfo,
      [name]: value,
    });
  };

  const handleEmailChange = ({ target }) => {
    setEmail(target.value);
  };

  const handleSendInviteButton = (event) => {
    event.preventDefault();

    if (authorizedUsers.length > 2) return;

    setBoardInfo({
      ...boardInfo,
      authorizedUsers: [ ...authorizedUsers, email ],
    });
  };

  const handleDeleteButton = (event) => {
    event.preventDefault();

    const id = Number(event.target.id);
    setBoardInfo({
      ...boardInfo,
      authorizedUsers: authorizedUsers.filter((item, index) => {
        return index !== id;
      }),
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

      <div className={styles.emailContainer}>
        <h4>Invite (up to 3 people)</h4>
        <div className={styles.emailInput}>
          <input
            type='text'
            name='email'
            value={email}
            placeholder='Enter email'
            onChange={handleEmailChange}
          />
          <button onClick={handleSendInviteButton}>Send invite</button>
        </div>
        <div className={styles.email}>
          <span>{user.email}</span>
          <span>admin</span>
        </div>
        {
          authorizedUsers.map((item, index) => (
            <div className={styles.email} key={index}>
              <span>{item}</span>
              <button id={index} onClick={handleDeleteButton}>Delete</button>
            </div>
          ))
        }
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={handleConfirmButton}>Confirm</button>
        <button onClick={handleCancelButton}>Cancel</button>
      </div>
    </form>
  );
};

export default NewBoardForm;
