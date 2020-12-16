import React from 'react';
import Button from '../Button';
import { MdFileDownload } from 'react-icons/md';
import { HiOutlineLink } from 'react-icons/hi';
import ROUTE from '../../constants/route';
import { ICON_SIZE } from '../../constants/style';

export const LoginHeader = ({ onLogin }) => {
  return (
    <Button className='defaultButton' onClick={onLogin} text='Login' />
  );
};

export const MainHeader = ({ routePage }) => {
  return (
    <Button className='defaultButton' onClick={() => routePage(ROUTE.BOARD_NEW)} text='New taptap' />
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
        <MdFileDownload size={ICON_SIZE.MEDIUM} />
      </Button>
      <Button className='shareButton' onClick={copyBoardUrl}>
        <HiOutlineLink size={ICON_SIZE.SMALL} />
      </Button>
    </>
  );
};
