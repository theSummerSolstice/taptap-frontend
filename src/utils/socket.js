import io from 'socket.io-client';
const socket = io(process.env.REACT_APP_SERVER_URI);

const boardSocket = {
  startBoard(data) {
    socket.emit('startBoard', data);
  }
};

export {
  boardSocket,
};
