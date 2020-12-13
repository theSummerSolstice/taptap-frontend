import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import Note from '../Note';
import styles from './BoardCanvas.module.scss';
import PhaseDescription from '../PhaseDescription';
import Button from '../Button';
import { COLORS } from '../../constants/colors';

const BoardCanvas = ({
  boardId,
  notes,
  user,
  auth,
  addNote,
  deleteNote,
  updateNotePosition,
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
  const boardRef = useRef();

  const handleDoubleClick = (event) => {
    if (isWriting || auth === 'READ' || auth === 'HISTORY') return;
    setIsDoubleClicked(true);

    setNote({
      ...note,
      owner: user.username,
      position: {
        x: event.clientX - 200,
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
        auth === 'HISTORY' &&
        <p className={styles.historyModeMessage}>History mode is on. You cannot edit sticky notes until the mode ends.</p>
      }
      {
        auth === 'EDIT' &&
        <PhaseDescription
          description='Put all the thoughts in stick notes, then CATEGORIZE!'
          onClick={() => console.log('categorize')}
        />
      }
      {
        isDoubleClicked &&
        <Draggable
          defaultPosition={{ x: note.position.x, y: note.position.y }}
          bounds='parent'
          disabled={auth === 'READ' || auth === 'HISTORY'}
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
