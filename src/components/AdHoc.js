import React from "react";
import styled from "styled-components";

export default function AdHoc({ height = "1rem", bottom = "0px", awaiting, render }) {
  return (
    !awaiting ? 
    <Progress height={height} bottom={bottom} /> :
    render()
  );
}

const Progress = styled.div`
  width: 100%;
  height: ${({ height }) => height};
  margin-bottom: ${({ bottom }) => bottom};
  animation: load 2s infinite ease-in;
  opacity: 0.8;

  @keyframes load {
    0% {
      background: linear-gradient(30deg, rgb(245,245,245), #eee, #ddd, #ccc, rgb(200,200,200));
    }
    20% {
      background: linear-gradient(30deg, rgb(200,200,200), rgb(245,245,245), #eee, #ddd, #ccc);
    }
    40% {
      background: linear-gradient(30deg, #ccc, rgb(200,200,200), rgb(245,245,245), #eee, #ddd);
    }
    80% {
      background: linear-gradient(30deg, #ddd, #ccc, rgb(200,200,200), rgb(245,245,245), #eee);
    }
    100% {
      background: linear-gradient(30deg, #eee, #ddd, #ccc, rgb(200,200,200), rgb(245,245,245));
    }
  }
`;
