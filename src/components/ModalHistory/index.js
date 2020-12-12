import React from 'react';
import styles from './ModalHistory.module.scss';
import ModalPortal from '../ModalPortal';
import Modal from '../Modal';

const ModalHistory = ({
  snapshots,
  isAlertModalShowing,
  handleAlertModal,
  handleHistoryModeOff,
  handleVersionClick,
  handleVersionController,
  confirmDeleteSnapshots,
 }) => {
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
                  onClick={() => handleVersionClick(snapshot.notes, index)}
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
            <button onClick={handleVersionController} value='prev'>Prev</button>
            <button onClick={handleVersionController} value='next'>Next</button>
          </div>
          <button onClick={handleAlertModal}>Return</button>
        </div>
      </div>
      {
        isAlertModalShowing &&
        <ModalPortal>
          <Modal className='alertModal'>
            <div className={styles.modalContents}>
              <h3>Alert</h3>
              <p>
                If you return to the previous page,
                all histories after this snapshot will be deleted.
              </p>
              <div className={styles.buttonContainer}>
                <button onClick={confirmDeleteSnapshots}>Confirm</button>
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
