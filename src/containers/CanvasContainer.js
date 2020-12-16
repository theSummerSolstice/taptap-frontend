import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../modules/user/slice';
import { boardSelector, updateBoardSettings } from '../modules/board/slice';
import BoardCanvas from '../components/BoardCanvas';
import { boardSocket } from '../modules/socket/saga';
import CategorizeCanvas from '../components/CategorizeCanvas';
import {
  notesSelector,
  initializeCategory,
  addCategory,
  deleteCategory,
  updateLayout,
  updateNotePosition,
  updateNoteCategory
 } from '../modules/currentNotes/slice';
import { generateLayout } from '../utils/index';

const CanvasContainer = () => {
  const { user, auth } = useSelector(userSelector.all);
  const { board } = useSelector(boardSelector.all);
  const { notes, categories, layout } = useSelector(notesSelector.all);
  const dispatch = useDispatch();
  const boardId = board._id;
  const boardRef = useRef(null);

  const addNote = (note) => boardSocket.addNote(note);
  const deleteNote = (noteId) => boardSocket.deleteNote(noteId);
  const handleNotePosition = (boardId, noteId, position) => {
    dispatch(updateNotePosition({ noteId, position }));
    boardSocket.updateNotePosition({ boardId, noteId, position });
  };

  const handleCategorize = () => {
    dispatch(updateBoardSettings(true));
    boardSocket.startCategorize({ boardId });
  };

  const handleAddCategory = (categoryName) => {
    if (categories.length + 1 > 7) return;
    const newLayout = generateLayout(categories.length + 1);
    const combinedLayout = newLayout.concat(layout);
    boardSocket.addCategory({ boardId, categoryName, layout: combinedLayout });
    dispatch(addCategory({ categoryName, layout: combinedLayout }));
  };

  const handleDeleteCategory = (index) => {
    if (categories.length - 1 < 1) return;
    const newLayout = generateLayout(categories.length - 1);
    const combinedLayout = newLayout.concat(layout);
    boardSocket.deleteCategory({ boardId, index, layout: combinedLayout });
    dispatch(deleteCategory({ index, layout: combinedLayout }));
  };

  const handleUpdateLayout = (layout) => {
    boardSocket.updateLayout({ boardId, layout });
    dispatch(updateLayout(layout));
  };

  // TODO: Save categories later
  const saveCurrentCategories = ({ boardId, categorizedNotes }) => {
    dispatch(updateNoteCategory({ boardId, currentNotes: categorizedNotes }));
  };

  useEffect(() => {
    const initialCategories = Array.from(new Set(notes.map((note) => {
      return note.category;
    })));

    dispatch(initializeCategory({
      categories: initialCategories,
      layout: generateLayout(initialCategories.length),
    }));
  }, [notes]);

  return (
    <>
      {
        board.isCategorized
          ? <CategorizeCanvas
              notes={notes}
              categories={categories}
              columns={categories.length}
              layout={layout}
              boardRef={boardRef}
              handleAddCategory={handleAddCategory}
              handleDeleteCategory={handleDeleteCategory}
              handleUpdateLayout={handleUpdateLayout}
              saveCurrentCategories={saveCurrentCategories}
            />
          : <BoardCanvas
              boardId={board._id}
              notes={notes}
              user={user}
              auth={auth}
              boardRef={boardRef}
              addNote={addNote}
              deleteNote={deleteNote}
              updateNotePosition={handleNotePosition}
              handleCategorize={handleCategorize}
            />
      }
    </>

  );
};

export default CanvasContainer;
