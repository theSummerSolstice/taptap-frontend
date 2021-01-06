import React from 'react';
import Button from '../Button';
import PropTypes from 'prop-types';
import styles from './PhaseDescription.module.scss';

const PhaseDescription = ({
  description,
  buttonText,
  onClick,
  ...attributes
}) => {
  return (
    <div className={styles.container} data-html2canvas-ignore={true}>
      <p>{description}</p>
      <Button
        className='defaultButton'
        onClick={onClick}
        text={buttonText}
        {...attributes}
      />
    </div>
  );
};

PhaseDescription.propTypes = {
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
};

export default PhaseDescription;
