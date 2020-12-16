import React from 'react';
import Button from '../Button';
import ROUTE from '../../constants/route';
import styles from './ModalError.module.scss';

const ModalError = ({ error, routePage }) => {
  return (
    <div className={styles.modalContents}>
      <h3>Error</h3>
      <p>{error}</p>
      <Button className='defaultButton' onClick={() => routePage(ROUTE.MAIN)} text='Main' />
    </div>
  );
};

export default ModalError;
