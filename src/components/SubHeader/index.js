import React from 'react';
import Button from '../Button';
import { MdFileDownload } from 'react-icons/md';
import { HiOutlineLink } from 'react-icons/hi';

export const LoginHeader = ({ onLogin }) => {
  return (
    <Button className='defaultButton' onClick={onLogin} text='Login' />
  );
};

export const MainHeader = ({ routePage }) => {
  return (
    <Button className='defaultButton' onClick={() => routePage('/board/new')} text='New taptap' />
  );
};

export const BoardHeader = ({
  isOwner,
  handleSnapshot,
  handleHistoryModeOn
}) => {
  return (
    <>
      {
        isOwner &&
          <>
            <Button className='defaultButton' onClick={handleSnapshot} text='Snapshot' />
            <Button className='defaultButton' onClick={handleHistoryModeOn} text='History mode' />
          </>
      }
    </>
  );
};

export const ShareHeader = ({ downloadImage, copyBoardUrl }) => {
  return (
    <>
      <Button className='shareButton' onClick={downloadImage}>
        <MdFileDownload size='1.5em' />
      </Button>
      <Button className='shareButton' onClick={copyBoardUrl}>
        <HiOutlineLink size='1.3em' />
      </Button>
    </>
  );
};
