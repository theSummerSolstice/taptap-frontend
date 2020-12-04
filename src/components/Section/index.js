import React from 'react';
import SectionItem from '../SectionItem';
import styles from './Section.module.scss';

// TODO: Section List를 업데이트 순서대로 정렬해서 최대 8개만 GET
// TODO: 실제 데이터 들어오면 key는 index -> id
// TODO: createdAt 실제 데이터로 변경, owner populate로 이름

const Section = ({ title, list }) => {
  return (
    <section className={styles.container}>
      <div className={styles.itemTitle}>
        <h3>{title}</h3>
        <button>more</button>
      </div>
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
    </section>
  );
};

export default Section;
