import React from 'react';
import styles from './Header.module.scss';
import { useHistory } from 'react-router-dom';

const Header = ({ user, onLogin, children }) => {
  const history = useHistory();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => history.push('/main')}>taptap</div>
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
