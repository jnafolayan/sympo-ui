import React from "react";
import { Router, Location } from "@reach/router";
import posed, { PoseGroup } from "react-pose";
import Home from "./screens/Home";
import Signin from "./screens/Signin";
import Join from "./screens/Join";
import CreatePoll from "./screens/CreatePoll";
import NotFound from "./screens/NotFound";
import Navbar from "./components/Navbar";

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
      <RouteContainer key={location.pathname}>
        <Router location={location}>{children}</Router>
      </RouteContainer>
    </PoseGroup>
  )}
  </Location>
);

export default function App() {
  return (
    <div>
      <Navbar loggedIn={false} />
      <Router>
        <Home path="/" />
        <Signin path="/sign-in" />
        <Join path="/sign-up" />
        <CreatePoll path="/create-poll" />
        <NotFound default />
      </Router>
    </div>
  );
}