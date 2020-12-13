import React from 'react';
import SectionItem from '../SectionItem';
import styles from './Section.module.scss';
import Button from '../Button';

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
        <Button className='moreButton' onClick={handleMoreButton} text='more' />
      </div>
      <div className={styles.contents}>
        {
          !list.length
            ? <div className={styles.noItem}>
                😮 No taptap
              </div>
            : <div className={styles.itemList}>
                {
                  list.map((item) => (
                    <SectionItem
                      id={item._id}
                      key={item._id}
                      src={item.imageSrc}
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
