import React from 'react';
import SectionItem from '../SectionItem';
import styles from './ListPage.module.scss';

const ListPage = ({
  userId,
  title,
  list,
  routePage,
  deleteBoard,
}) => {
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      {
        !list.length
          ? <div className={styles.noItem}>
              😮 No taptap
            </div>
          : <div className={styles.itemList}>
              {
                list.map((item) => (
                  <SectionItem
                    boardId={item._id}
                    key={item._id}
                    src={item.imageSrc}
                    name={item.name}
                    lastUpdate={item.updatedAt}
                    routePage={routePage}
                    canDelete={title === 'My taptap'}
                    deleteBoard={deleteBoard}
                    userId={userId}
                  />
                ))
              }
            </div>
      }
    </div>
  );
};

export default ListPage;
