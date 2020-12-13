import React, { useState, useEffect } from 'react';
import styles from './CategorizeCanvas.module.scss';
import PhaseDescription from '../PhaseDescription';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Button from '../Button';
import { FaPlus } from 'react-icons/fa';

const ResponsiveGridLayout = WidthProvider(Responsive);

const generateLayout = (number) => {
  const temp = Array(number).fill({});
  return temp.map((item, index) => {
    return {
      i: String(index),
      x: index,
      y: 0,
      w: 1,
      h: 0.3,
      static: true,
      minW: 1,
    };
  });
};

const CategorizeCanvas = ({ notes }) => {
  const initialCategories = Array.from(new Set(notes.map((note) => {
    return note.category;
  })));
  const categoryLength = initialCategories.length;
  const [categoryName, setCategoryName] = useState({});
  const [categories, setCategories] = useState(initialCategories);
  const [columns, setColumns] = useState(categoryLength);
  const [layout, setLayout] = useState(generateLayout(columns));

  const handleAdd = () => {
    setColumns((prev) => prev + 1 > 7 ? prev : prev + 1);
    setCategories((prev) => {
      const added = [ ...prev, '' ];
      return added.length > 7 ? prev : added;
    });
  };

  const handleDelete = ({ target }) => {
    const { value } = target;
    setColumns((prev) => prev - 1 < 1 ? prev : prev - 1);
    setCategories(() => {
      const filtered = categories.filter((item, index) => {
        return value !== String(index);
      });

      return filtered.length < 1 ? categories : filtered;
    });
    setCategoryName({
      ...categoryName,
      [`category${value}`]: '',
    });
  };

  const handleCategoryChange = ({ target }) => {
    const { value, name } = target;

    setCategoryName({
      ...categoryName,
      [name]: value,
    });
  };

  useEffect(() => {
    const newLayout = generateLayout(columns);
    setLayout((prev) => newLayout.concat(prev));
  }, [columns]);

  return (
    <div className={styles.container}>
      <PhaseDescription
        className={styles.description}
        description='Make your thoughts organized.'
        buttonText='Save'
        onClick={() => console.log('save')}
      />
      <Button className='circleButton' onClick={handleAdd}>
        <FaPlus size='1em' />
      </Button>
      <ResponsiveGridLayout
        className={styles.layout}
        isDraggable={true}
        isBounded={true}
        rowHeight={120}
        container={[50, 0]}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: columns, md: columns, sm: columns, xs: columns, xxs: columns}}
        layouts={{lg: layout, md: layout, sm: layout, xs: layout, xxs: layout}}
        onLayoutChange={(layout) => setLayout(layout)}
      >
        {
          categories.map((category, index) => (
            <div className={styles.category} key={index}>
              <input
                type='text'
                placeholder='Enter category'
                name={`category${index}`}
                value={categoryName[`category${index}`]}
                onChange={handleCategoryChange}
              />
              {
                index > 0 && index === categories.length - 1 &&
                <Button className='moreButton' value={index} text='Delete' onClick={handleDelete} />
              }
            </div>
          ))
        }
        {
          notes.map((note) => (
            <div className={styles.note} key={note._id}>
              <div className={styles.wrapper} style={{ backgroundImage: note.color }}>
                <span>{note.contents}</span>
              </div>
            </div>
          ))
        }
      </ResponsiveGridLayout>
    </div>
  );
};

export default CategorizeCanvas;

const handleClick = (event) => {
  const style = window.getComputedStyle(event.target);
  const matrix = style.transform;
  const matrixValue = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')[4];

  console.log(matrixValue);
};
