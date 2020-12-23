import React from 'react';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';
import Modal from '../Modal';
import Button from '../Button';
import PropTypes from 'prop-types';
import styles from './ModalHistory.module.scss';
import { ICON_SIZE } from '../../constants/style';

const ModalHistory = ({
  snapshots,
  isAlertModalShowing,
  showAlertModal,
  closeHistoryMode,
  selectHistoryVersion,
  handleVersionController,
  confirmDeleteSnapshots,
 }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <h3>History select</h3>
          <Button
            className='defaultButton'
            onClick={closeHistoryMode}
            text='Cancel'
          />
        </div>
        <div className={styles.timeTravel}>
          <div className={styles.versionContainer}>
            {
              snapshots.map((snapshot, index) => (
                <div
                  key={index}
                  className={styles.version}
                  onClick={() => selectHistoryVersion(snapshot.notes, index)}
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
              <RiArrowDropLeftLine size={ICON_SIZE.XLARGE} />
            </Button>
            <Button className='defaultButton' value='next' onClick={handleVersionController}>
              <RiArrowDropRightLine size={ICON_SIZE.XLARGE} />
            </Button>
            <Button className='defaultButton' onClick={showAlertModal} text='Return' />
          </div>
        </div>
      </div>
      {
        isAlertModalShowing &&
          <Modal className='alertModal'>
            <div className={styles.modalContents}>
              <h3>Alert</h3>
              <p>
                If you return to the previous page,
                all histories after this snapshot will be deleted.
              </p>
              <div className={styles.buttonContainer}>
                <Button className='defaultButton' onClick={confirmDeleteSnapshots} text='Confirm' />
                <Button className='defaultButton' onClick={showAlertModal} text='Cancel' />
              </div>
            </div>
          </Modal>
      }
    </>
  );
};

ModalHistory.propTypes = {
  snapshots: PropTypes.arrayOf(PropTypes.shape({
    notes: PropTypes.arrayOf(PropTypes.object),
    updatedAt: PropTypes.string.isRequired,
  })),
  isAlertModalShowing: PropTypes.bool.isRequired,
  showAlertModal: PropTypes.func.isRequired,
  closeHistoryMode: PropTypes.func.isRequired,
  selectHistoryVersion: PropTypes.func.isRequired,
  handleVersionController: PropTypes.func.isRequired,
  confirmDeleteSnapshots: PropTypes.func.isRequired,
};

export default ModalHistory;
