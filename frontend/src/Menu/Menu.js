import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const MenuBox = styled.div`
    background-color:white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    height: 100vh;
    width: 35vw;
`;
const GameTitle = styled.div``;
const MainTitle = styled.h1`
    font-size: 1.9rem;
    font-weight: bold;
    color: #ff0076;
    padding: 2%;
    text-align: center;
    width: 28vw;
    border: 2px solid #ff0076;
   
`;
const SubTitle = styled.h3`
    font-size: 1.4rem;
    margin:0;
    text-align: center;
    color: #338f9e;
`;
const MenuForm = styled.form`
margin-top: 5%;
    display: flex;
    justify-content: center;
    width: 20vw;
    flex-direction: column;
    height: 40vh;
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
const LabelInput = styled.label`
    font-size: 1.2rem;
    font-weight: bold;
`;
const CarEmoji = styled.span`
    font-size: 2rem;
    margin: 0 0.5rem;
`;


const handleChange = (evt, cb) => {
    // console.log(evt.target.value);
    cb(evt.target.value);
};


const Menu = ({children,setInitialize}) => {
    const [playerName, setPlayerName] = useState('');
    const [playerEmail, setPlayerEmail] = useState('');
    const handleSubmit = (evt) => {
        evt.preventDefault();
        if(playerEmail === '' || playerName === '' ) return;
        console.log(`PlayerName:${playerName} PlayerEmail ${playerEmail}`);
        console.log(`Initializing modules...`);
        setInitialize(true);
    };

    return <MenuBox>
        {children}
        <GameTitle>
            <MainTitle> Se meu fusca falasse...
                <CarEmoji role="img" aria-label="car-emoji">🚗</CarEmoji>
            </MainTitle>
            <SubTitle>  {"<"}React Game{">"} </SubTitle>
        </GameTitle>

        <MenuForm onSubmit={handleSubmit}>
            <LabelInput>Nome:</LabelInput>
            <MenuInput value={playerName} onChange={(evt) => handleChange(evt, setPlayerName)} type="text"/>
            <LabelInput> Email: </LabelInput>
            <MenuInput value={playerEmail} onChange={(evt) => handleChange(evt, setPlayerEmail)} type="text"/>
            <ButtonInput readOnly value="INICIAR" type="Submit"/>
        </MenuForm>
    </MenuBox>
};

export default Menu;