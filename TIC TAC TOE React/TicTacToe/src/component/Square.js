import React from 'react';

const Square = ({ value, boomClick, isWinningSquare }) => {
  return (
    <button
      className="square"
      type="button"
      onClick={boomClick}
      style={{ fontWeight: isWinningSquare ? 'bold' : 'normal' }}
    >
      {value}
    </button>
  );
};

export default Square;
