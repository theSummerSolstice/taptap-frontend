import React from 'react';
import styles from './Header.module.scss';

const Header = ({ user, onLogin, children }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>taptap</div>
        {
          !user
            ? <button onClick={onLogin}>Login</button>
            : <div className={styles.buttonContainer}>
                <button>New taptap</button>
                <img src={user.imageSrc} alt='user profile' />
              </div>
        }
      </div>
      <div className={styles.children}>
        { children }
      </div>
    </>
  );
};

export default Header;
