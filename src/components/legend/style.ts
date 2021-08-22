import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { LegendProps } from './index'

export const ContainerStyled = styled.div`
    display: flex;
    /* align-items:center; */
    flex-direction: column;
    justify-content: center;
    gap: 10px;
`;

export const WrapperStyled = styled.div`
    display: flex;
    align-items:center;
    width: max-content;
    gap: 3px;
    :hover{
        cursor: pointer;
    }
`;

export const PointStyled = styled.div`
    height:10px; 
    width:10px;
    border-radius:50%;
    background: rgb(131,58,180);
    &.firts{
        background: radial-gradient(circle, rgba(131,58,180,1) 0%, rgba(29,253,194,1) 50%, rgba(252,176,69,1) 100%);
    }
`;