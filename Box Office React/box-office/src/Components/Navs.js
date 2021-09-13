import React from 'react';
import { useLocation } from 'react-router';
import { LinkStyled, NavList } from './Nav.styled';

const Links = [
  { to: '/', text: 'home' },
  { to: '/starred', text: 'starred' },
]; // array of links is created and then mapped to li , key prop is used to distinguish it uniquely
const Navs = () => {
  const Location = useLocation();
  return (
    <div>
      <NavList>
        {Links.map(item => (
          <li key={item.to}>
            <LinkStyled
              to={item.to}
              className={item.to === Location.pathname ? 'active' : ''}
            >
              {item.text}
            </LinkStyled>
          </li>
        ))}
      </NavList>
    </div>
  );
};

export default Navs;
