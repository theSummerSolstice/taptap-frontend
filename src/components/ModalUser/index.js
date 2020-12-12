import React from 'react';
import styles from './ModalUser.module.scss';
import Button from '../Button';

const ModalUser = ({ username, onLogout, navigatePage }) => {
  return (
    <div className={styles.container}>
      <div className={styles.welcomeMessage}>
        <p>Hello, {username} 🌝</p>
        <p>If you want to log out, click there ↘️</p>
        <Button className='defaultButton' onClick={onLogout} text='Logout' />
      </div>
      <div className={styles.nav}>
        <Button className='modalButton' value='/my-taptap' onClick={navigatePage}>
          <span>My taptap</span>
          <span>▶️</span>
        </Button>
        <Button className='modalButton' value='/invited-taptap' onClick={navigatePage}>
          <span>Invited taptap</span>
          <span>▶️</span>
        </Button>
      </div>
    </div>
  );
};

export default ModalUser;
