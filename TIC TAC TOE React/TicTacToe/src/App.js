import React, { useState } from 'react';
import Board from './component/Board';
import { calculateWinner } from './winner';
import GameHistory from './component/GameHistory';
import StatusMessage from './component/StatusMessage';
import './styles/root.scss';

const App = () => {
  const NewGame = [
    {
      board: Array(9).fill(null),
      isXNext: true,
    },
  ];
  const [history, setHistory] = useState(NewGame); // history is a object which have board positions and isXnext

  const [currentMove, setCurrentMove] = useState(0); // current move number , we increment currentMove by 1 in each render

  const current = history[currentMove]; // current var is used to get current object from history which have arr of position and is next
  const { winner, winningSquare } = calculateWinner(current.board); // we access board from object using current.board

  // eslint-disable-next-line no-console
  console.log('history:', history);

  const handleSquareClick = position => {
    // dealing of the logics
    if (current.board[position] || winner) {
      // if board position already have some value we just returns
      return;
    }
    setHistory(pre => {
      const last = pre[pre.length - 1]; // no fucking clue
      const newBoard = last.board.map((sqaure, pos) => {
        // board elements (x or 0) right now
        if (pos === position) {
          return last.isXNext ? 'X' : '0';
        }
        return sqaure;
      });
      return pre.concat({ board: newBoard, isXNext: !last.isXNext }); // concat - adding one more object in history array
    });
    setCurrentMove(pre => pre + 1); // incrementing move number
  };
  const moveTo = move => {
    setCurrentMove(move);
  };
  const ResetGame = () => {
    setHistory(NewGame);
    setCurrentMove(0);
  };
  return (
    <div className="app">
      <h1>TicTacToe!</h1>
      <StatusMessage winner={winner} current={current} />
      <Board
        handleSquareClick={handleSquareClick}
        board={current.board}
        winningSquare={winningSquare}
      />
      <button type="button" onClick={ResetGame}>
        Reset Game
      </button>
      <GameHistory
        history={history}
        moveTo={moveTo}
        currentMove={currentMove}
      />
    </div>
  );
};

export default App;
