import React from 'react';
import { MdFileDownload } from 'react-icons/md';
import { HiOutlineLink } from 'react-icons/hi';
import Button from '../Button';
import PropTypes from 'prop-types';
import ROUTE from '../../constants/route';
import { ICON_SIZE } from '../../constants/style';

export const LoginHeader = ({ onLogin }) => {
  return (
    <Button
      className='defaultButton'
      onClick={onLogin}
      text='Login'
    />
  );
};

export const MainHeader = ({ routePage }) => {
  return (
    <Button
      className='defaultButton'
      onClick={() => routePage(ROUTE.BOARD_NEW)}
      text='New taptap'
    />
  );
};

export const BoardHeader = ({
  isOwner,
  saveSnapshot,
  startHistoryMode,
}) => {
  return (
    <>
      {
        isOwner &&
        <>
          <Button className='defaultButton' onClick={saveSnapshot} text='Snapshot' />
          <Button className='defaultButton' onClick={startHistoryMode} text='History mode' />
        </>
      }
    </>
  );
};

export const ShareHeader = ({ downloadImage, copyBoardUrl }) => {
  return (
    <>
      <Button className='shareButton' onClick={downloadImage}>
        <MdFileDownload size={ICON_SIZE.LARGE} />
      </Button>
      <Button className='shareButton' onClick={copyBoardUrl}>
        <HiOutlineLink size={ICON_SIZE.MEDIUM} />
      </Button>
    </>
  );
};

LoginHeader.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

MainHeader.propTypes = {
  routePage: PropTypes.func.isRequired,
};

BoardHeader.propTypes = {
  isOwner: PropTypes.bool.isRequired,
  saveSnapshot: PropTypes.func.isRequired,
  startHistoryMode: PropTypes.func.isRequired,
};

ShareHeader.propTypes = {
  downloadImage: PropTypes.func.isRequired,
  copyBoardUrl: PropTypes.func.isRequired,
};
