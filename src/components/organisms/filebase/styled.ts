import styled from '@emotion/styled';

export const SendStyled = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 8.5rem;
    
`;

export const TextStyled = styled.p<any>`
    font-family: Inter;
    font-weight: ${({ fontweight }) => fontweight || 400};
    font-size: ${({ fontzise }) => fontzise || '10px'};
    color: ${({ color }) => color || '#000000'};
    max-width: ${({ width }) => width || 'auto'};
    margin-bottom: ${({ marginbottom }) => marginbottom || 0};;
`;

export const TitleStyled = styled.div`
display: flex;
flex-direction: row;
margin-bottom: 10.75rem;
margin-top: 5.875rem;
.ornaments{
    background-color: #8AFFB2;
    width: 44px;
    margin-right: 26px;
}
    
    
`;
export const WrapperUploadFiles = styled.div`
    width: 33.125rem;
    height: 30.125rem;
    padding: 1.875rem;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    color: #000000;
    border-radius: 4px;
    form{
        gap:1.5rem;
        .radiobutton{
            margin-top: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 1.5rem 
        }
        button{
            margin-top: 1.5rem;
            width: 29.375rem;
            height: 5.625rem;
            background-color: #1BB14E;
            border: none;
            color: #ffffff;
            font-weight: 700;
            font-size: 1.5rem;

            &:active{
                scale:0.9;
            }
            cursor: pointer;
        }
        label{
            display: inline-block;
            margin-left: 0.5rem;
        }
    } 
`;



export const WrapperListFiles = styled.div`
    width: 43.063rem;
    height: 30.125rem;;
    padding: 1.5rem;
    background-color: #EEF0F5;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    overflow-y: auto;
    border-radius: 4px;
    ::-webkit-scrollbar{
        width: 7px;
    }
    ::-webkit-scrollbar-thumb{
        background: #38A6AD;
    }
    .nofile{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .cardContainer{
        display: grid;
        grid-template-columns: repeat(5,1fr);
        column-gap: 1rem;
    }
`;