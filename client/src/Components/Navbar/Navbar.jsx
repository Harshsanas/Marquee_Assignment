import React from 'react'
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const NAVBAR = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background-color:purple;
  .navbar-text {
    cursor: pointer;
    color: white;
    font-size: 22px;
    text-decoration: none;
  }
`;
export default function Navbar() {
  return (
    <div>
      <NAVBAR>
        <div>
          <NavLink to="/add-company" className="navbar-text">
            Zauba Corp
          </NavLink>
        </div>
        <div>
          <NavLink to="/" className="navbar-text">
            Company List
          </NavLink>
        </div>
      </NAVBAR>
    </div>
  );
}
