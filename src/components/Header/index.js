import React, { useState } from 'react';
import styles from './Header.module.scss';
import Modal from '../Modal';
import ModalPortal from '../ModalPortal';
import ModalUser from '../ModalUser';

const Header = ({
  user,
  board,
  notes,
  onLogin,
  onLogout,
  routePage,
  handleLeaveBoard,
  updateBoard,
  children
}) => {
  const [isModalShowing, setIsModalShowing] = useState(false);

  const renderHeader = () => {
    if (!board) {
      return <MainHeader routePage={routePage} />;
    }

    return board.isCategorized
      ? <ShareHeader />
      : <BoardHeader
          userId={user._id}
          board={board}
          notes={notes}
          updateBoard={updateBoard}
        />;
  };

  const handleModalShowing = () => {
    setIsModalShowing(!isModalShowing);
  };

  const navigatePage = ({ target }) => {
    setIsModalShowing(!isModalShowing);
    routePage(target.value);
  };

  const handleLogout = () => {
    setIsModalShowing(!isModalShowing);
    onLogout();
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
                <img src={user.imageSrc} alt='user profile' onClick={handleModalShowing} />
              </div>
        }
      </div>
      <div className={styles.children}>
        { children }
      </div>
      {
        isModalShowing &&
        <ModalPortal>
          <Modal onClick={handleModalShowing}>
            <ModalUser
              username={user.username}
              onLogout={handleLogout}
              navigatePage={navigatePage}
            />
          </Modal>
        </ModalPortal>
      }
    </>
  );
};

const LoginHeader = ({ onLogin }) => {
  return (
    <button onClick={onLogin}>Login</button>
  );
};

const MainHeader = ({ routePage }) => {
  return (
    <button onClick={() => routePage('/board/new')}>New taptap</button>
  );
};

const BoardHeader = ({ userId, board, notes, updateBoard }) => {
  const isOwner = userId === board.owner;

  // TODO: 여기 데이터가 필요 없는거라면 위에서 처리하고 실행만 여기서 하는게 맞지 않을까?
  const handleSnapshot = () => {
    updateBoard({
      data: { notes },
      boardId: board._id,
      updatedItem: 'snapshots',
    });
  };

  return (
    <>
      {
        isOwner &&
          <>
            <button onClick={handleSnapshot}>Snapshot</button>
            <button>History mode</button>
          </>
      }
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

export default Header;
