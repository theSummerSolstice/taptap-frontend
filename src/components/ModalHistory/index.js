import React from 'react';
import styles from './ModalHistory.module.scss';
import ModalPortal from '../ModalPortal';
import Modal from '../Modal';
import Button from '../Button';
import { changeDateFormat } from '../../utils/date';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';

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
          <Button className='defaultButton' onClick={handleHistoryModeOff} text='Cancel' />
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
            <Button className='defaultButton' value='prev' onClick={handleVersionController}>
              <RiArrowDropLeftLine size='4em' />
            </Button>
            <Button className='defaultButton' value='next' onClick={handleVersionController}>
              <RiArrowDropRightLine size='4em' />
            </Button>
            <Button className='defaultButton' onClick={handleAlertModal} text='Return' />
          </div>
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
                <Button className='defaultButton' onClick={confirmDeleteSnapshots} text='Confirm' />
                <Button className='defaultButton' onClick={handleAlertModal} text='Cancel' />
              </div>
            </div>
          </Modal>
        </ModalPortal>
      }
    </>
  );
};

export default ModalHistory;
