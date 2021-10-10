import styled from '@emotion/styled';

export const Container = styled.div`
    max-width: 1300px;
    padding: 2rem 0;
    display: flex;
    gap: 2rem;
    flex-direction: column;
    align-items: center;
    margin-left: auto;
    margin-right: auto;

`;

export const TableStyled = styled.table`
    width: max-content;
    height: max-content;
    background-color: #FFFFFF;
    text-align: center;
    border: 1px solid black;
    border-collapse: collapse;
    td, tr {  
        border: 1px solid #ddd;
    }
    th{
        padding: 0 0.5rem;
        font-weight: 300;
    }
    thead{
        tr{
            th{
                padding: 0.5rem 0.5rem;
                font-weight: 700;
            }
            border: 1px solid black;  
        }
    }
    tbody{
        tr:hover{
            th{
                font-weight: 700;
            }
            background-color: #DEF9E7;
        }
    }
`;
