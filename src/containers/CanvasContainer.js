import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../modules/user/slice';
import { boardSelector, setIsBoardCategorized } from '../modules/board/slice';
import {
  notesSelector,
  initializeCategory,
  addCategory,
  deleteCategory,
  updateLayout,
  updateNotePosition,
} from '../modules/currentNotes/slice';
import { boardSocket } from '../modules/socket/saga';

import BoardCanvas from '../components/BoardCanvas';
import CategorizeCanvas from '../components/CategorizeCanvas';
import { generateLayout } from '../utils/index';

const CanvasContainer = () => {
  const { user, auth } = useSelector(userSelector.all);
  const { board } = useSelector(boardSelector.all);
  const { notes, categories, layout } = useSelector(notesSelector.all);
  const dispatch = useDispatch();
  const { board_id: boardId } = useParams();

  const addNote = (note) => boardSocket.addNote(note);
  const deleteNote = (noteId) => boardSocket.deleteNote(noteId);
  const handleNotePosition = (boardId, noteId, position) => {
    dispatch(updateNotePosition({ noteId, position }));
    boardSocket.updateNotePosition({ boardId, noteId, position });
  };

  const handleStartCategorize = () => {
    dispatch(setIsBoardCategorized(true));
    boardSocket.startCategorize({ boardId });
  };

  const handleAddCategory = (categoryName) => {
    if (categories.length + 1 > 7) return;
    const categoryLayout = generateLayout(categories.length + 1);
    const newLayout = categoryLayout.concat(layout);

    boardSocket.addCategory({ boardId, categoryName, layout: newLayout });
    dispatch(addCategory({ categoryName, layout: newLayout }));
  };

  const handleDeleteCategory = (index) => {
    if (categories.length - 1 < 1) return;
    const categoryLayout = generateLayout(categories.length - 1);
    const newLayout = categoryLayout.concat(layout);

    boardSocket.deleteCategory({ boardId, index, layout: newLayout });
    dispatch(deleteCategory({ index, layout: newLayout }));
  };

  const handleUpdateLayout = (layout) => {
    boardSocket.updateLayout({ boardId, layout });
    dispatch(updateLayout(layout));
  };

  useEffect(() => {
    const initialCategories = [...new Set(notes.map((note) => note.category))];

    dispatch(
      initializeCategory({
        categories: initialCategories,
        layout: generateLayout(initialCategories.length),
      })
    );
  }, [notes]);

  return (
    <>
      {board.isCategorized ? (
        <CategorizeCanvas
          notes={notes}
          categories={categories}
          columns={categories.length}
          layout={layout}
          addCategory={handleAddCategory}
          deleteCategory={handleDeleteCategory}
          updateLayout={handleUpdateLayout}
        />
      ) : (
        <BoardCanvas
          boardId={boardId}
          notes={notes}
          username={user.username}
          auth={auth}
          addNote={addNote}
          deleteNote={deleteNote}
          updateNotePosition={handleNotePosition}
          startCategorize={handleStartCategorize}
        />
      )}
    </>
  );
};

export default CanvasContainer;
