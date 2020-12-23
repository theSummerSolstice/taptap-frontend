import React from 'react';
import { LoginHeader, MainHeader, BoardHeader, ShareHeader } from '../SubHeader';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';

const Header = ({
  user,
  board,
  onLogin,
  routePage,
  saveSnapshot,
  showUserModal,
  startHistoryMode,
  leaveBoard,
  downloadImage,
  copyBoardUrl,
  children,
}) => {
  const renderHeader = () => {
    if (!board) {
      return <MainHeader routePage={routePage} />;
    }

    return board.isCategorized
      ? <ShareHeader
          downloadImage={downloadImage}
          copyBoardUrl={copyBoardUrl}
        />
      : <BoardHeader
          isOwner={user._id === board.owner}
          saveSnapshot={saveSnapshot}
          startHistoryMode={startHistoryMode}
        />;
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo} onClick={leaveBoard}>
          taptap
        </div>
        {
          !user
            ? <LoginHeader onLogin={onLogin} />
            : <div className={styles.buttonContainer}>
                {renderHeader()}
                <img src={user.imageSrc} alt='user profile' onClick={showUserModal} />
              </div>
        }
      </div>
      <div className={styles.children}>
        {children}
      </div>
    </>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
  }),
  board: PropTypes.shape({
    isCategorized: PropTypes.bool.isRequired,
    owner: PropTypes.string.isRequired
  }),
  onLogin: PropTypes.func.isRequired,
  routePage: PropTypes.func.isRequired,
  saveSnapshot: PropTypes.func.isRequired,
  showUserModal: PropTypes.func.isRequired,
  startHistoryMode: PropTypes.func.isRequired,
  leaveBoard: PropTypes.func.isRequired,
  downloadImage: PropTypes.func.isRequired,
  copyBoardUrl: PropTypes.func.isRequired,
  children: PropTypes.element,
};

export default Header;
