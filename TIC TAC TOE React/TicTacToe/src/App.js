import React, { useState } from 'react';
import Board from './component/Board';
import { calculateWinner } from './winner';
import './styles/root.scss';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // Array and update function
  const [isXNext, setIsXNext] = useState(true); // bool to know if we have to update X next

  const winner = calculateWinner(board);

  const Message = winner
    ? `Winner is ${winner}`
    : `Next player is ${isXNext ? 'X' : '0'}`;

  const handleSquareClick = position => {
    // dealing of the logics
    if (board[position] || winner) {
      // if board position already have some value we just returns
      return;
    }
    setBoard(pre => {
      return pre.map((sqaure, pos) => {
        if (pos === position) {
          return isXNext ? 'X' : '0';
        }
        return sqaure;
      });
    });
    setIsXNext(pre => !pre);
  };
  return (
    <div className="app">
      <h1>TicTacToe!</h1>
      <h2>{Message}</h2>
      <Board handleSquareClick={handleSquareClick} board={board} />
    </div>
  );
};

export default App;
