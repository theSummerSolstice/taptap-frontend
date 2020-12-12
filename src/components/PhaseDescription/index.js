import React from 'react';
import styles from './PhaseDescription.module.scss';
import Button from '../Button';

const PhaseDescription = ({ description, onClick }) => {
  return (
    <div className={styles.container}>
      <p>{ description }</p>
      <Button className='defaultButton' onClick={onClick} text='Categorize' />
    </div>
  );
};

export default PhaseDescription;
