import React from 'react';
import SectionItem from '../SectionItem';
import styles from './Section.module.scss';

const Section = ({ title, list, routePage }) => {
  const handleMoreButton = () => {
    title === 'My taptap'
      ? routePage('/my-taptap')
      : routePage('/invited-taptap');
  };

  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <h3>{title}</h3>
        <button onClick={handleMoreButton}>more</button>
      </div>
      <div className={styles.contents}>
        {
          !list.length
            ? <div>No taptap</div>
            : <div className={styles.itemList}>
                {
                  list.map((item, index) => (
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
        }
      </div>
    </section>
  );
};

export default Section;
