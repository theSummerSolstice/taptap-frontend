import React, { useState } from 'react';
import styles from './InviteForm.module.scss';
import { useParams } from 'react-router-dom';
import { validateEmail } from '../../utils/validation';
import Button from '../Button';

const InviteForm = ({ user, updateBoard, routePage, sendInviteMail }) => {
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
    updateBoard({
      data: emailList,
      boardId: board_id,
      updatedItem: 'authorizedUsers',
    });
    routePage(`/board/${board_id}`);
  };

  const handleSkipButton = () => {
    routePage(`/board/${board_id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h4>Invite (up to 3 people)</h4>
        <div className={styles.emailInput}>
          <input
            type='text'
            name='email'
            value={email}
            placeholder='Enter email'
            onChange={handleEmailChange}
          />
          <Button className='defaultButton' onClick={handleSendInviteButton} text='Invite' />
        </div>
        <p className={styles.validationMessage}>{validationMessage}</p>
        <div className={styles.emailContainer}>
          <div className={styles.email}>
            <span>{user.email}</span>
            <span className={styles.adminLabel}>Admin</span>
          </div>
          {
            emailList.map((item, index) => (
              <div className={styles.email} key={index}>
                <span>{item}</span>
                <Button id={index} className='moreButton' onClick={handleDeleteButton} text='Delete' />
              </div>
            ))
          }
        </div>
        <div className={styles.buttonContainer}>
          <Button className='defaultButton' onClick={handleConfirmButton} text='Confirm' />
          <Button className='defaultButton' onClick={handleSkipButton} text='Skip' />
        </div>
      </div>
    </div>
  );
};

export default InviteForm;
