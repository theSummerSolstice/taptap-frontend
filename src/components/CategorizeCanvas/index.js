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
  const [categoryName, setCategoryName] = useState('');
  //TODO: Redux로 올려야한다...!
  const [categories, setCategories] = useState(initialCategories);
  const [columns, setColumns] = useState(categoryLength);
  const [layout, setLayout] = useState(generateLayout(columns));

  const handleInputChange = ({ target }) => {
    setCategoryName(target.value);
  };

  const handleAddCategory = () => {
    setColumns((prev) => prev + 1 > 7 ? prev : prev + 1);
    setCategories((prev) => {
      const addedList = [ ...prev, categoryName ];
      return addedList.length > 7 ? prev : addedList;
    });
    setCategoryName('');
  };

  const handleDeleteCategory = ({ target }) => {
    const { value } = target;
    setColumns((prev) => prev - 1 < 1 ? prev : prev - 1);
    setCategories(() => {
      const deletedList = categories.filter((item, index) => value !== String(index));
      return deletedList.length < 1 ? categories : deletedList;
    });
    setCategoryName('');
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
      <div className={styles.inputContainer}>
        <input
          type='text'
          placeholder='Enter category'
          value={categoryName}
          onChange={handleInputChange}
        />
        <Button className='circleButton' onClick={handleAddCategory}>
          <FaPlus size='1em' />
        </Button>
      </div>

      <ResponsiveGridLayout
        className={styles.layout}
        isDraggable={true}
        isBounded={true}
        rowHeight={120}
        containerPadding={[0, 50]}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: columns, md: columns, sm: columns, xs: columns, xxs: columns}}
        layouts={{lg: layout, md: layout, sm: layout, xs: layout, xxs: layout}}
        onLayoutChange={(layout) => setLayout(layout)}
      >
        {
          categories.map((category, index) => (
            <div className={styles.category} key={index}>
              <div className={styles.name}>{category}</div>
              {
                index > 0 &&
                <Button className='moreButton' value={index} text='Delete' onClick={handleDeleteCategory} />
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
