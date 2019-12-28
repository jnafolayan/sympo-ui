import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, navigate } from "@reach/router";
import axios from "axios";
import styled from "styled-components";
import { Form, Group, Input, Checkbox, Title, Alt } from "../components/Form";
import prefixAPI from "../util/prefixAPI";
import { userActions } from "../store/actions";

export default function Signin() {
  const [authPayload, setAuthPayload] = useState({
    username: "",
    password: ""
  });
  const [rememberMe, setRememberMe] = useState(false);
  const authDispatch = useDispatch();

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
    axios.post(prefixAPI("/auth/login"), authPayload)
      .then(({ data }) => {
        const { username, email, token } = data.data;
        authDispatch(
          userActions.setUser({ username, email, token, remember: rememberMe })
        );
        const url = new URL(location.href);
        const redirect = url.searchParams.get("redirect");
        navigate(redirect || "/");
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className="container">
      <Body>
        <div className="auth-option">
          <Title>Sign in</Title>
          <Form onSubmit={submitForm}>
            <Group>
              <Input type="text" name="username" placeholder="Username" onInput={handleFormInput} />
            </Group>
            <Group>
              <Input type="password" name="password" placeholder="Password" onInput={handleFormInput} />
            </Group>
            <Group>
              <FormFooter>
                <Checkbox label="Keep me signed in" onChange={toggleRememberMe} />
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
          <Alt>Don't have an account? <Link to="/sign-up">Sign up</Link></Alt>
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

  @media (max-width: 496px) {
    flex-direction: column;
    justify-content: flex-start;

    > button {
      margin-top: 0.9rem;
    }
  }

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