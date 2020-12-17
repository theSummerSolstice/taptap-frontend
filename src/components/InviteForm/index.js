import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { validateEmail } from '../../utils/validation';
import Button from '../Button';
import styles from './InviteForm.module.scss';
import ROUTE from '../../constants/route';

const InviteForm = ({
  user,
  updateBoard,
  routePage,
  sendInviteMail
}) => {
  const { board_id: boardId } = useParams();
  const [email, setEmail] = useState('');
  const [emailList, setEmailList] = useState([]);
  const [validationMessage, setValidationMessage] = useState(null);

  const handleEmailInputChange = ({ target }) => {
    setValidationMessage(null);
    setEmail(target.value);
  };

  const handleInviteButtonClick = () => {
    const { result, message } = validateEmail(emailList, email);

    if (!result) {
      setValidationMessage(message);
      return;
    }

    sendInviteMail(email, boardId);
    setEmailList([
      ...emailList,
      email,
    ]);
    setEmail('');
  };

  const handleEmailDeleteButtonClick = () => {
    const id = Number(event.target.id);
    setEmailList(emailList.filter((item, index) => index !== id));
  };

  const handleConfirmButtonClick = () => {
    updateBoard({
      boardId,
      data: { authorizedUsers: emailList },
    });
    routePage(`${ROUTE.BOARD}/${boardId}`);
  };

  const handleSkipButtonClick = () => {
    routePage(`${ROUTE.BOARD}/${boardId}`);
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
            onChange={handleEmailInputChange}
          />
          <Button
            text='Invite'
            className='defaultButton'
            onClick={handleInviteButtonClick}
          />
        </div>
        <p className={styles.validationMessage}>
          {validationMessage}
        </p>
        <div className={styles.emailContainer}>
          <div className={styles.email}>
            <span>{user.email}</span>
            <span className={styles.adminLabel}>Admin</span>
          </div>
          {
            emailList.map((item, index) => (
              <div className={styles.email} key={index}>
                <span>{item}</span>
                <Button
                  id={index}
                  text='Delete'
                  className='moreButton'
                  onClick={handleEmailDeleteButtonClick}
                />
              </div>
            ))
          }
        </div>
        <div className={styles.buttonContainer}>
          <Button
            className='defaultButton'
            onClick={handleConfirmButtonClick}
            text='Confirm'
          />
          <Button
            className='defaultButton'
            onClick={handleSkipButtonClick}
            text='Skip'
          />
        </div>
      </div>
    </div>
  );
};

export default InviteForm;
