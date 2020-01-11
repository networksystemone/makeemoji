import styled, { css, keyframes } from "styled-components";

export const Panel = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 222px;
  height: 51px;
  padding: 7px 10px;
  margin: 8px;
  background-color: #fff;
  border: 1px solid #afafaf;
  text-align: left;
  border-radius: 3px;
  ${props =>
    props.clickable &&
    css`
      cursor: pointer;
      border: 1px solid #afafaf;
      &:hover {
        border: 1px solid #00bfff;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.2);
      }
    `}
  @media (max-width: 550px) {
    width: calc(50% - 20px);
  }
  @media (max-width: 440px) {
    width: 222px;
  }
  @media (max-width: 300px) {
    width: calc(100% - 40px);
  }
`;

const pulse = keyframes`
  0% { background-color: #fff; }
  50% { background-color: #efefef; }
  100% { background-color: #fff; }
`;

export const Image = styled.img`
  display: inline-block;
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  border: 0;
  background-color: #efefef;
  ${props =>
    props.loading &&
    css`
      border-radius: 3px;
      animation: ${pulse} 0.7s infinite ease-out;
    `}
`;

export const Name = styled.p`
  font-family: sans-serif;
  display: inline-block;
  vertical-align: middle;
  margin: 0 0 0 10px;
  padding-left: 3px;
  font-size: 21px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 160px;
  @media (max-width: 550px) {
    font-size: 18px;
  }
`;
