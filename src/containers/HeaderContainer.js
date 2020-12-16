import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector, logoutUser } from '../modules/user/slice';
import {
  boardSelector,
  deleteSnapshots,
  storeCurrentNotes,
  updateSnapshot
} from '../modules/board/slice';
import { getNotes } from '../modules/currentNotes/slice';
import { ToastContainer } from 'react-toastify';
import toast from '../utils/toast';
import Header from '../components/Header';
import ModalPortal from '../components/ModalPortal';
import Modal from '../components/Modal';
import ModalUser from '../components/ModalUser';
import ModalHistory from '../components/ModalHistory';
import { boardSocket } from '../modules/socket/saga';
import { notesSelector } from '../modules/currentNotes/slice';
import html2canvas from 'html2canvas';
import ROUTE from '../constants/route';

const HeaderContainer = ({
  onLogin,
  routePage,
  handleLeaveBoard,
  children,
}) => {
  const { user } = useSelector(userSelector.all);
  const { board } = useSelector(boardSelector.all);
  const { notes } = useSelector(notesSelector.all);

  const dispatch = useDispatch();
  const showPreviousNotes = (noteList) => dispatch(getNotes(noteList));
  const deleteLaterSnapshots = (boardId, index) => dispatch(deleteSnapshots(boardId, index));
  const storeCurrentNoteList = (notes) => dispatch(storeCurrentNotes(notes));

  const [isUserModalShowing, setIsUserModalShowing] = useState(false);
  const [isHistoryModalShowing, setIsHistoryModalShowing] = useState(false);
  const [isAlertModalShowing, setIsAlertModalShowing] = useState(false);
  const [snapshotIndex, setSnapshotIndex] = useState(null);

  const handleUserModal = () => setIsUserModalShowing(!isUserModalShowing);
  const handleAlertModal = () => setIsAlertModalShowing(!isAlertModalShowing);

  const handleLogout = () => {
    setIsUserModalShowing(!isUserModalShowing);
    dispatch(logoutUser());
    routePage(ROUTE.MAIN);
  };

  const navigatePage = ({ target }) => {
    setIsUserModalShowing(!isUserModalShowing);
    routePage(target.value);
  };

  const handleSnapshot = () => {
    dispatch(updateSnapshot({
      data: { snapshots: { notes } },
      boardId: board._id,
    }));

    toast.saveSnapshot();
  };

  const handleHistoryModeOn = () => {
    setSnapshotIndex(board.snapshots.length - 1);
    setIsHistoryModalShowing(!isHistoryModalShowing);
    storeCurrentNoteList(notes);
    boardSocket.historyModeOn({ boardId: board._id });
  };

  const handleHistoryModeOff = () => {
    setIsHistoryModalShowing(!isHistoryModalShowing);
    showPreviousNotes(board.currentNotes);
    boardSocket.historyModeOff({ boardId: board._id });
  };

  const handleVersionClick = (notes, index) => {
    showPreviousNotes(notes);
    setSnapshotIndex(index);
    boardSocket.selectVersion({ boardId: board._id, notes });
  };

  const handleVersionController = ({ target }) => {
    if (target.value === 'prev') {
      setSnapshotIndex((prev) => prev - 1 < 0 ? prev : prev - 1);
    } else {
      setSnapshotIndex((prev) => prev + 1 > board.snapshots.length - 1 ? prev : prev + 1);
    }
    showPreviousNotes(board.snapshots[snapshotIndex].notes);
    boardSocket.selectVersion({ boardId: board._id, notes: board.snapshots[snapshotIndex].notes });
  };

  const confirmDeleteSnapshots = () => {
    deleteLaterSnapshots({ boardId: board._id, index: snapshotIndex + 1});
    setIsHistoryModalShowing(!isHistoryModalShowing);
    setIsAlertModalShowing(!isAlertModalShowing);
    boardSocket.historyModeOff({ boardId: board._id });
  };

  const downloadImage = async () => {
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
        handleSnapshot={handleSnapshot}
        handleUserModal={handleUserModal}
        handleHistoryModeOn={handleHistoryModeOn}
        handleLeaveBoard={handleLeaveBoard}
        downloadImage={downloadImage}
        copyBoardUrl={copyBoardUrl}
      >
        {children}
      </Header>
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
                snapshots={board.snapshots}
                isAlertModalShowing={isAlertModalShowing}
                handleAlertModal={handleAlertModal}
                handleHistoryModeOff={handleHistoryModeOff}
                handleVersionClick={handleVersionClick}
                handleVersionController={handleVersionController}
                confirmDeleteSnapshots={confirmDeleteSnapshots}
              />
            </Modal>
          </ModalPortal>
        }
    </>
  );
};

export default HeaderContainer;
