import React from 'react';
import { useParams } from 'react-router-dom';

const Board = () => {
  const { board_id } = useParams();

  return (
    <div>
      Board page
    </div>
  );
};

export default Board;
