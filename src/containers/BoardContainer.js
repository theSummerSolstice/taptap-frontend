import React, { useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../modules/user/slice';
import { boardAction, boardSelector } from '../modules/board/slice';
import { boardSocket } from '../modules/socket/saga';

import queryString from 'query-string';
import Board from '../components/Board';

const {
  getBoard,
  updateBoard,
} = boardAction;

const BoardContainer = ({ handleLeaveBoard }) => {
  const { user } = useSelector(userSelector.all);
  const { loading, board, error } = useSelector(boardSelector.all);
  const notes = useSelector((state) => state.NOTES);
  const dispatch = useDispatch();
  const { board_id } = useParams();
  const history = useHistory();

  const boardRef = useRef(null);

  const addNote = (note) => boardSocket.addNote(note);
  const deleteNote = (noteId) => boardSocket.deleteNote(noteId);
  const updateNotePosition = (boardId, noteId, position) => boardSocket.updateNotePosition({ boardId, noteId, position });

  useEffect(() => {
    const hasEmail = queryString.parse(board_id).email;

    if (!hasEmail) {
      dispatch(getBoard({ boardId: board_id, user }));
    } else {
      const boardId = board_id.split('&')[0];

      if (!user) {
        localStorage.setItem('boardId', boardId);
        history.push('/');
        return;
      }

      dispatch(getBoard({ boardId, user }));
    }
  }, [user]);

  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Board
        board={board}
        loading={loading}
        notes={notes}
        user={user}
        addNote={addNote}
        deleteNote={deleteNote}
        handleLeaveBoard={handleLeaveBoard}
        updateNotePosition={updateNotePosition}
        boardRef={boardRef}
      />
    </div>
  );
};

export default BoardContainer;
