import React, { createRef, useEffect, useState } from 'react';
import Canvas from './Canvas/Canvas';
import Player from './Player/Player';
import Menu from './Menu/Menu';
import Interface from './Interface/Interface';
import useMove from './_myHooks/useMove';
import Obstacles from './Obstacles/Obstacles';
import playerConfig from './Player/playerConfig';
import obstacleConfig from './Obstacles/obstaclesConfig';
import {ApolloClient, ApolloProvider} from '@apollo/client';
import canvasBgStatic from './assets/images/canvas_bg.jpg';
import canvasBgAnimated from './assets/images/canvas_bg.gif';

const graphQLconfig = {
  uri: 'http://localhost:3005/graphql',
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  }
};
const client = new ApolloClient(graphQLconfig);
const randomObstacleConfig = obstacleConfig[Math.floor(Math.random() * 3)];

const App = () => {
  const [canvasBg, setCanvasBg] = useState(canvasBgStatic);
  const [intervalsIdList, setIntervalsIdList] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [playerEmail, setPlayerEmail] = useState('');
  const [playerPosition, movePlayer, obstaclePosition, moveObstacle, resetPositions] = useMove(
    playerConfig,
    randomObstacleConfig,
    setIntervalsIdList
  );
  const [start, setStart] = useState(false);
  const [initialize, setInitialize] = useState(false);
  const [restartMatch, setRestartMatch] = useState(false);
  const [resetGame, setResetGame] = useState(false);
  const playerRef = createRef();
  const obstacleRef = createRef();

  //reset game to main meu
  useEffect(() => {
    if (resetGame) {
      resetPositions();
      setStart(false);
      setInitialize(false);
    }
  }, [resetGame, resetPositions]);

  useEffect(() => {
    if (restartMatch) {
      resetPositions();
      setStart(false);
      setInitialize(true);
      setRestartMatch(false);
    }
  }, [restartMatch, resetPositions]);

  const handleStart = ({ playerName, playerEmail }) => {
    setPlayerName(playerName);
    setPlayerEmail(playerEmail);
    setInitialize(true);
  };

  return (
    <ApolloProvider client={client}>
      {!initialize && <Menu onSubmit={handleStart} />}
      <Canvas canvasBg={canvasBg}>
        {initialize && (
          <Interface
            playerName={playerName}
            playerEmail={playerEmail}
            resetGame={resetGame}
            setResetGame={setResetGame}
            restartMatch={restartMatch}
            setRestartMatch={setRestartMatch}
            start={start}
            setStart={setStart}
            setInitialize={setInitialize}
            setCanvasBg={setCanvasBg}
            canvasBgStatic={canvasBgStatic}
            canvasBgAnimated={canvasBgAnimated}
            playerRef={playerRef}
            obstacleRef={obstacleRef}
            intervalsId={intervalsIdList}
            setIntervalsId={setIntervalsIdList}
            moveObstacle={moveObstacle}
            movePlayer={movePlayer}
          />
        )}
        {start && (
          <>
            <Player
              ref={playerRef}
              movePlayer={movePlayer}
              playerPosition={playerPosition}
              playerTop={playerConfig.TOP}
              display={start}
            />
            <Obstacles
              ref={obstacleRef}
              top={obstaclePosition.top}
              left={obstaclePosition.left}
              height={obstaclePosition.height}
              moveObstacle={moveObstacle}
            />
          </>
        )}
      </Canvas>
    </ApolloProvider>
  );
};

export default App;
