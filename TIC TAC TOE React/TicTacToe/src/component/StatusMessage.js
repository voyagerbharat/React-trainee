import React from 'react';

const StatusMessage = ({ winner, current }) => {
  const noMovesLeft = current.board.every(el => el !== null);
  return (
    <h2>
      {winner && `winner is ${winner}`}
      {!winner &&
        !noMovesLeft &&
        `Next player is ${current.isXNext ? 'X' : '0'}`}
      {!winner && noMovesLeft && `X and 0 tied`}
    </h2>
  ); // condition rendering simply by {} and then putting condition followed by && to render what we want
};

export default StatusMessage;
