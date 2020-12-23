import React from 'react';
import Section from '../Section';
import PropTypes from 'prop-types';
import styles from './MainPage.module.scss';
import { sortByUpdatedDate } from '../../utils';

const MainPage = ({ user, routePage }) => {
  return (
    <div className={styles.container}>
      <Section
        title='My taptap'
        list={sortByUpdatedDate(user.myBoards)}
        routePage={routePage}
      />
      <Section
        title='Invited taptap'
        list={sortByUpdatedDate(user.authorizedBoards)}
        routePage={routePage}
      />
    </div>
  );
};

MainPage.propTypes = {
  user: PropTypes.shape({
    myBoards: PropTypes.arrayOf(PropTypes.object),
    authorizedBoards: PropTypes.arrayOf(PropTypes.object),
  }),
  routePage: PropTypes.func.isRequired,
};

export default MainPage;
