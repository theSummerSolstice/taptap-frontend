import React from 'react';
import styles from './PhaseDescription.module.scss';
import Button from '../Button';

const PhaseDescription = ({ description, buttonText, onClick }) => {
  return (
    <div className={styles.container} data-html2canvas-ignore={true}>
      <p>{ description }</p>
      <Button className='defaultButton' onClick={onClick} text={buttonText} />
    </div>
  );
};

export default PhaseDescription;
