import React, { useState } from 'react';
import styles from './Note.module.scss';
import Draggable from 'react-draggable';
import Button from '../Button';
import { FaTrashAlt } from 'react-icons/fa';
import AUTH from '../../constants/auth';
import { ICON_SIZE } from '../../constants/style';

const Note = ({ note, user, auth, boardId, deleteNote, updateNotePosition }) => {
  const [isButtonShowing, setIsButtonShowing] = useState(false);
  const handleMouseEnter = () => setIsButtonShowing(true);
  const handleMouseLeave = () => setIsButtonShowing(false);
  const handleDelete = (event) => deleteNote({ boardId, noteId: note._id });

  const handleDragNote = (event) => {
    const position = {
      x: event.clientX - 230,
      y: event.clientY - 50,
    };

    updateNotePosition(boardId, note._id, position);
  };

  return (
    <Draggable
      defaultPosition={{ x: note.position.x, y: note.position.y }}
      position={{ x: note.position.x, y: note.position.y }}
      bounds='parent'
      onDrag={handleDragNote}
      disabled={auth !== AUTH.EDIT}
    >
      <div
        style={{ backgroundImage: note.color }}
        className={styles.note}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span>{note.contents}</span>
        {
          isButtonShowing && auth === AUTH.EDIT &&
          <Button className='circleButton' onClick={handleDelete}>
            <FaTrashAlt size={ICON_SIZE.XSMALL} />
          </Button>
        }
        <span className={styles.username}>{user.username}</span>
      </div>
    </Draggable>
  );
};

export default Note;
