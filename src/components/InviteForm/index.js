import React, { useState } from 'react';
import styles from './InviteForm.module.scss';
import { useParams } from 'react-router-dom';
import { validateEmail } from '../../utils/validation';

const InviteForm = ({ user, updateAuthorizedUsers, routePage, sendInviteMail }) => {
  const { board_id } = useParams();
  const [email, setEmail] = useState('');
  const [emailList, setEmailList] = useState([]);
  const [validationMessage, setValidationMessage] = useState(null);

  const handleEmailChange = ({ target }) => {
    setValidationMessage(null);
    setEmail(target.value);
  };

  const handleSendInviteButton = () => {
    const { result, message } = validateEmail(emailList, email);

    if (!result) {
      setValidationMessage(message);
      return;
    }

    sendInviteMail(email, board_id);
    setEmailList([
      ...emailList,
      email,
    ]);
    setEmail('');
  };

  const handleDeleteButton = () => {
    const id = Number(event.target.id);
    setEmailList(emailList.filter((item, index) => {
      return index !== id;
    }));
  };

  const handleConfirmButton = () => {
    updateAuthorizedUsers({
      data: emailList,
      boardId: board_id,
    });
    routePage(`/board/${board_id}`);
  };

  const handleSkipButton = () => {
    routePage(`/board/${board_id}`);
  };

  return (
    <div className={styles.container}>
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
      <p>{validationMessage}</p>
      <div className={styles.email}>
        <span>{user.email}</span>
        <span>admin</span>
      </div>
      {
        emailList.map((item, index) => (
          <div className={styles.email} key={index}>
            <span>{item}</span>
            <button id={index} onClick={handleDeleteButton}>Delete</button>
          </div>
        ))
      }
      <div className={styles.buttonContainer}>
        <button onClick={handleConfirmButton}>Confirm</button>
        <button onClick={handleSkipButton}>Skip</button>
      </div>
    </div>
  );
};

export default InviteForm;
