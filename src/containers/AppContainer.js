import React, { useEffect } from 'react';
import { Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userAction, userSelector } from '../modules/user/slice';
import { boardAction, boardSelector } from '../modules/board/slice';
import { notesAction } from '../modules/currentNotes/slice';

import BoardContainer from './BoardContainer';
import Header from '../components/Header';
import IntroPage from '../components/IntroPage';
import MainPage from '../components/MainPage';
import ListPage from '../components/ListPage';
import NewBoardForm from '../components/NewBoardForm';
import InviteForm from '../components/InviteForm';
import api from '../utils/api';

const {
  initUser,
  logoutUser,
  deleteMyBoards,
} = userAction;

const {
  createBoard,
  updateBoard,
  leaveBoard,
  storeCurrentNotes,
  deleteSnapshots,
} = boardAction;

const {
  getNotes,
} = notesAction;

const AppContainer = () => {
  const { user } = useSelector(userSelector.all);
  const { board } = useSelector(boardSelector.all);
  const notes = useSelector((state) => state.NOTES);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const routePage = (route) => history.push(route);
  const handleLogin = () => dispatch(initUser({ token: null }));
  const handleLogout = () => {
    dispatch(logoutUser());
    routePage('/');
  };

  const handleLeaveBoard = async () => {
    if (!board) return routePage('/');
    dispatch(leaveBoard({ boardId: board._id, userId: user._id }));
    routePage('/');
  };

  const createNewBoard = (boardInfo) => dispatch(createBoard(boardInfo));
  const deleteBoard = (boardId) => dispatch(deleteMyBoards(boardId));
  const updateBoardItem = (data) => dispatch(updateBoard(data));
  const sendInviteMail = async (email, boardId) => {
    // TODO: Try - catch
    await api.post(`/board/${boardId}/invite`, { email });
  };
  const showPreviousNotes = (noteList) => dispatch(getNotes(noteList));
  const storeCurrentNoteList = (notes) => dispatch(storeCurrentNotes(notes));
  const deleteLaterSnapshots = (boardId, index) => dispatch(deleteSnapshots(boardId, index));

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return routePage('/');
    }

    const currentLocation = location.pathname;
    dispatch(initUser());
    history.push(currentLocation);
  }, []);

  return (
    <Header
      user={user}
      board={board}
      notes={notes}
      onLogin={handleLogin}
      onLogout={handleLogout}
      routePage={routePage}
      handleLeaveBoard={handleLeaveBoard}
      updateBoard={updateBoardItem}
      showPreviousNotes={showPreviousNotes}
      storeCurrentNoteList={storeCurrentNoteList}
      deleteLaterSnapshots={deleteLaterSnapshots}
    >
      <Switch>
        <Route exact path='/'>
          {
            !user
              ? <IntroPage onLogin={handleLogin} />
              : <MainPage user={user} routePage={routePage} />
          }
        </Route>
        <Route path='/my-taptap'>
          <ListPage
            userId={user?._id}
            title='My taptap'
            list={user?.myBoards}
            routePage={routePage}
            deleteBoard={deleteBoard}
          />
        </Route>
        <Route path='/invited-taptap'>
          <ListPage
            title='Invited taptap'
            list={user?.authorizedBoards}
            routePage={routePage}
          />
        </Route>
        <Route path='/board/new'>
          <NewBoardForm
            user={user}
            routePage={routePage}
            createNewBoard={createNewBoard}
          />
        </Route>
        <Route path='/board/:board_id/invite'>
          <InviteForm
            user={user}
            routePage={routePage}
            updateBoard={updateBoardItem}
            sendInviteMail={sendInviteMail}
          />
        </Route>
        <Route path='/board/:board_id'>
          <BoardContainer
            handleLeaveBoard={handleLeaveBoard}
          />
        </Route>
        <Redirect to='/'/>
      </Switch>
    </Header>
  );
};

export default AppContainer;
