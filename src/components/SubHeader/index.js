import React from 'react';

export const LoginHeader = ({ onLogin }) => {
  return (
    <button onClick={onLogin}>Login</button>
  );
};

export const MainHeader = ({ routePage }) => {
  return (
    <button onClick={() => routePage('/board/new')}>New taptap</button>
  );
};

export const BoardHeader = ({
  userId,
  boardOwner,
  handleSnapshot,
  handleHistoryModal
}) => {
  const isOwner = userId === boardOwner;

  return (
    <>
      {
        isOwner &&
          <>
            <button onClick={handleSnapshot}>Snapshot</button>
            <button onClick={handleHistoryModal}>History mode</button>
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
