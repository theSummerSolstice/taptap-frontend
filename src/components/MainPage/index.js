import React from 'react';
import Section from '../Section';
import styles from './MainPage.module.scss';

const MainPage = ({ user }) => {
  return (
    <div className={styles.container}>
      <Section title='My taptap' list={user.myBoards} />
      <Section title='Invited taptap' list={user.authorizedBoards} />
    </div>
  );
};

export default MainPage;
