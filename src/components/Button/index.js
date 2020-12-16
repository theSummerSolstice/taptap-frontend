import React from 'react';
import styles from './Button.module.scss';

const Button = ({
  className,
  text,
  onClick,
  children,
  ...attributes
}) => {
  return (
    <button className={styles[className]} onClick={onClick} {...attributes}>
      {children}
      {text}
    </button>
  );
};

export default Button;
