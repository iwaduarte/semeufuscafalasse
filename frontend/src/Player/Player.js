import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import useMove from "./useMove";
import playerConfig from "./playerConfig";

const fuscaSrc = "/images/fusca.png";
const PlayerSprite = styled.img`
    display: ${props => props.display || 'none'};
    position: absolute;
    bottom: 0;
    left: ${props => `${props.left}%`};
    // display:inline-block;
    height: 100px;
    width: 100px;
`;


const Player = ({display, playerPosition, movePlayer}) => {


    useEffect(() => {
        document.addEventListener('keydown', movePlayer);

        return () => document.removeEventListener('keydown', movePlayer);
    }, []);

    return <>
        <PlayerSprite display={display} left={playerPosition} src={fuscaSrc}/>

    </>
};

export default Player;