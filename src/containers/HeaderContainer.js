import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector, logoutUser } from '../modules/user/slice';
import { notesSelector } from '../modules/currentNotes/slice';
import { getNotes } from '../modules/currentNotes/slice';
import {
  boardSelector,
  deleteSnapshots,
  storeCurrentNotes,
  updateSnapshot
} from '../modules/board/slice';
import { boardSocket } from '../modules/socket/saga';

import { ToastContainer } from 'react-toastify';
import toast from '../utils/toast';
import html2canvas from 'html2canvas'
;
import Header from '../components/Header';
import Modal from '../components/Modal';
import ModalUser from '../components/ModalUser';
import ModalHistory from '../components/ModalHistory';
import ROUTE from '../constants/route';

const HeaderContainer = ({
  onLogin,
  routePage,
  leaveBoard,
  children,
}) => {
  const { user } = useSelector(userSelector.all);
  const { board } = useSelector(boardSelector.all);
  const { notes } = useSelector(notesSelector.all);

  const dispatch = useDispatch();
  const showSnapshotHistory = (notes) => dispatch(getNotes(notes));


  const [isUserModalShowing, setIsUserModalShowing] = useState(false);
  const [isHistoryModalShowing, setIsHistoryModalShowing] = useState(false);
  const [isAlertModalShowing, setIsAlertModalShowing] = useState(false);
  const [snapshotIndex, setSnapshotIndex] = useState(null);

  const showUserModal = () => setIsUserModalShowing(!isUserModalShowing);
  const showAlertModal = () => setIsAlertModalShowing(!isAlertModalShowing);

  const handleLogout = () => {
    setIsUserModalShowing(!isUserModalShowing);
    dispatch(logoutUser());
    routePage(ROUTE.MAIN);
  };

  const navigatePage = ({ target }) => {
    setIsUserModalShowing(!isUserModalShowing);
    routePage(target.value);
  };

  const saveSnapshot = () => {
    dispatch(updateSnapshot({
      data: { snapshots: { notes } },
      boardId: board._id,
    }));

    toast.saveSnapshot();
  };

  const startHistoryMode = () => {
    setSnapshotIndex(board.snapshots.length - 1);
    setIsHistoryModalShowing(!isHistoryModalShowing);
    dispatch(storeCurrentNotes(notes));
    boardSocket.historyModeOn({ boardId: board._id });
  };

  const closeHistoryMode = () => {
    setIsHistoryModalShowing(!isHistoryModalShowing);
    showSnapshotHistory(board.currentNotes);
    boardSocket.historyModeOff({ boardId: board._id });
  };

  const selectHistoryVersion = (notes, index) => {
    showSnapshotHistory(notes);
    setSnapshotIndex(index);
    boardSocket.selectVersion({ boardId: board._id, notes });
  };

  const handleVersionController = ({ target }) => {
    if (target.value === 'prev') {
      setSnapshotIndex((prev) => prev - 1 < 0 ? prev : prev - 1);
    } else {
      setSnapshotIndex((prev) => prev + 1 > board.snapshots.length - 1 ? prev : prev + 1);
    }
    showSnapshotHistory(board.snapshots[snapshotIndex].notes);
    boardSocket.selectVersion({ boardId: board._id, notes: board.snapshots[snapshotIndex].notes });
  };

  const confirmDeleteSnapshots = () => {
    dispatch(deleteSnapshots({ boardId: board._id, index: snapshotIndex + 1 }));
    setIsHistoryModalShowing(!isHistoryModalShowing);
    setIsAlertModalShowing(!isAlertModalShowing);
    boardSocket.historyModeOff({ boardId: board._id });
  };

  const downloadCurrentBoardImage = async () => {
    const canvas = await html2canvas(document.getElementById('canvas'));
    const link = document.getElementById('download');
    link.href = canvas.toDataURL('image/jpeg');
    link.download = `${board.name}.jpg`;
    link.click();

    toast.completeDownload();
  };

  const copyBoardUrl = useCallback(() => {
    const temp = document.createElement('input');
    temp.value = window.location.href;
    document.body.appendChild(temp);

    temp.select();
    document.execCommand('copy');
    toast.copyURL();
    document.body.removeChild(temp);
  }, []);

  return (
    <>
      <ToastContainer />
      <Header
        user={user}
        board={board}
        onLogin={onLogin}
        routePage={routePage}
        saveSnapshot={saveSnapshot}
        showUserModal={showUserModal}
        startHistoryMode={startHistoryMode}
        leaveBoard={leaveBoard}
        downloadImage={downloadCurrentBoardImage}
        copyBoardUrl={copyBoardUrl}
      >
        {children}
      </Header>
      {
        isUserModalShowing &&
          <Modal onClick={showUserModal} className='headerModal'>
            <ModalUser
              username={user.username}
              onLogout={handleLogout}
              navigatePage={navigatePage}
            />
          </Modal>
      }
      {
        isHistoryModalShowing &&
          <Modal className='headerModal'>
            <ModalHistory
              snapshots={board.snapshots}
              isAlertModalShowing={isAlertModalShowing}
              showAlertModal={showAlertModal}
              closeHistoryMode={closeHistoryMode}
              selectHistoryVersion={selectHistoryVersion}
              handleVersionController={handleVersionController}
              confirmDeleteSnapshots={confirmDeleteSnapshots}
            />
          </Modal>
        }
    </>
  );
};

export default HeaderContainer;
