import React, { useState } from "react";
import { Link, navigate } from "@reach/router";
import styled from "styled-components";
import axios from "axios";
import { Form, Group, Input, Textarea, Label, Title } from "../components/Form";
import PollOptions from "./CreatePoll/PollOptions";
import prefixAPI from "../util/prefixAPI";

export default function Signin() {
  const [payload, setPayload] = useState({
    question: "",
    details: "",
    options: []
  });

  const handleFormInput = ({ target }) => {
    const { name, value } = target;
    setPayload({
      ...payload,
      [name]: value
    });
  };

  const removeOption = (index) => {
    setPayload({
      ...payload,
      options: payload.options.filter((opt, i) => i != index)
    });
  };

  const handleKeyDown = (event) => {
    if (event.keyCode != 13) return;

    event.preventDefault();
    
    const value = event.target.value;
    if (value == "") return;

    // clear the input
    event.target.value = "";

    const limit = (arr) => {
      if (arr.length > 5)
        arr.length = 5;
      return arr;
    };

    setPayload({
      ...payload,
      options: limit(payload.options.concat([value]))
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    axios.post(prefixAPI("/polls"), payload)
      .then(({ data }) => {
        const { _id } = data.data;
        navigate("/polls/" + _id);
      });
  };

  return (
    <div className="container">
      <Body>
        <Title>Start a new poll</Title>
        <Form onSubmit={submitForm}>
          <Group>
            <Label>What is the question?</Label>
            <Textarea required={true} name="question" onChange={handleFormInput}></Textarea>
          </Group>
          <Group>
            <Label>Any extra information users need to vote?</Label>
            <Textarea name="details" onChange={handleFormInput}></Textarea>
          </Group>
          <Group>
            <Label>Specify options</Label>
            <PollOptions options={payload.options} removeOption={removeOption} />
            <Input 
              type="text" 
              name="options"
              placeholder="Press ENTER to add"
              onKeyDown={handleKeyDown} />
          </Group>
          <Group>
            <SubmitButton type="submit">Submit</SubmitButton>
          </Group>
        </Form>
      </Body>
    </div>
  );
}

const Body = styled.div`
  margin-top: 1rem;
  max-width: 565px;
  margin: 1rem auto 0 auto;
  padding: 0.8rem 1rem;
`;

const SubmitButton = styled.button`
  flex: 1;
  background: hsl(150, 100%, 45%);
  color: #fff;
  font-weight: bold;
  box-shadow: 0 4px 18px rgba(120,120,120,0.3);
  width: 100%;

  &:hover {
    box-shadow: none;
  }
`;