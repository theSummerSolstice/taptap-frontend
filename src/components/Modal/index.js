import React from 'react';
import styles from './Modal.module.scss';

const Modal = ({ onClick, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.modalOverlay} onClick={onClick} />
      <div className={styles.modalContents}>
        { children }
      </div>
    </div>
  );
};

export default Modal;
