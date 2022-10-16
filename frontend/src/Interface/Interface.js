import { lapConfig, endMessage, Sounds } from './InterfaceConfig';
import React, { useCallback, useEffect, useState } from 'react';
import { startPoints, checkCollision, timer } from './Engine';
import useAudio from '../_myHooks/useAudio';
import {
  InterfaceBox,
  Header,
  Laps,
  Points,
  TimerSeconds,
  Box,
  BoxTitle,
  BoxSubtitle,
  BoxButton,
  SoundPanel,
  SoundIcon,
  InterfaceButton,
  FinalButton
} from './InterfaceStyled';

import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const SAVE_POINTS = gql`
  mutation savePoints($points: String!, $name: String!, $email: String!) {
    savePoints(points: $points, name: $name, email: $email) {
      id
      points
      user {
        name
      }
    }
  }
`;

const [introAudio, introAudioStop, introToggleVolume] = useAudio(Sounds.INTRO);

const Interface = ({
  setCanvasBg,
  canvasBgAnimated,
  canvasBgStatic,
  resetGame,
  setResetGame,
  restartMatch,
  setRestartMatch,
  playerName,
  playerEmail,
  start,
  setStart,
  playerRef,
  obstacleRef,
  setIntervalsId,
  intervalsId,
  moveObstacle,
  movePlayer
}) => {
  const [points, setPoints] = useState(0);
  const [lap, setLap] = useState(lapConfig.LAP_START);
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setPause] = useState(false);
  const [hasFinished, setHasFinish] = useState(false);
  const [outcome, setOutcome] = useState('');
  const [savePoints] = useMutation(SAVE_POINTS);

  const handleResumeGame = useCallback(() => {
    if (isPaused) {
      console.log('[Resuming Game...]');

      setPause(false);
      introAudio.play();
      // setCanvasBg(canvasBgAnimated);
      //re-start startPoints function
      const startIntervalId = startPoints(setPoints, points);
      setIntervalsId(prevState => [...prevState, startIntervalId]);
      //re-start moveObject function
      moveObstacle();
      //addEventListener for movePlayer
      document.addEventListener('keydown', movePlayer);
    }
  }, [setIntervalsId, setPause, movePlayer, moveObstacle, isPaused, setPoints]);
  const pauseGame = useCallback(() => {
    if (!isPaused) {
      console.log('[Game Paused]');
      //set Pause to false
      setPause(true);
      // setCanvasBg(canvasBgStatic);
      introAudio.pause();
      intervalsId.forEach(interval => clearInterval(interval));
      setIntervalsId([null]); //added to update keyboardActions listener
      document.removeEventListener('keydown', movePlayer);
    }
  }, [setIntervalsId, intervalsId, movePlayer, isPaused]);

  const keyboardActions = useCallback(
    event => {
      switch (event.keyCode) {
        case 27:
          pauseGame();
          break;
        case 13:
          handleResumeGame();
          break;
        default:
          break;
      }
    },
    [pauseGame, handleResumeGame]
  );

  const gameOver = useCallback(
    async (outcome, points) => {
      console.log('[GameOver]');
      // setCanvasBg(canvasBgStatic);
      setHasFinish(true);
      setSeconds(0);
      setOutcome(outcome);
      intervalsId.forEach(interval => {
        clearInterval(interval);
      });
      introAudioStop();

      document.removeEventListener('keydown', movePlayer);
      document.removeEventListener('keydown', keyboardActions);

      // await savePoints({
      //   variables: {
      //     email: playerEmail,
      //     name: playerName,
      //     points: `${points}`
      //   }
      // })
      //   .then(data => console.log('data', data))
      //   .catch(err => console.log('err', err));

      if (outcome === 'WIN') {
        console.log('YAY o/. [YOU WIN]');
      } else if (outcome === 'LOST') {
        console.log('OhOh. [YOU LOSE]');
      }
    },
    [intervalsId, movePlayer, keyboardActions, playerEmail, playerName, savePoints]
  );

  const quitGame = () => {
    introAudioStop();
    setHasFinish(false);
    setResetGame(true);
    console.log(' [Quitting...]');
  };

  const restartGame = () => {
    console.log('[Restarting...]');
    introAudioStop();
    setHasFinish(false);
    setRestartMatch(true);
  };

  useEffect(() => {
    if (intervalsId.length && start) {
      document.addEventListener('keydown', keyboardActions);
      return () => document.removeEventListener('keydown', keyboardActions);
    }
  }, [intervalsId, keyboardActions, start]);

  // start Game after timer
  useEffect(() => {
    if (!restartMatch && !resetGame) {
      timer(3, setSeconds, setIntervalsId).then(shouldStart => {
        if (shouldStart) {
          setStart(true);
          setCanvasBg(canvasBgAnimated);
          setIsMuted(false);
          introAudio.volume = 1;
          introAudio.play();
        }
      });
    }
  }, [restartMatch, resetGame, setIntervalsId, setStart]);

  // check state of start and initialize points and update interval array state
  useEffect(() => {
    if (start) {
      const pointsIntervalId = startPoints(setPoints);
      setIntervalsId(prevState => [...prevState, pointsIntervalId]);
      console.log('[Starting....]');
    }
  }, [start, setIntervalsId]);

  // collision
  useEffect(() => {
    if (!resetGame && !restartMatch) {
      if (playerRef.current && obstacleRef.current) {
        const hasCollided = checkCollision(
          obstacleRef.current.getBoundingClientRect(),
          playerRef.current.getBoundingClientRect(),
          0.96
        );
        if (hasCollided) gameOver('LOST', points);
      }
    }
  }, [playerRef, obstacleRef, setStart, gameOver, points, resetGame, restartMatch]);

  //lap
  useEffect(() => {
    if (seconds < 0) {
      const positiveSeconds = seconds * -1;
      const lapNumber = lapConfig[`LAP${positiveSeconds}`];
      if (lapNumber) {
        if (lapNumber === 'GAME_OVER') gameOver('WIN', points);
        else setLap(lapNumber);
      }
    }
  }, [seconds, gameOver, points]);

  return (
    <InterfaceBox>
      <Header>
        <Laps>{start && `LAP: ${lap}`}</Laps>
        {start && (
          <>
            <SoundPanel
              onClick={() => {
                if (!hasFinished) {
                  introToggleVolume();
                  setIsMuted(prevState => !prevState);
                }
              }}
            >
              <SoundIcon
                src={isMuted ? Sounds.ICON_MUTED : Sounds.ICON_PLAYING}
                alt="Icon made by Muhammad Haq from www.freeicons.io  https://freeicons.io/profile/823"
              />
            </SoundPanel>
            <Points>{`SCORE: ${points}`}</Points>
          </>
        )}
      </Header>
      <TimerSeconds>
        {!start && seconds}
        <br />
      </TimerSeconds>

      {isPaused && (
        <Box>
          <BoxTitle>GAME PAUSED</BoxTitle>
          <BoxSubtitle>[OR PRESS ENTER]</BoxSubtitle>
          <InterfaceButton onClick={() => handleResumeGame()}>RESUME </InterfaceButton>
        </Box>
      )}
      {hasFinished && (
        <Box>
          <BoxTitle> {endMessage[outcome].title}</BoxTitle>
          <BoxSubtitle> {endMessage[outcome].message}</BoxSubtitle>
          <BoxButton>
            <FinalButton onClick={restartGame}>RESTART GAME </FinalButton>
            <FinalButton onClick={quitGame}> QUIT GAME </FinalButton>
          </BoxButton>
        </Box>
      )}
    </InterfaceBox>
  );
};

export default Interface;
