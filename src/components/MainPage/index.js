import React from 'react';
import Section from '../Section';
import styles from './MainPage.module.scss';

const MainPage = ({ user, routePage }) => {
  //TODO: align list according to updated date
  return (
    <div className={styles.container}>
      <Section
        title='My taptap'
        list={user.myBoards.slice(0, 8)}
        routePage={routePage}
      />
      <Section
        title='Invited taptap'
        list={user.authorizedBoards.slice(0, 8)}
        routePage={routePage}
      />
    </div>
  );
};

export default MainPage;
