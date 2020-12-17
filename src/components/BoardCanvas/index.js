import React, { useState } from 'react';
import Draggable from 'react-draggable';
import Note from '../Note';
import Button from '../Button';
import PhaseDescription from '../PhaseDescription';
import styles from './BoardCanvas.module.scss';
import AUTH from '../../constants/auth';
import { COLORS } from '../../constants/style';

const BoardCanvas = ({
  boardId,
  notes,
  user,
  auth,
  boardRef,
  addNote,
  deleteNote,
  updateNotePosition,
  startCategorize,
}) => {
  const initialState = {
    owner: user.username,
    position: { x: null, y: null },
    contents: '',
    category: 'unsorted',
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };

  const [isWriting, setIsWriting] = useState(false);
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const [note, setNote] = useState(initialState);

  const handleBoardDoubleClick = (event) => {
    if (isWriting || auth !== AUTH.EDIT) return;
    setIsDoubleClicked(true);

    setNote({
      ...note,
      owner: user.username,
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
      {
        auth === AUTH.EDIT &&
        <PhaseDescription
          description='Put all the thoughts in stick notes, then CATEGORIZE!'
          buttonText='Categorize'
          onClick={startCategorize}
        />
      }
      {
        auth === AUTH.HISTORY &&
        <PhaseDescription
          description='✋ History mode is on. You cannot edit sticky notes until the mode ends.'
          style={{ visibility: 'hidden' }}
        />
      }
      {
        isDoubleClicked &&
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
      }
      {
        notes.map((item) => (
          <Note
            key={item._id}
            note={item}
            user={user}
            auth={auth}
            boardId={boardId}
            deleteNote={deleteNote}
            updateNotePosition={updateNotePosition}
          />
        ))
      }
    </div>
  );
};

export default BoardCanvas;
