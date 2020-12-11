import React from 'react';
import styles from './ModalUser.module.scss';

const ModalUser = ({ username, onLogout, navigatePage }) => {
  return (
    <div className={styles.container}>
      <div className={styles.welcomeMessage}>
        <p>Hello, {username}🌝
        If you want to log out, click there↘️</p>
        <button onClick={onLogout}>Logout</button>
      </div>
      <div className={styles.nav}>
        <button className={styles.navButton} value='/my-taptap' onClick={navigatePage}>
          <span>My taptap</span>
          <span>▶️</span>
        </button>
        <button className={styles.navButton} value='/invited-taptap' onClick={navigatePage}>
          <span>Invited taptap</span>
          <span>▶️</span>
        </button>
      </div>
    </div>
  );
};

export default ModalUser;
