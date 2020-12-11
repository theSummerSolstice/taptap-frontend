import React from 'react';
import styles from './PhaseDescription.module.scss';

const PhaseDescription = ({ description, buttonText, onClick }) => {
  return (
    <div className={styles.container}>
      <p>{ description }</p>
      <button onClick={onClick}>{ buttonText }</button>
    </div>
  );
};

export default PhaseDescription;
