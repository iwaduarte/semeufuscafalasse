import React, { useState } from 'react';
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
} from './MenuStyled';

const handleChange = (evt, cb) => {
  cb(evt.target.value);
};

const Menu = ({ onSubmit }) => {
  const [playerName, setPlayerName] = useState('');
  const [playerEmail, setPlayerEmail] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    if (playerEmail === '' || playerName === '') return;
    const player = { playerName, playerEmail };
    onSubmit(player);
    // setInitialize(true);
  };
  return (
    <MenuBox>
      <GameTitle>
        <MainTitle>
          Se meu fusca falasse...
          <CarEmoji role="img" aria-label="car-emoji">
            🚗
          </CarEmoji>
        </MainTitle>
        <SubTitle>
          {'<'}React Game{'>'}
        </SubTitle>
      </GameTitle>

      <MenuForm onSubmit={handleSubmit}>
        <LabelInput>Nome:</LabelInput>
        <MenuInput value={playerName} onChange={evt => handleChange(evt, setPlayerName)} type="text" />
        <LabelInput> Email: </LabelInput>
        <MenuInput value={playerEmail} onChange={evt => handleChange(evt, setPlayerEmail)} type="email" />
        <ButtonInput readOnly value="INICIAR" type="Submit" />
      </MenuForm>
    </MenuBox>
  );
};

export default Menu;
