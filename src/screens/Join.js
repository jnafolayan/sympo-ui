import React, { useState } from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
import { Form, Group, Input, Checkbox, Title, Alt } from "../components/Form";

export default function Signin() {
  const [authPayload, setAuthPayload] = useState({
    email: "",
    password: ""
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleFormInput = ({ target }) => {
    const { name, value } = target;
    setAuthPayload({
      ...authPayload,
      [name]: value
    });
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const submitForm = (event) => {
    event.preventDefault();
    console.log({ authPayload });
    console.log({ rememberMe });
  };

  return (
    <div className="container">
      <Body>
        <div className="auth-option">
          <Title>Sign up</Title>
          <Form onSubmit={submitForm}>
            <Group>
              <Input type="email" name="email" placeholder="Email" onInput={handleFormInput} />
            </Group>
            <Group>
              <Input type="password" name="password" placeholder="Password" onInput={handleFormInput} />
            </Group>
            <Group>
              <FormFooter>
                <button type="submit">Sign in</button>
              </FormFooter>
            </Group>
          </Form>
        </div>

        <div className="auth-option">
          <div className="auth-option__rule"></div>
          <Group>
            <button type="button" className="google-btn">
              <i className="fab fa-google"></i>
              <span>Continue with Google</span>
            </button>
          </Group>
        </div>

        <Group>
          <Alt>Already have an account? <Link to="/sign-in">Sign in</Link></Alt>
        </Group>
      </Body>
    </div>
  );
}

const Body = styled.div`
  margin-top: 1rem;
  max-width: 565px;
  margin: 1rem auto 0 auto;
  padding: 0.8rem 1rem;

  .auth-option__rule {
    width: 85%;
    height: 2px;
    margin: 2.5rem auto 2rem auto;
    background: #ddd;
  }

  .auth-option__rule:before {
    content: "or";
    color: #555;
    font-size: 0.8rem;
    display: block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin: 0 auto;
    background: #fff;
    border-radius: 50%;
    transform: translateY(-50%);
  }

  .google-btn {
    width: 100%;
    border: 1px solid #888;
    color: #888;
    font-weight: bold;

    &:hover {
      background: #ddd;
    }

    i {
      color: hsl(4, 100%, 52%);
      margin-right: 12px;
    }
  }
`;

const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;

  > label {
    flex: 2;
  }

  > button {
    flex: 1;
    background: hsl(150, 100%, 45%);
    color: #fff;
    font-weight: bold;
    box-shadow: 0 4px 18px rgba(120,120,120,0.3);

    &:hover {
      box-shadow: none;
    }
  }
`;