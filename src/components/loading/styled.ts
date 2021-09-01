import styled from "@emotion/styled";
import { css, keyframes } from '@emotion/react'

const loadingD = keyframes`
     0 {transform: rotate(0deg);}
    50% {transform: rotate(180deg);}
    100% {transform: rotate(360deg);}
`;

export const LoadingStyled = styled.div`
    width: 100vw;
    height: 100vh;
    top: 0;
    position: fixed;
    background-color: rgba(0,0,0,0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
    .ring-1 {
        width: 6.25rem;
        height: 6.25rem;
        margin: 0 auto;
        padding: 10px;
        border: 1rem dashed #4b9cdb;
        border-radius: 100%;
    }
    .load-4 .ring-1 { 
        animation: ${loadingD} 1.5s 0.3s cubic-bezier(0.17, 0.37, 0.43, 0.67) infinite;
    }
`;




