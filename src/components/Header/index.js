import React, { useState } from 'react';
import styles from './Header.module.scss';
import Modal from '../Modal';
import ModalPortal from '../ModalPortal';
import ModalUser from '../ModalUser';
import ModalHistory from '../ModalHistory';
import { LoginHeader, MainHeader, BoardHeader, ShareHeader } from '../SubHeader';

const Header = ({
  user,
  board,
  notes,
  onLogin,
  onLogout,
  routePage,
  handleLeaveBoard,
  updateBoard,
  showPreviousNotes,
  storeCurrentNoteList,
  deleteLaterSnapshots,
  children
}) => {
  const [isUserModalShowing, setIsUserModalShowing] = useState(false);
  const [isHistoryModalShowing, setIsHistoryModalShowing] = useState(false);

  const handleUserModal = () => setIsUserModalShowing(!isUserModalShowing);
  const handleHistoryModal = () => {
    setIsHistoryModalShowing(!isHistoryModalShowing);
    storeCurrentNoteList(notes);
  };

  const handleSnapshot = () => {
    updateBoard({
      data: { notes },
      boardId: board._id,
      updatedItem: 'snapshots',
    });
  };

  const navigatePage = ({ target }) => {
    setIsUserModalShowing(!isUserModalShowing);
    routePage(target.value);
  };

  const handleLogout = () => {
    setIsUserModalShowing(!isUserModalShowing);
    onLogout();
  };

  const renderHeader = () => {
    if (!board) {
      return <MainHeader routePage={routePage} />;
    }

    return board.isCategorized
      ? <ShareHeader />
      : <BoardHeader
          userId={user._id}
          boardOwner={board.owner}
          notes={notes}
          handleSnapshot={handleSnapshot}
          handleHistoryModal={handleHistoryModal}
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
        { children }
      </div>
      {
        isUserModalShowing &&
        <ModalPortal>
          <Modal onClick={handleUserModal} className='headerModal'>
            <ModalUser
              username={user.username}
              onLogout={handleLogout}
              navigatePage={navigatePage}
            />
          </Modal>
        </ModalPortal>
      }
      {
        isHistoryModalShowing &&
        <ModalPortal>
          <Modal className='headerModal'>
            <ModalHistory
              boardId={board._id}
              snapshots={board.snapshots}
              showPreviousNotes={showPreviousNotes}
              setIsHistoryModalShowing={setIsHistoryModalShowing}
              currentNotes={board.currentNotes}
              deleteLaterSnapshots={deleteLaterSnapshots}
            />
          </Modal>
        </ModalPortal>
      }
    </>
  );
};

export default Header;
