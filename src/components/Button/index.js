import React from 'react';
import styles from './Button.module.scss';

const Button = ({ className, id, text, onClick, value, children }) => {
  return (
    <button className={styles[className]} onClick={onClick} value={value} id={id}>
      {children}
      {text}
    </button>
  );
};

export default Button;
