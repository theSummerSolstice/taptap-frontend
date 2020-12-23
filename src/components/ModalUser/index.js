import React from 'react';
import Button from '../Button';
import PropTypes from 'prop-types';
import styles from './ModalUser.module.scss';

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

ModalUser.propTypes = {
  username: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
  navigatePage: PropTypes.func.isRequired,
};

export default ModalUser;
