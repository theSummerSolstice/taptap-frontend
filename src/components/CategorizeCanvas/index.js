import React, { useState, useEffect } from 'react';
import styles from './CategorizeCanvas.module.scss';
import PhaseDescription from '../PhaseDescription';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Button from '../Button';
import { FaPlus } from 'react-icons/fa';

const ResponsiveGridLayout = WidthProvider(Responsive);

const CategorizeCanvas = ({
  notes,
  categories,
  columns,
  layout,
  handleAddCategory,
  handleDeleteCategory,
  handleUpdateLayout,
 }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleInputChange = ({ target }) => {
    setCategoryName(target.value);
  };

  const handleAddClick = () => {
    handleAddCategory(categoryName);
    setCategoryName('');
  };

  const handleDeleteClick = ({ target }) => {
    handleDeleteCategory(target.value);
    setCategoryName('');
  };

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
        <Button className='circleButton' onClick={handleAddClick}>
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
        onDragStop={(layout) => handleUpdateLayout(layout)}
      >
        {
          categories.map((category, index) => (
            <div className={styles.category} key={index}>
              <div className={styles.name}>{category}</div>
              {
                index > 0 &&
                <Button className='moreButton' value={index} text='Delete' onClick={handleDeleteClick} />
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
