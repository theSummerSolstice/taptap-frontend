import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import Note from '../Note';
import Button from '../Button';
import PhaseDescription from '../PhaseDescription';
import PropTypes from 'prop-types';
import styles from './BoardCanvas.module.scss';
import AUTH from '../../constants/auth';
import { COLORS } from '../../constants/style';

const BoardCanvas = ({
  boardId,
  notes,
  username,
  auth,
  addNote,
  deleteNote,
  updateNotePosition,
  startCategorize,
}) => {
  const initialState = {
    owner: username,
    position: { x: null, y: null },
    contents: '',
    category: 'unsorted',
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };

  const [isWriting, setIsWriting] = useState(false);
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const [note, setNote] = useState(initialState);
  const boardRef = useRef(null);

  const handleBoardDoubleClick = (event) => {
    if (isWriting || auth !== AUTH.EDIT) return;
    setIsDoubleClicked(true);

    setNote({
      ...note,
      owner: username,
      position: {
        x: event.clientX - 350,
        y: event.clientY - 70,
      },
    });

    setIsWriting(true);
  };

  const handleNoteInputChange = ({ target }) => {
    setNote({
      ...note,
      contents: target.value,
    });
  };

  const handleNoteConfirmClick = (event) => {
    event.preventDefault();
    addNote({
      boardId,
      note: { ...note, _id: String(Date.now()) },
    });

    setIsWriting(false);
    setIsDoubleClicked(false);
    setNote(initialState);
  };

  return (
    <div
      id='canvas'
      ref={boardRef}
      className={styles.container}
      onDoubleClick={handleBoardDoubleClick}
    >
      {auth === AUTH.EDIT && (
        <PhaseDescription
          description='Put all the thoughts in stick notes, then CATEGORIZE!'
          buttonText='Categorize'
          onClick={startCategorize}
        />
      )}
      {auth === AUTH.HISTORY && (
        <PhaseDescription
          description='✋ History mode is on. You cannot edit sticky notes until the mode ends.'
          style={{ visibility: 'hidden' }}
        />
      )}
      {isDoubleClicked && (
        <Draggable
          position={{ x: note.position.x, y: note.position.y }}
          bounds='parent'
          disabled={auth !== AUTH.EDIT}
        >
          <form className={styles.note}>
            <textarea
              className={styles.noteInput}
              type='text'
              name='contents'
              placeholder='Write only one thought 📌'
              value={note.contents}
              onChange={handleNoteInputChange}
              maxLength={50}
            />
            <Button
              className='defaultButton'
              text='Confirm'
              onClick={handleNoteConfirmClick}
            />
          </form>
        </Draggable>
      )}
      {notes.map((item) => (
        <Note
          key={item._id}
          note={item}
          username={username}
          auth={auth}
          boardId={boardId}
          deleteNote={deleteNote}
          updateNotePosition={updateNotePosition}
        />
      ))}
    </div>
  );
};

BoardCanvas.propTypes = {
  boardId: PropTypes.string.isRequired,
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      color: PropTypes.string,
      contents: PropTypes.string,
      position: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
      }),
    })
  ),
  username: PropTypes.string.isRequired,
  auth: PropTypes.string.isRequired,
  addNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  updateNotePosition: PropTypes.func.isRequired,
  startCategorize: PropTypes.func.isRequired,
};

export default BoardCanvas;
