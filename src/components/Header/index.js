import React from 'react';
import styles from './Header.module.scss';

const Header = ({ onLogin, children }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>taptap</div>
        <button onClick={onLogin}>Login</button>
      </div>
      <div className={styles.children}>
        { children }
      </div>
    </>
  );
};

export default Header;
