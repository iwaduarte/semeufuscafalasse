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

const Menu = ({ onSubmit }) => {
  const [playerName, setPlayerName] = useState('');
  const [playerEmail, setPlayerEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    if (playerEmail === '' || playerName === '') {
      setError('Nome e email são necessários! ');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }
    const player = { playerName, playerEmail };
    setError('');
    onSubmit(player);
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
        {error && <div style={{ color: 'red', marginBottom: '2px', padding: '2%', textAlign: 'center' }}> {error}</div>}
        <LabelInput>Nome:</LabelInput>
        <MenuInput value={playerName} onChange={evt => setPlayerName(evt.target.value)} type="text" />
        <LabelInput> Email: </LabelInput>
        <MenuInput value={playerEmail} onChange={evt => setPlayerEmail(evt.target.value)} type="email" />
        <ButtonInput readOnly value="INICIAR" type="Submit" />
      </MenuForm>
    </MenuBox>
  );
};

export default Menu;
