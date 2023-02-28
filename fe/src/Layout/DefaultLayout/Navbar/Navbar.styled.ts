import styled from 'styled-components';

export const StyledNavbar = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    color: #bbb749;
    background-color: #379f7a;
`;

export const InnerStyle = styled.div`
    width: 70%;
    padding: 20px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const Logo = styled.img`
    width: 3rem;
`;
export const Search = styled.div`
    .searchForm {
        display: flex;
        width: 100%;
    }
    input {
        height: 3rem;
        width: 150%;
        border: none;
        border-radius: 0px 6px 6px 0px;
        padding: 0.5rem;
        outline: none;
        color: #000;
        font-size: 1.2rem;
    }

    .searchButton {
        height: 3rem;
        width: 3rem;
        border: none;
        border-radius: 100px 0px 0px 100px;
        padding: 0.5rem;
        cursor: pointer;
        margin-left: 10px;
        background-color: #78ae62;
        transition: width 2s;
    }
    @media (min-width: 768px) {
        input {
            width: 500px;
            transition: width 2s;
        }
    }
`;
export const Cart = styled.div`
    margin-right: auto;
    padding: 20px;
`;
export const Account = styled.div`
    margin: 10px;
`;
