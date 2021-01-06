import React from 'react';
import ModalPortal from '../ModalPortal';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';

const Modal = ({ className, onClick, children }) => {
  return (
    <ModalPortal>
      <div className={styles[className]}>
        <div className={styles.modalOverlay} onClick={onClick} />
        <div className={styles.modalContents}>{children}</div>
      </div>
    </ModalPortal>
  );
};

Modal.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.element,
};

export default Modal;
