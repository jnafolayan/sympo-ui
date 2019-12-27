import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";

export default function Navbar({ loggedIn }) {
  return (
    <Wrapper>
      <div className="container">
        <Brand>
          <Link to="/">Sympo</Link>
        </Brand>
        <Menu>
          <Link to="/create-poll">Start a poll</Link>
          { loggedIn ? 
            <Link to="/sign-out">Sign out</Link> :
            <Link to="/sign-in">Sign in</Link>
          }
        </Menu>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  > .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Brand = styled.span`
  a {
    text-decoration: none;
    color: hsl(150, 90%, 40%);
    font-weight: normal;
    font-size: 1.4rem;
    font-family: Montserrat, sans-serif;
  }
`;

const Menu = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: auto auto;

  a {
    text-decoration: none;
    color: #999;
    padding: 16px 0;
    transition: all 0.3s;
    display: block;
    position: relative;

    &:hover {
      color: #444;
      
      &:after {
        position: absolute;
        display: block;
        content: "";
        width: 100%;
        height: 2px;
        background: hsl(150, 100%, 48%);
      }
    }
  }
`;