import React, { useState } from 'react';
import styles from './BoardCanvas.module.scss';
import Draggable from 'react-draggable';
import Note from '../Note';

const initialState = {
  x: null,
  y: null,
  contents: '',
};

const BoardCanvas = ({ boardId, notes, user, handleAddNote }) => {
  const [isWriting, setIsWriting] = useState(false);
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const [note, setNote] = useState(initialState);

  const handleDoubleClick = (event) => {
    if (isWriting) return;
    setIsDoubleClicked(true);

    setNote({
      ...note,
      x: event.clientX,
      y: event.clientY,
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
    handleAddNote({
      boardId,
      note: { ...note, id: Date.now() },
    });

    setIsWriting(false);
    setIsDoubleClicked(false);
    setNote(initialState);
  };

  return (
    <div onDoubleClick={handleDoubleClick} className={styles.container}>
      {
        isDoubleClicked &&
        <Draggable
          defaultPosition={{ x: note.x, y: note.y }}
          bounds='parent'
        >
          <form className={styles.note}>
            <textarea
              type='text'
              name='contents'
              className={styles.noteInput}
              placeholder='Write only one thought'
              value={note.contents}
              onChange={handleInputChange}
              maxLength={100}
            />
            <button className={styles.confirmButton} onClick={handleConfirm}>Confirm</button>
          </form>
        </Draggable>
      }
      {
        notes.map((item, index) => (
          <Note key={index} note={item} user={user} />
        ))
      }
    </div>
  );
};

export default BoardCanvas;
