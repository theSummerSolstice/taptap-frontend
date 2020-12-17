import React from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.container}>
      <PacmanLoader size={70} color={'#3843E9'} />
    </div>
  );
};

export default Loader;
