import React from 'react';
import Section from '../Section';
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

export default MainPage;
