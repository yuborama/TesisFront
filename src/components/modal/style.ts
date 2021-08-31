import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ModalStyled = styled.div<any>`
    width: 100vw;
    height: 100vh;
    top: 0;
    position: fixed;
    background-color: rgba(0,0,0,0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
    ${({ active }) => active && css`html{
        overflow-y: hidden;
    }`}
`;

export const ContainerCloseStyled = styled.div`
    background-color: red;
    position: absolute;
    right: 0;
    top: 0;
`;

export const ContainerWraperStyled = styled.div`
    width: 60vw;
    height: 60vh;
    background-color: #FFFFFF;
    position: relative;
    gap: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
`;