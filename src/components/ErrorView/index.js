import React from 'react';
import Modal from '../Modal';
import ModalError from '../ModalError';
import PropTypes from 'prop-types';

const ErrorView = ({ error, routePage }) => {
  return (
    <Modal className='alertModal'>
      <ModalError error={error} routePage={routePage} />
    </Modal>
  );
};

ErrorView.propTypes = {
  error: PropTypes.object.isRequired,
  routePage: PropTypes.func.isRequired,
};

export default ErrorView;
