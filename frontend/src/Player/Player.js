import React, { forwardRef, useEffect } from 'react';
import styled from 'styled-components';

const fuscaSrc = '/images/fusca.png';
const PlayerSprite = styled.img`
  display: ${props => (props.show ? 'block' : 'none')};
  position: absolute;
  top: ${props => `${props.top}%`};
  left: ${props => `${props.left}%`};
  z-index: 10;
  height: 160px;
  // border: 2px solid red;
`;

const Player = forwardRef((props, ref) => {
  const { display, playerTop, playerPosition, movePlayer } = props;

  useEffect(() => {
    document.addEventListener('keydown', movePlayer);
    return () => document.removeEventListener('keydown', movePlayer);
  }, [movePlayer]);

  return (
    <>
      <PlayerSprite ref={ref} show={display} top={playerTop} left={playerPosition} src={fuscaSrc} />
    </>
  );
});

export default Player;
