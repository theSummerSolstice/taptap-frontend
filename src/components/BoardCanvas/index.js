import React, { useState } from 'react';
import Draggable from 'react-draggable';
import Note from '../Note';
import styles from './BoardCanvas.module.scss';
import PhaseDescription from '../PhaseDescription';

const BoardCanvas = ({
  boardId,
  notes,
  user,
  addNote,
  deleteNote,
  updateNotePosition,
  boardRef,
}) => {
  const initialState = {
    owner: user.username || '',
    position: { x: null, y: null },
    contents: '',
  };

  const [isWriting, setIsWriting] = useState(false);
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const [note, setNote] = useState(initialState);

  const handleDoubleClick = (event) => {
    if (isWriting) return;
    setIsDoubleClicked(true);

    setNote({
      ...note,
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
      <PhaseDescription
        description='Put all the thoughts in stick notes, then CATEGORIZE!'
        buttonText='Categorize'
        onClick={() => console.log('categorize')}
      />
      {
        isDoubleClicked &&
        <Draggable
          defaultPosition={{ x: note.position.x, y: note.position.y }}
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
        notes.map((item) => (
          <Note
            key={item._id}
            note={item}
            user={user}
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
