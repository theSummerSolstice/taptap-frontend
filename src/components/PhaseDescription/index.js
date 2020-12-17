import React from 'react';
import Button from '../Button';
import styles from './PhaseDescription.module.scss';

const PhaseDescription = ({
  description,
  buttonText,
  onClick,
  ...attributes
}) => {
  return (
    <div className={styles.container} data-html2canvas-ignore={true}>
      <p>{ description }</p>
      <Button
        className='defaultButton'
        onClick={onClick}
        text={buttonText}
        {...attributes}
      />
    </div>
  );
};

export default PhaseDescription;
