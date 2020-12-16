import React from 'react';
import Modal from '../Modal';
import ModalError from '../ModalError';

const ErrorView = ({ error, routePage }) => {
  return (
    <Modal className='alertModal'>
      <ModalError error={error} routePage={routePage} />
    </Modal>
  );
};

export default ErrorView;
