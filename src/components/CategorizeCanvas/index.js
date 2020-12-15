import React, { useState, useRef } from 'react';
import styles from './CategorizeCanvas.module.scss';
import PhaseDescription from '../PhaseDescription';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Button from '../Button';
import { FaPlus } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const ResponsiveGridLayout = WidthProvider(Responsive);

const CategorizeCanvas = ({
  notes,
  categories,
  columns,
  layout,
  boardRef,
  handleAddCategory,
  handleDeleteCategory,
  handleUpdateLayout,
  saveCurrentCategories,
 }) => {
  const [categoryName, setCategoryName] = useState('');
  const noteRef = useRef([]);
  const { board_id: boardId } = useParams();

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

  const handleSaveClick = () => {
    const hash = {
      [0]: 'unsorted',
    };

    const translateXArray = noteRef.current.map((note, index) => {
      const style = window.getComputedStyle(note);
      const matrix = style.transform;
      const translateX = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')[4];

      return {
        ...notes[index],
        category: translateX,
      };
    });

    const deduplicatedCategories = Array.from(
      new Set(translateXArray.map((item) => item.category))
    ).sort();

    if (deduplicatedCategories[0] !== '0') {
      deduplicatedCategories.unshift('0');
    }

    deduplicatedCategories.forEach((item, index) => {
      hash[deduplicatedCategories[index]] = categories[index];
    });

    const categorizedNotes = translateXArray.map((item) => {
      const key = item.category;
      return {
        ...item,
        category: hash[key],
      };
    });

    saveCurrentCategories({ boardId, notes: categorizedNotes, categories, layout });
  };

  return (
    <div id='canvas' ref={boardRef} className={styles.container}>
      <PhaseDescription
        className={styles.description}
        description='Make your thoughts organized.'
        buttonText='Save'
        onClick={handleSaveClick}
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
          notes.map((note, index) => (
            <div className={styles.note} key={note._id} ref={(el) => noteRef.current[index] = el}>
              <div className={styles.wrapper} style={{ backgroundImage: note.color }}>
                <span>{note.contents}</span>
              </div>
            </div>
          ))
        }
      </ResponsiveGridLayout>
      <a id='download' style={{ display: 'none' }}></a>
    </div>
  );
};

export default CategorizeCanvas;
