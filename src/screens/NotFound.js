import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";

export default function NotFound() {
  return (
    <Wrapper className="container">
      <h2>Sorry</h2>
      <p>We could not find the page you were looking for. Try going <Link to="/">home</Link> first.</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-top: 150px;

  h2 {
    font-size: 3rem;
    font-family: Poppins, sans-serif;
    color: #333;
    margin-bottom: 28px;
  }
  
  p {
    font-size: 1.2rem;
    font-family: "Open Sans", sans-serif;
    color: #999;
    max-width: 767px;
    margin: 0 auto;

    a {
      color: hsl(150, 90%, 40%);
    }
  }
`;