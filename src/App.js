import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Router, Location } from "@reach/router";
import axios from "axios";
import posed, { PoseGroup } from "react-pose";
import prefixAPI from "./util/prefixAPI";
import { userActions } from "./store/actions";
import Home from "./screens/Home";
import Signin from "./screens/Signin";
import Join from "./screens/Join";
import CreatePoll from "./screens/CreatePoll";
import ViewPoll from "./screens/ViewPoll";
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
      <RouteContainer key={location.key}>
        <Router location={location}>{children}</Router>
      </RouteContainer>
    </PoseGroup>
  )}
  </Location>
);

export default function App() {
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.token) return;
    // check token validity
    axios.post(prefixAPI("/token"))
      .then(({ data }) => {
        // it's still valid
      })
      .catch(err => {
        // err, let's clear all flags
        dispatch(userActions.deleteUser());
      });
  }, []);
  return (
    <div>
      <Navbar loggedIn={!!user.token} />
      <Router>
        <Home path="/" />
        <Signin path="/sign-in" />
        <Join path="/sign-up" />
        <CreatePoll path="/create-poll" />
        <ViewPoll path="/polls/:poll_id" />
        <NotFound default />
      </Router>
    </div>
  );
}