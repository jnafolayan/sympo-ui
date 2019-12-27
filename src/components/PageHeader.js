import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";

export const HeaderContainer = ({ children }) => 
  <div className="container" style={{ background: "rgb(230,230,230)" }}>
    {children}
  </div>
;

export const PageTitle = styled.div`
  text-align: left;
  font-size: 1.6rem;
  color: #555;
  font-family: Poppins, sans-serif;
`;