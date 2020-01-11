import styled, { css } from "styled-components";

const fontStack = `helvetica neue, Helvetica, Arial, lucida grande, sans-serif`;

export const EditArea = styled.div`
  width: calc(100% - 40px);
  max-width: 500px;
  padding: 30px 20px 20px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const EditorArea = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${props =>
    props.areLoading &&
    css`
      & > * {
        opacity: 0.1;
        pointer-events: none;
      }
    `}
`;

export const LoadingText = styled.p`
  display: none;
  font-family: ${fontStack};
  opacity: 1 !important;
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translate(-50%, 0);
  ${props =>
    props.areLoading &&
    css`
      display: initial;
    `}
`;

export const ImageInput = styled.input`
  max-width: 100%;
`;

export const EmojiArea = styled.div`
  width: calc(100% - 40px);
  max-width: 1000px;
  padding: 20px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const EmailArea = styled.div`
  width: calc(100% - 40px);
  max-width: 500px;
  padding: 20px 20px 30px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const EmailForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 450px) {
    flex-direction: column;
  }
`;

export const EmailLabel = styled.label`
  margin: 5px;
  font-family: ${fontStack};
  font-size: 15px;
`;

export const EmailInput = styled.input`
  margin: 5px;
  font-family: ${fontStack};
  font-size: 15px;
`;

export const EmailButton = styled.input`
  margin: 5px;
  font-family: ${fontStack};
  font-size: 15px;
`;

export const TestImageArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 10px 10px;
`;

export const TestImageLink = styled.a`
  width: 45px;
  height: 45px;
  margin: 8px;
  cursor: pointer;
  border: 2px solid #efefef;
  border-radius: 3px;
  &:hover {
    border: 2px solid #00bfff;
  }
  & img {
    width: 100%;
    height: 100%;
  }
`;

export const Header = styled.h1`
  font-family: ${fontStack};
  text-align: center;
  font-size: 35px;
  color: #2b2b2b;
  margin: 0 0 5px;
  @media (max-width: 450px) {
    font-size: 25px;
  }
`;

export const Subheader = styled.h2`
  font-family: ${fontStack};
  font-size: 18px;
  text-align: center;
  max-width: 300px;
  color: #2b2b2b;
  margin: 0 0 30px;
  @media (max-width: 450px) {
    font-size: 18px;
  }
`;

export const Text = styled.p`
  font-family: ${fontStack};
  font-size: 15px;
  text-align: center;
  color: #2b2b2b;
  margin: 8px;
  ${props =>
    props.paddingBottom &&
    css`
      padding-bottom: 30px;
    `}
  ${props =>
    props.paddingTop &&
    css`
      padding-top: 30px;
    `}
  ${props =>
    props.size &&
    css`
      font-size: ${props.size}px;
    `}
`;

export const UploadedImage = styled.img`
  width: 100px;
  height: 100px;
  outline: 1px solid #efefef;
  border-radius: 4px;
  margin: 20px 0 0 0;
`;

export const Spaces = styled.span`
  @media (max-width: 450px) {
    display: block;
    padding-bottom: 10px;
  }
`;
