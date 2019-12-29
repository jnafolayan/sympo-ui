import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { Form, Textarea, Group } from "./Form";

export default function Comments({ comments, onUpVote, onMakeComment }) {
  const [allowComment, setAllowComment] = useState(false);
  const [message, setMessage] = useState("");

  const formatDate = (date) => moment(date).fromNow();

  const submitForm = (event) => {
    event.preventDefault();
    setMessage("");
    setAllowComment(null);
    onMakeComment(message);
  };

  return (
    <React.Fragment>
      <Header>
        <CommentsCount>{comments.length + " comments"}</CommentsCount>
        <CommentTrigger onClick={() => setAllowComment(true)}>
          <i className="fa fa-pen-square"></i>&nbsp;&nbsp;Say something
        </CommentTrigger>
      </Header>
      <Content>
        {allowComment && 
        <Form method="POST" action="" onSubmit={submitForm}>
          <Group>
            <Textarea 
              required={true} 
              name="message" 
              value={message}
              onChange={({ target }) => setMessage(target.value)}>
            </Textarea>
          </Group>
          <Group>
            <SubmitButton type="submit">Send</SubmitButton>
          </Group>
        </Form>}
        {comments.map(comment => 
          <Comment key={comment._id}>
            <CommentTop>
              <span className="username">{comment.author}</span>
              <span className="date">{"- " + formatDate(comment.createdAt)}</span>
            </CommentTop>
            <CommentMessage>{comment.message}</CommentMessage>
            <CommentStats>
              <i className="fa fa-thumbs-up" onClick={() => onUpVote(comment._id)}></i>
              <span>{comment.upvotes}</span>
            </CommentStats>
          </Comment>
        )}
      </Content>
    </React.Fragment>
  );
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const CommentsCount = styled.span`
  color: #333;
  font-size: 0.9rem;
  font-family: "Open Sans", sans-serif;
`;

const CommentTrigger = styled.span`
  color: #333;
  font-size: 0.9rem;
  font-family: "Open Sans", sans-serif;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Content = styled.div`
  width: 100%;
`;

const Comment = styled.div`
  border: 1px solid #ddd;
  padding: 0.95rem;
  margin-bottom: 8px;
`;

const CommentTop = styled.div`
  margin-bottom: 8px;
  font-size: 0.9rem;

  > .username {
    color: hsl(150, 80%, 40%);
    margin-right: 16px;
  }

  > .date {
    color: #777;
  }
`;

const CommentMessage = styled.div`
  color: #333;
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

const CommentStats = styled.div`
  color: #777;
  font-size: 0.9rem;

  > span {
    margin-left: 8px;
  }
`;

const SubmitButton = styled.button`
  margin-left: auto;
  background: hsl(150, 100%, 45%);
  color: #fff;
  font-weight: bold;
  box-shadow: 0 4px 18px rgba(120,120,120,0.3);
  text-align: center;
  width: 120px;
  padding-left: 18px;
  padding-right: 18px;

  &:hover {
    box-shadow: none;
  }
`;
