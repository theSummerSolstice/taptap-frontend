import React from 'react';
import styles from './Header.module.scss';
import { LoginHeader, MainHeader, BoardHeader, ShareHeader } from '../SubHeader';

const Header = ({
  user,
  board,
  onLogin,
  routePage,
  handleSnapshot,
  handleUserModal,
  handleHistoryModeOn,
  handleLeaveBoard,
  children,
}) => {
  const renderHeader = () => {
    if (!board) {
      return <MainHeader routePage={routePage} />;
    }

    return board.isCategorized
      ? <ShareHeader />
      : <BoardHeader
          isOwner={user._id === board.owner}
          handleSnapshot={handleSnapshot}
          handleHistoryModeOn={handleHistoryModeOn}
        />;
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo} onClick={handleLeaveBoard}>taptap</div>
        {
          !user
            ? <LoginHeader onLogin={onLogin} />
            : <div className={styles.buttonContainer}>
                { renderHeader() }
                <img src={user.imageSrc} alt='user profile' onClick={handleUserModal} />
              </div>
        }
      </div>
      <div className={styles.children}>
        {children}
      </div>
    </>
  );
};

export default Header;
