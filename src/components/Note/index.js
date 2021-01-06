import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { FaTrashAlt } from 'react-icons/fa';
import Button from '../Button';
import PropTypes from 'prop-types';
import styles from './Note.module.scss';
import AUTH from '../../constants/auth';
import { ICON_SIZE } from '../../constants/style';

const Note = ({
  boardId,
  note,
  username,
  auth,
  deleteNote,
  updateNotePosition,
}) => {
  const [isButtonShowing, setIsButtonShowing] = useState(false);
  const handleMouseEnter = () => setIsButtonShowing(true);
  const handleMouseLeave = () => setIsButtonShowing(false);
  const handleDeleteButtonClick = () => deleteNote({ boardId, noteId: note._id });
  const handleDragNote = (event) => {
    const position = {
      x: event.clientX - 350,
      y: event.clientY - 70,
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
        {isButtonShowing && auth === AUTH.EDIT && (
          <Button className='circleButton' onClick={handleDeleteButtonClick}>
            <FaTrashAlt size={ICON_SIZE.SMALL} />
          </Button>
        )}
        <span className={styles.username}>{username}</span>
      </div>
    </Draggable>
  );
};

Note.propTypes = {
  boardId: PropTypes.string.isRequired,
  note: PropTypes.shape({
    _id: PropTypes.string,
    color: PropTypes.string,
    contents: PropTypes.string,
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  }),
  username: PropTypes.string.isRequired,
  auth: PropTypes.string.isRequired,
  deleteNote: PropTypes.func.isRequired,
  updateNotePosition: PropTypes.func.isRequired,
};

export default Note;
