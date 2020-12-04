import React from 'react';
import SectionItem from '../SectionItem';
import styles from './ListPage.module.scss';

const ListPage = ({ title, list }) => {
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <div className={styles.itemList}>
        {
          list.map((item, index) => (
            <SectionItem
              key={index}
              imageSrc={item.imageSrc}
              name={item.name}
              createdBy={item.owner}
              createdAt='2020.12.25'
            />
          ))
        }
      </div>
    </div>
  );
};

export default ListPage;
