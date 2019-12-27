import React from "react";
import styled from "styled-components";

export const Options = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Option = ({ onRemove, label }) => (
  <OptionWrap>
    <span>{label}</span>
    <span><i className="fa fa-times" onClick={onRemove}></i></span>
  </OptionWrap>
);

export default function PollOptions({ options, removeOption }) {
  return (
    <Options>
      {options.map((option, index) => 
        <Option key={index} label={option} onRemove={() => removeOption(index)} />
      )}
    </Options>
  );
}

const OptionWrap = styled.div`
  padding: 8px 8px;
  font-size: 1rem;
  color: #777;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: inline-block;
  width: auto;
  margin-right: 8px;
  margin-bottom: 8px;

  span:last-child {
    margin-left: 8px;
    
    &:hover {
      color: hsl(4, 100%, 50%);
    }
  }
`;