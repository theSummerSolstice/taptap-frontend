import React from 'react';
import { RiArrowDropLeftLine } from 'react-icons/ri';
import Button from '../Button';
import PropTypes from 'prop-types';
import styles from './BoardAside.module.scss';
import AUTH from '../../constants/auth';
import { ICON_SIZE } from '../../constants/style';

const BoardAside = ({
  auth,
  board,
  leaveBoard,
  setIsCategorized,
  children,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        {auth === AUTH.EDIT && (
          <Button
            className='backButton'
            onClick={board.isCategorized ? setIsCategorized : leaveBoard}
            text='Back'
          >
            <RiArrowDropLeftLine size={ICON_SIZE.MEDIUM} />
          </Button>
        )}
      </div>
      <div className={styles.projectName}>
        <h3>Project name</h3>
        <h2>{board.name}</h2>
      </div>
      <div className={styles.participants}>
        <h3>Participants</h3>
        {board.users?.map((user) => (
          <div key={user.id} className={styles.userContainer}>
            <span>{user.email}</span>
            <span>{user.id === board.owner ? 'Admin' : 'Guest'}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

BoardAside.propTypes = {
  auth: PropTypes.string.isRequired,
  board: PropTypes.shape({
    isCategorized: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        email: PropTypes.string,
        id: PropTypes.string,
      })
    ),
  }),
  leaveBoard: PropTypes.func.isRequired,
  setIsCategorized: PropTypes.func.isRequired,
  children: PropTypes.element,
};

export default BoardAside;
