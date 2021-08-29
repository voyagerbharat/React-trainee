import React from 'react';

const Square = ({ value, boomClick }) => {
  return (
    <button className="square" type="button" onClick={boomClick}>
      {value}
    </button>
  );
};

export default Square;
