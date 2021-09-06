import { Link } from 'react-router-dom'; // used with router
import React from 'react';

const navs = () => {
  const Links = [
    { to: '/', text: 'home' },
    { to: '/starred', text: 'starred' },
  ]; // array of links is created and then mapped to li , key prop is used to distinguish it uniquely
  return (
    <div>
      <ul>
        {Links.map(item => (
          <li key={item.to}>
            <Link to={item.to}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default navs;
