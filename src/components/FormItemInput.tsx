"use client";
import React from "react";
import styled from "styled-components";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  register: UseFormRegisterReturn;
  label: string;
  errorMessage?: string;
  placeholder: string;
};

const FormItemInput = ({
  register,
  label,
  errorMessage,
  placeholder,
}: Props) => {
  return (
    <InputWrapper>
      <label>{label}</label>
      <input {...register} placeholder={placeholder} autoComplete="off" />
      {errorMessage && <p>{errorMessage}</p>}
    </InputWrapper>
  );
};

export default FormItemInput;

const InputWrapper = styled.div`
  margin-bottom: 10px;

  & > Input {
    padding: 10px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid black;
  }
  & > p {
    margin-top: 5px;
    padding: 0 5px;
    color: red;
    font-size: 0.8rem;
  }
`;
