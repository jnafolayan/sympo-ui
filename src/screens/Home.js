import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import axios from "axios";
import styled from "styled-components";
import { subscribe } from "../pusher";
import useData from "../hooks/useData";
import AdHoc from "../components/AdHoc";
import prefixAPI from "../util/prefixAPI";

export default function ViewPoll({ poll_id }) {
  const [{ 
    data: polls, 
    isLoading, 
    isError,
    overrideData: setPolls 
  }] = useData(prefixAPI("/polls"), []);

  useEffect(() => {
    // listen for new polls
    const channel = subscribe("polls");
    channel.bind("poll", data => {
      setPolls(polls.concat(data));
    });
  }, []);

  return (
    <main>
      <div className="container">
        <AdHoc 
          height="9rem" 
          bottom="1rem"
          awaiting={!!polls.length}
          render={() => 
            polls.map(poll => (
              <PollContainer key={poll._id}>
                <Link to={"/polls/" + poll._id}>
                  <PollTitle>{poll.question}</PollTitle>
                  <PollDetails>{poll.details}</PollDetails>
                </Link>
              </PollContainer>
            ))
          }
        />
        <AdHoc 
          height="9rem" 
          bottom="1rem"
          awaiting={!!polls.length} 
          render={() => null}
        />
        <AdHoc 
          height="9rem" 
          awaiting={!!polls.length} 
          render={() => null}
        />
      </div>
    </main>
  );
}

const PollContainer = styled.div`
  a {
    display: block;
    width: 100%;
    box-shadow: 0 2px 10px rgba(200,200,200,0.55);
    margin-bottom: 1rem;
    padding: 16px;
    border: none;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.3s;

    &:visited {
      text-decoration: none;
    }

    &:hover {
      box-shadow: none;
      border: 1px solid #ddd;
    }
  }
`;

const PollTitle = styled.h3`
  font-size: 1.4rem;
  color: #333;
  font-family: Poppins, sans-serif;
  word-break: break-word;
  letter-spacing: 0.01rem;
`;

const PollDetails = styled.p`
  color: #888;
  font-size: 1rem;
  font-family: "Open Sans", sans-serif;
  margin-top: 0.5rem;
`;