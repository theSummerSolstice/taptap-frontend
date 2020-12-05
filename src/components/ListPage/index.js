import React from 'react';
import SectionItem from '../SectionItem';
import styles from './ListPage.module.scss';

const ListPage = ({ title, list, routePage }) => {
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <div className={styles.itemList}>
        {
          list.map((item) => (
            <SectionItem
              id={item._id}
              key={item._id}
              imageSrc={item.imageSrc}
              name={item.name}
              lastUpdate={item.updatedAt}
              routePage={routePage}
            />
          ))
        }
      </div>
    </div>
  );
};

export default ListPage;
