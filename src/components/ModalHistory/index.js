import React, { useState } from 'react';
import styles from './ModalHistory.module.scss';
import ModalPortal from '../ModalPortal';
import Modal from '../Modal';

const ModalHistory = ({
  boardId,
  snapshots,
  showPreviousNotes,
  setIsHistoryModalShowing,
  currentNotes,
  deleteLaterSnapshots,
 }) => {
  const [snapshotIndex, setSnapshotIndex] = useState(snapshots.length - 1);
  const [isModalShowing, setIsModalShowing] = useState(false);

  const handleContoller = ({ target }) => {
    if (target.value === 'prev') {
      setSnapshotIndex((prev) => prev - 1 < 0 ? prev : prev - 1);
      showPreviousNotes(snapshots[snapshotIndex].notes);
    } else {
      setSnapshotIndex((prev) => prev + 1 > snapshots.length - 1 ? prev : prev + 1);
      showPreviousNotes(snapshots[snapshotIndex].notes);
    }
  };

  const handleVersion = (notes, index) => {
    showPreviousNotes(notes);
    setSnapshotIndex(index);
  };

  const handleHistoryModeOff = () => {
    setIsHistoryModalShowing((prev) => !prev);
    showPreviousNotes(currentNotes);
  };

  const handleAlertModal = () => setIsModalShowing(!isModalShowing);
  const handleConfirmDeleteSnapshots = () => {
    deleteLaterSnapshots({ boardId, index: snapshotIndex + 1});
    setIsHistoryModalShowing((prev) => !prev);
    setIsModalShowing(!isModalShowing);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <h3>History select</h3>
          <button onClick={handleHistoryModeOff}>Cancel</button>
        </div>
        <div className={styles.timeTravel}>
          <div className={styles.versionContainer}>
            {
              snapshots.map((snapshot, index) => (
                <div
                  key={index}
                  className={styles.version}
                  onClick={() => handleVersion(snapshot.notes, index)}
                >
                  <span>
                    {
                      index === snapshots.length - 1
                        ? 'Latest version'
                        : `Version ${index + 1}`
                    }
                  </span>
                  <span>{snapshot.updatedAt}</span>
                </div>
              )).reverse()
            }
          </div>
          <div className={styles.controller}>
            <button onClick={handleContoller} value='prev'>Prev</button>
            <button onClick={handleContoller} value='next'>Next</button>
          </div>
          <button onClick={handleAlertModal}>Return</button>
        </div>
      </div>
      {
        isModalShowing &&
        <ModalPortal>
          <Modal className='alertModal'>
            <div className={styles.modalContents}>
              <h3>Alert</h3>
              <p>
                If you return to the previous page,
                all histories after this snapshot will be deleted.
              </p>
              <div className={styles.buttonContainer}>
                <button onClick={handleConfirmDeleteSnapshots}>Confirm</button>
                <button onClick={handleAlertModal}>Cancel</button>
              </div>
            </div>
          </Modal>
        </ModalPortal>
      }
    </>
  );
};

export default ModalHistory;
