import styled from 'styled-components';

const CarEmoji = styled.span`
    font-size: 2rem;
    margin: 0 0.5rem;
`;
const GameTitle = styled.div``;
const LabelInput = styled.label`
    font-size: 1.2rem;
    font-weight: bold;
`;
const MenuBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position:absolute;
    background-color:white;
    margin: 0 33%;
    height: 100vh;
    width: 35vw;
`;
const MainTitle = styled.h1`
    font-size: 1.9rem;
    font-weight: bold;
    color: #ff0076;
    padding: 2%;
    text-align: center;
    width: 28vw;
    border: 2px solid #ff0076;
   
`;
const MenuInput = styled.input`
    border: 0;
    border-bottom: 3px solid black;
    display: block;
    padding: 2%;
    margin: 6%;

`;
const ButtonInput = styled(MenuInput)`
    border-bottom: 0;
    padding: 7% 10%;
    background-color: #2a81e4;
    color: white;
    font-size: 1.4rem;
    cursor: pointer;
     &:hover {
        color: #2a81e4;
        background-color: white;
        border: 1px inset black;
    }

`;
const MenuForm = styled.form`
    margin-top: 5%;
    display: flex;
    justify-content: center;
    width: 20vw;
    flex-direction: column;
    height: 40vh;
`;
const SubTitle = styled.h3`
    font-size: 1.4rem;
    margin:0;
    text-align: center;
    color: #338f9e;
`;

export {
    ButtonInput,
    CarEmoji,
    GameTitle,
    LabelInput,
    MainTitle,
    MenuBox,
    MenuForm,
    MenuInput,
    SubTitle }
