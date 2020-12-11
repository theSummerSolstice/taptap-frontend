import React, { useState } from 'react';
import styles from './Note.module.scss';
import Draggable from 'react-draggable';

const Note = ({ note, user, auth, boardId, deleteNote, updateNotePosition }) => {
  const [isButtonShowing, setIsButtonShowing] = useState(false);

  const handleMouseEnter = () => setIsButtonShowing(true);
  const handleMouseLeave = () => setIsButtonShowing(false);
  const handleDelete = () => deleteNote({ boardId, noteId: note._id });
  const handleDragNote = (event) => {
    const position = {
      x: event.clientX - 200,
      y: event.clientY - 100,
    };
    updateNotePosition(boardId, note._id, position);
  };

  return (
    <Draggable
      defaultPosition={{ x: note.position.x, y: note.position.y }}
      bounds='parent'
      onStop={handleDragNote}
      disabled={auth === 'READ'}
    >
      <div
        className={styles.note}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span>{note.contents}</span>
        {
          isButtonShowing && auth === 'EDIT' &&
          <button className={styles.deleteButton} onClick={handleDelete}>Delete</button>
        }
        <span>{user.username}</span>
      </div>
    </Draggable>
  );
};

export default Note;
