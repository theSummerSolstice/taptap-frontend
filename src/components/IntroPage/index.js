import React from 'react';
import styles from './IntroPage.module.scss';
import Button from '../Button';
import { FcGoogle } from 'react-icons/fc';
import { ICON_SIZE } from '../../constants/style';

const IntroPage = ({ onLogin }) => {
  return (
    <div className={styles.container}>
      <div className={styles.catchphrase}>
        <h2>One thought,</h2>
        <h2>on one sticky note</h2>
      </div>
      <div className={styles.subText}>
        <h4>organize your thoughts using sticky note.</h4>
        <h4>you only need to “tap-tap”.</h4>
      </div>
      <Button className='defaultButton' onClick={onLogin} text='Continue with Google'>
        <FcGoogle size={ICON_SIZE.LARGE} />
      </Button>
    </div>
  );
};

export default IntroPage;
