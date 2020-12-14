import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../modules/user/slice';
import { boardSelector, boardAction } from '../modules/board/slice';
import BoardCanvas from '../components/BoardCanvas';
import { boardSocket } from '../modules/socket/saga';
import CategorizeCanvas from '../components/CategorizeCanvas';
import { notesSelector, notesAction } from '../modules/currentNotes/slice';
import { generateLayout } from '../utils/index';

const {
  updateBoardSettings,
} = boardAction;

const {
  initializeCategory,
  addCategory,
  deleteCategory,
  updateLayout,
  updateNotePosition,
} = notesAction;

const CanvasContainer = () => {
  const { user, auth } = useSelector(userSelector.all);
  const { board } = useSelector(boardSelector.all);
  const { notes, categories, layout } = useSelector(notesSelector.all);
  const dispatch = useDispatch();

  const addNote = (note) => boardSocket.addNote(note);
  const deleteNote = (noteId) => boardSocket.deleteNote(noteId);
  const handleNotePosition = (boardId, noteId, position) => {
    dispatch(updateNotePosition({ noteId, position }));
    boardSocket.updateNotePosition({ boardId, noteId, position });
  };

  const handleCategorize = () => {
    dispatch(updateBoardSettings(true));
    boardSocket.startCategorize({ boardId: board._id });
  };

  const handleAddCategory = (categoryName) => {
    if (categories.length + 1 > 7) return;
    const newLayout = generateLayout(categories.length + 1);
    const combinedLayout = newLayout.concat(layout);
    dispatch(addCategory({ categoryName, layout: combinedLayout }));
  };

  const handleDeleteCategory = (index) => {
    if (categories.length - 1 < 1) return;
    const newLayout = generateLayout(categories.length - 1);
    const combinedLayout = newLayout.concat(layout);
    dispatch(deleteCategory({ index, layout: combinedLayout }));
  };

  const handleUpdateLayout = (layout) => {
    dispatch(updateLayout(layout));
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
              handleAddCategory={handleAddCategory}
              handleDeleteCategory={handleDeleteCategory}
              handleUpdateLayout={handleUpdateLayout}
            />
          : <BoardCanvas
              boardId={board._id}
              notes={notes}
              user={user}
              auth={auth}
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
