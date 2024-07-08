import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #333;
  color: #fff;
  padding: 15px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Nav>
        <NavLink
          to="/"
          style={{ color: 'white', marginRight: '10px' }}
          activeClassName="active"
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          style={{ color: 'white' }}
          activeClassName="active"
        >
          Movies
        </NavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;