import { Link } from 'react-router-dom'; // used with router
import React from 'react';

const navs = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/best">got</Link>
        </li>
      </ul>
    </div>
  );
};

export default navs;
