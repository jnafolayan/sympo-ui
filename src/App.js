import React from "react";
import { Router, Location } from "@reach/router";
import posed, { PoseGroup } from "react-pose";

const RouteContainer = posed.div({
  enter: {
    delay: 300,
    opacity: 1,
    beforeChildren: false
  },
  exit: {
    opacity: 0,
    staggerChildren: 0
  }
});

const PosedRouter = ({ children }) => (
  <Location>
  {({ location }) => (
    <PoseGroup>
      <RouteContainer key={location.key}>
        <Router location={location}>{children}</Router>
      </RouteContainer>
    </PoseGroup>
  )}
  </Location>
);

export default function App() {
  return (
    <PosedRouter>
      <NotFound default />
    </PosedRouter>
  );
}