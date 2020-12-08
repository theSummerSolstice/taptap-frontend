import React from 'react';
import styles from './Header.module.scss';

const LoginHeader = ({ onLogin }) => {
  return (
    <button onClick={onLogin}>Login</button>
  );
};

const MainHeader = ({ routePage, onLogout }) => {
  return (
    <>
      <button onClick={() => routePage('/board/new')}>New taptap</button>
      <button onClick={onLogout}>Logout</button>
    </>
  );
};

const BoardHeader = () => {
  return (
    <>
      <button>Snapshot</button>
      <button>History mode</button>
    </>
  );
};

const ShareHeader = () => {
  return (
    <>
      <button>Download</button>
      <button>Link</button>
    </>
  );
};

const Header = ({ user, board, onLogin, onLogout, routePage, handleLogoClick, children }) => {
  const renderHeader = () => {
    if (!board) return <MainHeader routePage={routePage} onLogout={onLogout} />;

    return board.isCategorized
      ? <ShareHeader />
      : <BoardHeader />;
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo} onClick={handleLogoClick}>taptap</div>
        {
          !user
            ? <LoginHeader onLogin={onLogin} />
            : <div className={styles.buttonContainer}>
                { renderHeader() }
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
