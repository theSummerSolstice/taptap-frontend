import React from 'react';
import SectionItem from '../SectionItem';
import Button from '../Button';
import PropTypes from 'prop-types';
import styles from './Section.module.scss';
import ROUTE from '../../constants/route';

const Section = ({ title, list, routePage }) => {
  const handleMoreButtonClick = () => {
    title === 'My taptap'
      ? routePage(ROUTE.MY_TAPTAP)
      : routePage(ROUTE.INVITED_TAPTAP);
  };

  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <h3>{title}</h3>
        <Button
          className='moreButton'
          onClick={handleMoreButtonClick}
          text='more'
        />
      </div>
      <div className={styles.contents}>
        {!list.length ? (
          <div className={styles.noItem}>😮 No taptap</div>
        ) : (
          <div className={styles.itemList}>
            {list.map((item) => (
              <SectionItem
                boardId={item._id}
                key={item._id}
                src={item.imageSrc}
                name={item.name}
                lastUpdate={item.updatedAt}
                routePage={routePage}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      imageSrc: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    })
  ),
  routePage: PropTypes.func.isRequired,
};

export default Section;
