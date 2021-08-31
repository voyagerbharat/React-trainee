import React from 'react';

const GameHistory = ({ history, moveTo, currentMove }) => {
  return (
    <ul>
      {history.map((_, move) => {
        return (
          <li key={move}>
            <button
              style={{
                fontWeight: move === currentMove ? 'bold' : 'normal',
              }}
              type="button"
              onClick={() => {
                moveTo(move);
              }}
            >
              {move === 0 ? `Go to Game Start` : `Go to move #${move}`}
            </button>
          </li> /* we must have key for each li */
        );
      })}
    </ul>
  );
};

export default GameHistory;
