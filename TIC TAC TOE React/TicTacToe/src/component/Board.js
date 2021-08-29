import React, { useState } from 'react';
import Square from './Square';

const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // Array and update function

  const [isXNext, setIsXNext] = useState(true); // bool to know if we have to update X next

  const handleSquareClick = position => {
    // dealing of the logics
    if (board[position]) {
      // if board position already have some value we just returns
      return;
    }
    setBoard(prev => {
      return prev.map((sqaure, pos) => {
        if (pos === position) {
          return isXNext ? 'X' : '0';
        }
        return sqaure;
      });
    });
    setIsXNext(prev => !prev);
  };
  const renderSquare = position => {
    return (
      <Square
        value={board[position]} // board[position] stores the state value
        boomClick={() => handleSquareClick(position)} // boomclick is function that is exectued when button is clicked
      />
    );
  };

  return (
    <div className="board">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;
