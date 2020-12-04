import React from 'react';
import styles from './IntroPage.module.scss';

const IntroPage = ({ onLogin }) => {
  return (
    <div className={styles.container}>
      <h2>One thought,</h2>
      <h2>on one sticky note</h2>
      <h4>
        organize your thoughts using sticky note.
        you only need to “tap-tap”.
      </h4>
      <button onClick={onLogin}>Continue with Google</button>
    </div>
  );
};

export default IntroPage;
