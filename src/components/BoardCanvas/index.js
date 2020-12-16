import React, { useState } from 'react';
import Draggable from 'react-draggable';
import Note from '../Note';
import styles from './BoardCanvas.module.scss';
import PhaseDescription from '../PhaseDescription';
import Button from '../Button';
import { COLORS } from '../../constants/style';
import AUTH from '../../constants/auth';

const BoardCanvas = ({
  boardId,
  notes,
  user,
  auth,
  boardRef,
  addNote,
  deleteNote,
  updateNotePosition,
  handleCategorize,
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

  const handleDoubleClick = (event) => {
    if (isWriting || auth !== AUTH.EDIT) return;
    setIsDoubleClicked(true);

    setNote({
      ...note,
      owner: user.username,
      position: {
        x: event.clientX - 230,
        y: event.clientY - 100,
      },
    });

    setIsWriting(true);
  };

  const handleInputChange = ({ target }) => {
    setNote({
      ...note,
      contents: target.value,
    });
  };

  const handleConfirm = (event) => {
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
    <div id='canvas' onDoubleClick={handleDoubleClick} className={styles.container} ref={boardRef}>
      {
        auth === AUTH.HISTORY &&
        <p
          className={styles.historyModeMessage}
          data-html2canvas-ignore={true}
        >
          History mode is on. You cannot edit sticky notes until the mode ends.
        </p>
      }
      {
        auth === AUTH.EDIT &&
        <PhaseDescription
          description='Put all the thoughts in stick notes, then CATEGORIZE!'
          buttonText='Categorize'
          onClick={handleCategorize}
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
              onChange={handleInputChange}
              maxLength={50}
            />
            <Button className='defaultButton' onClick={handleConfirm} text='Confirm' />
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
