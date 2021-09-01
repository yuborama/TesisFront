import styled from "@emotion/styled";

export const GraficStyled = styled.div`
    .GraficContent{
        display: grid;
        grid-template-columns: max-content 1fr;
        align-items: center;
        column-gap: 20px;
    }
`;
export const Container = styled.div`
    max-width: 1300px;
    margin-left: auto;
    margin-right: auto;
`;

export const SeriesStyled = styled.div`
background-color: #ffffff;
display: flex;
justify-content: center;
align-items: center;
border-radius: 4px;
`;

export const LegendStyled = styled.div`
    background-color: #ffffff;
    height: 100%;
    max-height: 403.2px ;
    overflow-y: auto;
    padding: 0.7rem;
    border-radius: 4px;
    ::-webkit-scrollbar{
        width: 7px;
    }
    ::-webkit-scrollbar-thumb{
        background: #38A6AD;
    }
`;