import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
}

export const Title = styled.h1`
  font-weight: bold;
  font-size: 3rem;
  line-height: 56px;
  width: 433px;

  color: #3a3a3a;
  margin-top: 80px;

  &::placeholder {
    color: #a8a8b3;
  }
`;

export const Form = styled.form<FormProps>`
  max-width: 700px;
  margin-top: 48px;
  display: flex;

  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border-radius: 5px 0 0 5px;
    border: 2px solid #fff;
    border-right: 0;

    ${props =>
      props.hasError &&
      css`
        border-color: #c53030;
      `}

    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 210px;
    background-color: #04d361;
    color: #fff;
    border: 0;
    border-radius: 0 5px 5px 0;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${shade(0.2, '#04d361')};
    }
  }
`;

export const Error = styled.span`
  color: #c53030;
`;

export const Repository = styled.div`
  margin-top: 80px;
  max-width: 700px;

  a {
    width: 100%;
    background-color: #fff;
    border-radius: 5px;
    padding: 24px;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: 0.2s;

    & + a {
      margin-top: 16px;
    }

    &:hover {
      transform: translateX(10px);
    }
  }

  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
  }

  div {
    margin: 0 16px;
    flex: 1;

    strong {
      font-size: 20px;
      color: #3d3d4d;
    }
    p {
      font-size: 18px;
      color: #a8a8b3;
      margin-top: 4px;
    }
  }
  svg {
    margin-left: auto;
    color: #cbcbd6;
  }
`;
