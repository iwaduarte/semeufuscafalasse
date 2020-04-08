import React, {createRef, useEffect, useState} from 'react';
import Canvas from "./Canvas/Canvas";
import Player from "./Player/Player"
import Menu from "./Menu/Menu";
import Interface from "./Interface/Interface";
import useMove from "./myHooks/useMove";
import playerConfig from "./Player/playerConfig";
import obstacleConfig from "./Obstacles/obstaclesConfig";

import Obstacles from "./Obstacles/Obstacles";

import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
//remove after setting proxy dev.
const graphQLconfig = {
    uri: "http://localhost:3005/graphql",
    onError: ({networkError, graphQLErrors}) => {
        console.log('graphQLErrors', graphQLErrors);
        console.log('networkError', networkError);
    }
};
const client = new ApolloClient(graphQLconfig);
const randomObstacleConfig = obstacleConfig[Math.floor(Math.random() * 3)];

const App = () => {

    const [intervalsIdList, setIntervalsIdList] = useState([]);
    const [playerName, setPlayerName] = useState('');
    const [playerEmail, setPlayerEmail] = useState('');
    const [
        playerPosition, movePlayer,
        obstaclePosition, moveObstacle,
        resetPositions] = useMove(playerConfig, randomObstacleConfig, setIntervalsIdList);
    const [start, setStart] = useState(false);
    const [initialize, setInitialize] = useState(false);
    const [resetGame, setResetGame] = useState(false);
    const [resetAll, setResetAll] = useState(false);
    const playerRef = createRef();
    const obstacleRef = createRef();

    //reset game to main meu
    useEffect(() => {
        if (resetAll) {
            resetPositions();
            setStart(false);
            setInitialize(false);
            setPlayerName('');
            setPlayerEmail('');

        }

    }, [resetAll, resetPositions]);

    //restart match
    useEffect(() => {
        if (resetGame) {
            resetPositions();
            setStart(false);
            setInitialize(true);
            setResetGame(false);
        }

    }, [resetGame,resetPositions]);

    return <>
        <ApolloProvider client={client}>

            {!initialize && < Menu playerName={playerName}
                                   setPlayerName={setPlayerName}
                                   playerEmail={playerEmail}
                                   setPlayerEmail={setPlayerEmail}
                                   setInitialize={setInitialize}
                                   setResetAll = {setResetAll}
            />}
            <Canvas>
                {initialize && <Interface playerName={playerName} playerEmail={playerEmail}
                                          resetAll={resetAll} setResetAll={setResetAll}
                                          resetGame={resetGame} setResetGame={setResetGame}
                                          start={start} setStart={setStart}
                                          setInitialize={setInitialize}
                                          playerRef={playerRef} obstacleRef={obstacleRef}
                                          intervalsId={intervalsIdList} setIntervalsId={setIntervalsIdList}
                                          moveObstacle={moveObstacle} movePlayer={movePlayer}
                />}
                {start && <>
                    <Player ref={playerRef}
                            movePlayer={movePlayer}
                            playerPosition={playerPosition}
                            playerTop={playerConfig.TOP}
                            display={start}/>
                    <Obstacles
                        ref={obstacleRef}
                        top={obstaclePosition.top}
                        left={obstaclePosition.left}
                        height={obstaclePosition.height}
                        moveObstacle={moveObstacle}
                    />
                </>
                }
            </Canvas>

        </ApolloProvider>
    </>
};

export default App;
