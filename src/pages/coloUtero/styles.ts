import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    justify-content: center;
    align-items: center;
`;

export const Header = styled.div`
    text-transform: uppercase;
    font-size: 24px;
`;
export const MenuWrapper = styled.div`
    margin-top: 20px;

    & a {
        text-decoration: none;
        color: #000;
    }
`;

export const Menu = styled.div`
    width: 250px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    border: 1px solid white;
    border-radius: 25px;
    background: pink;
    cursor: pointer;
    text-transform: uppercase;
    padding: 10px;
    transition: 0.2s ease-in-out;
    text-align: center;

    &:hover {
        background: #ffc0ad;
    }

    & a {
        text-decoration: none;
        color: white;
    }
`;

export const Option = styled.div``;
