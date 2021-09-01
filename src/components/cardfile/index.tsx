import styled from "@emotion/styled";
import { DragEventHandler, FC, FormEvent, useState } from "react";

type CardProps = {
  text: string;
  close: ()=>void;
};

const CardStyled = styled.div`
  width: 100px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  margin-bottom: 1rem;
  transition: transform .3s ease-in-out;
  p {
    width: 100%;
    padding: 0 0.4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:hover {
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.4);
    transform: translateY(-3%);
    border-radius: .5rem;
    padding: .3rem;
  }
`;

const ContainercloseStyled = styled.div`
  position: absolute;
  right: 10%;
  top: 0;
  border-radius: 50%;
  background-color: lightblue;
  padding: 0.2rem 0.5rem;  
  display: flex;
  justify-content: center;
  align-items: center;
  &span {
    top: 50%;
    right: 50%;
  }
  :hover {
    cursor: pointer;
    border-color: rgba(175, 175, 175, 0.7);
  }
`;

const CardFile: FC<CardProps> = (props) => {
  const { text,close } = props;
  return (
    <CardStyled title={text}>
      <ContainercloseStyled onClick={close}>
        <span>x</span>
      </ContainercloseStyled>
      <img
        src="/image2vector.svg"
        style={{ width: "100px", height: "100px" }}
        alt=""
      />
      <p>{text}</p>
    </CardStyled>
  );
};
export default CardFile;
