import React, { useState, useEffect } from "react";
import { subscribe } from "../pusher";
import { useDispatch } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import useData from "../hooks/useData";
import AdHoc from "../components/AdHoc";
import Comments from "../components/Comments";
import prefixAPI from "../util/prefixAPI";

export default function ViewPoll({ poll_id }) {
  const [{ 
    data: pollData, 
    isLoading: pollLoading, 
    isError: pollError
  }] = useData(buildPollQuery(poll_id), null);
  const [{
    data: comments,
    overrideData: setComments
  }] = useData(prefixAPI("/comments?poll=" + poll_id), null);
  const [poll, setPoll] = useState(null);
  const [votes, setVotes] = useState(null);

  useEffect(() => {
    // listen for votes, and comments
    const channel = subscribe(poll_id);
    channel.bind("vote", data => {
      setVotes(data.votes);
    });
    channel.bind("comment", data => {
      const newComments = (comments || []).concat([data]);
      // newComments.sort((a, b) => b.upvotes - a.upvotes);
      setComments(newComments);
    });
    channel.bind("upvote", ({ commentId, upvotes }) => {
      if (!comments) return;
      const comment = comments.find(co => co._id == commentId);
      if (!comment) return;
      comment.upvotes = upvotes;
      comments.sort((a, b) => b.upvotes - a.upvotes);
      setComments(comments);
    });
  }, [comments]);

  useEffect(() => {
    if (!pollData) {
      setPoll(null);
      setVotes(null);
      return;
    }

    setVotes(votes || pollData.votes);
    setPoll(transformPoll(poll || pollData.poll));
  }, [pollData, votes]);

  const transformPoll = (poll) => {
    const realVotes = votes || pollData.votes;
    const totalVotes = Object.values(realVotes).reduce((accum, t) => accum + t, 0);
    return {
      ...poll,
      options: poll.options.map(option => ({
        ...option,
        percentage: !totalVotes ? 0 : Math.round(realVotes[option._id] / totalVotes * 100)
      }))
    }
  };

  const voteOption = (optionId) => {
    axios.post(buildPollQuery(poll_id) + "/vote", { optionId })
      .then(data => {
        //pass
      })
      .catch(err => console.error(err));
  };

  const makeComment = (message) => {
    const payload = {
      message,
      poll: poll_id
    };

    axios.post(prefixAPI("/comments"), payload)
      .then(data => {
        // pass. Pusher will take care of updates
      })
      .catch(err => console.error(err));
  };

  const upVote = (commentId) => {
    const comment = comments.find(co => co._id == commentId);
    if (!comment) return;

    axios.post(prefixAPI(`/comments/${commentId}/upvote`))
      .then(data => {
        // pass. Pusher will take care of updates
      })
      .catch(err => console.error(err));
  };

  return (
    <main>
      <div className="container">
        <AdHoc 
          height="2.5rem" 
          bottom="1rem"
          awaiting={poll}
          render={() => <PollTitle>{poll.question}</PollTitle>}
        />
        <AdHoc 
          height="7rem" 
          awaiting={poll} 
          render={() => <PollDetails>{poll.details}</PollDetails>}
        />
      </div>

      <div className="container">
        <p style={{fontSize: "0.9rem",color:"#777"}}><small><i>Click to vote</i></small></p>
        <AdHoc
          height="2rem"
          bottom="8px"
          awaiting={poll}
          render={() => 
            <PollOptions>
              {poll.options.map(option =>
                <PollOption 
                  key={option._id} 
                  label={option.label}
                  percentage={option.percentage} 
                  onClick={() => voteOption(option._id)}
                />
              )}
            </PollOptions>
          }
        />
        <AdHoc 
          height="2rem" 
          bottom="8px"
          awaiting={poll}
          render={() => null}
        />
        <AdHoc 
          height="2rem" 
          bottom="8px"
          awaiting={poll}
          render={() => null}
        />
        <AdHoc 
          height="1.4rem" 
          bottom="8px"
          awaiting={votes}
          render={() => 
            <VotesCount>
              {Object.values(votes).reduce((accum, t) => accum + t, 0) + " votes"}
            </VotesCount>
          }
        />
      </div>

      {/* Comments */}
      <div className="container">
        <AdHoc
          height="3.5rem"
          bottom="8px"
          awaiting={comments}
          render={() => 
            <Comments 
              comments={comments} 
              onMakeComment={makeComment} 
              onUpVote={upVote} 
            />
          }
        />
      </div>
    </main>
  );
}

const PollTitle = styled.h3`
  font-size: 1.75rem;
  color: #333;
  font-family: Poppins, sans-serif;
  word-break: break-word;
  letter-spacing: 0rem;
`;

const PollDetails = styled.p`
  color: #888;
  font-size: 1rem;
  font-family: "Open Sans", sans-serif;
  margin-top: 0.8rem;
`;

const PollOption = ({ label, percentage, onClick }) => (
  <PollOptionWrap progress={percentage} onClick={onClick}>
    <div className="votes-progress"></div>
    <div className="votes">
      <span>{label}</span>
      <span>{percentage + "%"}</span>
    </div>
  </PollOptionWrap>
);

const PollOptions = styled.div`
  border: 1px solid rgba(230,230,230,0.8);
  margin-top: 1rem;
  max-width: 661px;

  > div:not(:last-child) {
    border-bottom: 1px solid rgba(230,230,230,0.8);
  }
`;

const PollOptionWrap = styled.div`
  width: 100%;
  position: relative;

  > .votes-progress {
    width: ${({ progress }) => progress + "%"};
    height: 40px;
    background: linear-gradient(to bottom, hsl(145, 90%, 86%) 85%, hsl(149, 100%, 78%) 85%);
  }

  > .votes {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    height: 40px;
    padding: 0 16px;
    justify-content: space-between;
    align-items: center;
    
    > span {
      font-size: 0.9rem;
      color: #333;
    }
  }
`;

const VotesCount = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
  color: #777;
  font-family: Poppins, sans-serif;
`;

const buildPollQuery = (pollId) => prefixAPI("/polls/" + pollId);
// const buildPollQuery = (pollId) => null;
