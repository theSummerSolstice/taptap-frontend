import React from 'react';
import styles from './Header.module.scss';

const Header = ({ user, onLogin, routePage, children }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => routePage('/boards')}>taptap</div>
        {
          !user
            ? <button onClick={onLogin}>Login</button>
            : <div className={styles.buttonContainer}>
                <button onClick={() => routePage('/board/new')}>New taptap</button>
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
