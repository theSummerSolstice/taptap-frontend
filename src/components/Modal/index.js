import React from 'react';
import ModalPortal from '../ModalPortal';
import styles from './Modal.module.scss';

const Modal = ({ className, onClick, children }) => {
  return (
    <ModalPortal>
      <div className={styles[className]}>
        <div className={styles.modalOverlay} onClick={onClick} />
        <div className={styles.modalContents}>
          { children }
        </div>
    </div>
    </ModalPortal>
  );
};

export default Modal;
