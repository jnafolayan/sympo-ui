import React from "react";
import styled from "styled-components";

export const Input = (props) => (
  <input {...props} />
);

export const Checkbox = (props) => (
  <label htmlFor={props.label.replace(/ /g, "-")}>
    <input type="checkbox" id={props.label.replace(/ /g, "-")} onChange={props.onChange} />
    <span style={{fontSize: "0.9rem"}}>{props.label}</span>
  </label>
);

export const Submit = ({ label }) => (
  <button type="submit">{label}</button>
);

export const Title = styled.h5`
  font-weight: normal;
  font-size: 1.2rem;
  margin-bottom: 1.4rem;
  color: #444;
  font-family: Poppins, sans-serif;
  text-align: center;
`;

export const Alt = styled.div`
  text-align: center;
  font-size: 1rem;
  color: #777;
  margin-top: 2rem;

  a {
    text-decoration: underline;
    color: #000;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 150px;
`;

export const Form = styled.form`
  display: block;
`;

export const Group = styled.div`
  width: 100%;
  margin-bottom: 1rem;

  input[type=checkbox] + span {
    vertical-align: middle;
    padding-left: 8px;
  }

  > input, textarea {
    width: 100%;
    padding: 0.8rem 1rem;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    transition: all 0.3s;

    &:focus {
      border-color: hsl(150, 100%, 50%);
      outline: none;
    }
  }

  button {
    padding: 0.8rem 1rem;
    font-size: 1rem;
    font-size: Poppins, sans-serif;
    transition: all 0.3s;
  }
`;

export const Label = styled.label`
  font-size: 1rem;  
  color: #555;
  display: block;
  margin-bottom: 0.6rem;
`;