import React, { useState } from 'react';
import styles from './Note.module.scss';
import Draggable from 'react-draggable';

const Note = ({ note, user, boardId, handleDeleteNote }) => {
  const [isButtonShowing, setIsButtonShowing] = useState(false);

  const handleMouseEnter = () => {
    setIsButtonShowing(true);
  };

  const handleMouseLeave = () => {
    setIsButtonShowing(false);
  };

  const handleDelete = () => {
    handleDeleteNote({ boardId, noteId: note._id });
  };

  return (
    <Draggable
      defaultPosition={{ x: note.position.x, y: note.position.y }}
      bounds='parent'
    >
      <div
        className={styles.note}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span>{note.contents}</span>
        {
          isButtonShowing &&
          <button className={styles.deleteButton} onClick={handleDelete}>Delete</button>
        }
        <span>{user.username}</span>
      </div>
    </Draggable>
  );
};

export default Note;
