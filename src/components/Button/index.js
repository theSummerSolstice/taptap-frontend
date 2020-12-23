import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = ({
  className,
  text,
  onClick,
  children,
  ...attributes
}) => {
  return (
    <button
      className={styles[className]}
      onClick={onClick}
      {...attributes}
    >
      {children}
      {text}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Button;
