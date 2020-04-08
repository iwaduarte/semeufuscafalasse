import React from 'react';
import {
    ButtonInput,
    CarEmoji,
    GameTitle,
    LabelInput,
    MainTitle,
    MenuBox,
    MenuForm,
    MenuInput,
    SubTitle
} from "./MenuStyled";

const handleChange = (evt, cb) => {
    cb(evt.target.value);
};

const Menu = ({children, setInitialize, playerName, setPlayerName, playerEmail, setPlayerEmail,  setResetGame}) => {

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (playerEmail === '' || playerName === '') return;
        console.log(`PlayerName:${playerName} PlayerEmail ${playerEmail}`);
        console.log(`Initializing modules...`);
        setResetGame(false);
        setInitialize(true);
    };
    return <MenuBox>
        {children}
        <GameTitle>
            <MainTitle> Se meu fusca falasse...
                {/* eslint-disable jsx-a11y/accessible-emoji */}
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