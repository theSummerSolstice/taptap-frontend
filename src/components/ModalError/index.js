import React from 'react';
import Button from '../Button';
import PropTypes from 'prop-types';
import styles from './ModalError.module.scss';
import ROUTE from '../../constants/route';

const ModalError = ({ error, routePage }) => {
  return (
    <div className={styles.modalContents}>
      <h3>Error</h3>
      <p>{error}</p>
      <Button
        text='Main'
        className='defaultButton'
        onClick={() => routePage(ROUTE.MAIN)}
      />
    </div>
  );
};

ModalError.propTypes = {
  error: PropTypes.object.isRequired,
  routePage: PropTypes.func.isRequired,
};

export default ModalError;
