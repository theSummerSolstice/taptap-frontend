import React, { useState, useRef } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { FaPlus } from 'react-icons/fa';
import Button from '../Button';
import PhaseDescription from '../PhaseDescription';
import PropTypes from 'prop-types';
import styles from './CategorizeCanvas.module.scss';
import { ICON_SIZE } from '../../constants/style';

const ResponsiveGridLayout = WidthProvider(Responsive);

const CategorizeCanvas = ({
  notes,
  categories,
  columns,
  layout,
  addCategory,
  deleteCategory,
  updateLayout,
 }) => {
  const [categoryName, setCategoryName] = useState('');
  const boardRef = useRef(null);
  const noteRef = useRef([]);

  const handleCategoryNameChange = ({ target }) => {
    setCategoryName(target.value);
  };

  const handleCategoryAddButtonClick = () => {
    addCategory(categoryName);
    setCategoryName('');
  };

  const handleCategoryDeleteButtonClick = ({ target }) => {
    deleteCategory(target.value);
    setCategoryName('');
  };

  return (
    <div id='canvas' ref={boardRef} className={styles.container}>
      <PhaseDescription
        className={styles.description}
        description='Make your thoughts organized.'
        style={{ visibility: 'hidden' }}
      />
      <div className={styles.inputContainer} data-html2canvas-ignore={true}>
        <input
          type='text'
          placeholder='Enter category'
          value={categoryName}
          onChange={handleCategoryNameChange}
        />
        <Button className='circleButton' onClick={handleCategoryAddButtonClick}>
          <FaPlus size={ICON_SIZE.XSMALL} />
        </Button>
      </div>
      <ResponsiveGridLayout
        className={styles.layout}
        isDraggable={true}
        isBounded={true}
        rowHeight={180}
        containerPadding={[0, 50]}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: columns, md: columns, sm: columns, xs: columns, xxs: columns}}
        layouts={{lg: layout, md: layout, sm: layout, xs: layout, xxs: layout}}
        onDragStop={(layout) => updateLayout(layout)}
      >
        {
          categories.map((category, index) => (
            <div className={styles.category} key={index}>
              <div className={styles.name}>
                {category}
              </div>
              {
                index > 0 &&
                <Button className='moreButton' value={index} text='Delete' onClick={handleCategoryDeleteButtonClick} />
              }
            </div>
          ))
        }
        {
          notes.map((note, index) => (
            <div
              className={styles.note}
              key={note._id}
              ref={(el) => noteRef.current[index] = el}
            >
              <div
                className={styles.wrapper}
                style={{ backgroundImage: note.color }}
              >
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

CategorizeCanvas.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    contents: PropTypes.string.isRequired,
  })),
  categories: PropTypes.arrayOf(PropTypes.string),
  columns: PropTypes.number.isRequired,
  layout: PropTypes.arrayOf(PropTypes.object),
  addCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  updateLayout: PropTypes.func.isRequired,
};

export default CategorizeCanvas;
