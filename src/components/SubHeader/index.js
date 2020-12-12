import React from 'react';
import Button from '../Button';

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

export const ShareHeader = () => {
  return (
    <>
      <button>Download</button>
      <button>Link</button>
    </>
  );
};
