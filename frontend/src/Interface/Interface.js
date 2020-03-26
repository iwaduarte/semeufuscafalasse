import {lapConfig, endMessage, Sounds} from './InterfaceConfig';
import React, {useCallback, useEffect, useState} from 'react';
import {startPoints, checkCollision} from "./Engine";
import {
    InterfaceBox,
    Header, Laps, Points, TimerSeconds,
    Box, BoxTitle, BoxSubtitle, BoxButton,
    SoundPanel, SoundIcon, InterfaceButton, FinalButton
} from "./InterfaceStyled";

import {gql} from 'apollo-boost';
import {useMutation} from '@apollo/react-hooks';

import useAudio from "../myHooks/useAudio";

const SAVE_POINTS = gql`
    mutation savePoints($points: String!,$name: String!, $email: String!) {
        savePoints(points: $points, name: $name, email: $email) {
            id
            points
            user {
                name
            }
        }
    }
`;

// promise timer
const timer = (seconds, setSeconds, setIntervalsId) => {
    const timer = seconds * 1000;
    const dateNow = Date.now();
    return new Promise((resolve, reject) => {
        const intervalId = setInterval(() => {
            const time = Date.now() - dateNow;   // elapsed time;
            const displaySeconds = seconds - Math.floor(time / 1000); //elapsed time in as a countdown
            setSeconds(displaySeconds);
            if (time >= timer) {
                // clearInterval(intervalId);
                resolve(true);
            }
        }, 50);
        setIntervalsId(prevState => [...prevState, intervalId]);

    });
};
const [introAudio, introStop, introToggleVolume] = useAudio(Sounds.INTRO);

const Interface = ({
                       resetAll, setResetAll, resetGame, setResetGame,
                       playerName, playerEmail,
                       start, setStart,
                       playerRef, obstacleRef, setIntervalsId, intervalsId,
                       moveObstacle, movePlayer
                   }) => {
    const [points, setPoints] = useState(0);
    const [lap, setLap] = useState(lapConfig.LAP_START);
    const [seconds, setSeconds] = useState(0);

    const [isMuted, setIsMuted] = useState(false);
    const [isPaused, setPause] = useState(false);
    const [hasFinished, setHasFinish] = useState(false);
    const [outcome, setOutcome] = useState("");
    const [savePoints, {data}] = useMutation(SAVE_POINTS);

    //fn /@Todo move to Engine.js
    const handleResumeGame = useCallback(() => {
            if (isPaused) {
                console.log('[Resuming Game...]');
                //set Pause to false
                setPause(false);
                //sound Play
                introAudio.play();
                //re-start startPoints function
                const startIntervalId = startPoints(setPoints, points);
                setIntervalsId(prevState => [...prevState, startIntervalId]);
                //re-start moveObject function
                moveObstacle();
                //addEventListener for movePlayer
                document.addEventListener("keydown", movePlayer);

            }

        },
        [setIntervalsId, setPause, movePlayer, moveObstacle, isPaused, setPoints]);
    const pauseGame = useCallback(() => {
        if (!isPaused) {
            console.log('[Game Paused]');
            //set Pause to false
            setPause(true);
            introAudio.pause();
            intervalsId.forEach(interval => clearInterval(interval));
            setIntervalsId([null]); //added to update keyboardActions listener
            document.removeEventListener("keydown", movePlayer);
        }
    }, [setIntervalsId, intervalsId, movePlayer, isPaused]);

    //fn keyboard key's other than the player interaction
    const keyboardActions = useCallback((event) => {
        switch (event.keyCode) {
            //left - (a) || arrow Left
            case 27:
                pauseGame();
                break;
            case 13:
                handleResumeGame();
                break;
            default:
                break;
        }
    }, [pauseGame, handleResumeGame]);

    //game is Over
    const gameOver = useCallback(async (outcome, points) => {
        console.log('[GameOver]');
        //menu box with ended game
        setHasFinish(true);
        //outcome message
        setOutcome(outcome);
        //clear intervals
        intervalsId.forEach(interval => {
            clearInterval(interval)
        });

        //removeEventListener
        document.removeEventListener("keydown", movePlayer);
        document.removeEventListener("keydown", keyboardActions);

        //savePoints
        await savePoints({
            variables: {
                email: playerEmail,
                name: playerName,
                points: `${points}`,
            }
        }).then(data => console.log('data', data));

        // setStart(false);
        introStop();

        if (outcome === 'WIN') {
            console.log('YAY o/. [YOU WIN]')
        }
        if (outcome === 'LOST') {
            console.log('OhOh. [YOU LOSE]')
        }
        //Display GameOver [options: restart, quit (goes to first screen)]
        //
    }, [intervalsId, movePlayer, keyboardActions]);

    //leaving to main menu
    const quitGame = () => {
        //stopping sound and reset time
        introStop();
        setHasFinish(false);
        setResetAll(true);
        console.log(' [Quitting...]')
    };

    //restarting to countdown
    const restartGame = () => {
        console.log('[Restarting...]');
        introStop();
        // intervalsId.forEach(interval => clearInterval(interval));
        // console.log(intervalsId);
        setHasFinish(false);
        setResetGame(true);
    };

    // listening to user events: (PAUSE, START)
    useEffect(() => {
        if (intervalsId.length) {
            document.addEventListener('keydown', keyboardActions);
            return () => document.removeEventListener('keydown', keyboardActions);
        }
    }, [intervalsId, keyboardActions]);

    // start Game after timer
    useEffect(() => {

        if (!resetGame && !resetAll) {
            (async () => {
               await timer(3, setSeconds, setIntervalsId).then(shouldStart => {
                    if (shouldStart) {
                        setStart(true);
                        introAudio.play();
                    }
                });
            })();
        }
    }, [resetGame, resetAll, setIntervalsId, setStart]);

    // check state of start and initialize points and update interval array state
    useEffect(() => {
        if (start) {
            const pointsIntervalId = startPoints(setPoints);
            setIntervalsId(prevState => [...prevState, pointsIntervalId]);
            console.log('[Starting....]');
        }
    }, [start, setIntervalsId]);

    // collision check of sprites
    useEffect(() => {
        if (!resetAll && !resetGame) {

            if (playerRef.current && obstacleRef.current) {
                const hasCollided = checkCollision(
                    obstacleRef.current.getBoundingClientRect(),
                    playerRef.current.getBoundingClientRect()
                  , 0.96);
                if (hasCollided) gameOver('LOST', points);
            }

        }

    }, [playerRef, obstacleRef, setStart, gameOver]);

    // checking lap and final game
    // using negative values since calculation is done by having a countdown timer
    useEffect(() => {
        if (seconds < 0) {
            const newSeconds = seconds * -1;
            const lapNumber = lapConfig[`LAP${newSeconds}`];
            if (lapNumber) {
                if (lapNumber === 'GAME_OVER')
                    return gameOver('WIN', points);
                setLap(lapNumber)
            }
        }
    }, [seconds, gameOver]);

    return <InterfaceBox>
        <Header>
            <Laps>
                {start && `LAP: ${lap}`}
            </Laps>
            {start && <>
                <SoundPanel onClick={() => {
                    introToggleVolume();
                    setIsMuted(prevState => !prevState);
                }}>
                    <SoundIcon src={isMuted ? Sounds.ICON_MUTED : Sounds.ICON_PLAYING}
                               alt="Icon made by Muhammad Haq from www.freeicons.io  https://freeicons.io/profile/823"
                    />
                </SoundPanel>
                <Points>
                    {`SCORE: ${points}`}
                </Points>
            </>
            }
        </Header>
        <TimerSeconds>
            {!start && seconds}
            <br/>
        </TimerSeconds>

        {isPaused &&
        <Box>
            <BoxTitle>GAME PAUSED</BoxTitle>
            <BoxSubtitle>[OR PRESS ENTER]</BoxSubtitle>
            <InterfaceButton onClick={() => handleResumeGame()}>RESUME </InterfaceButton>
        </Box>}
        {hasFinished &&
        <Box
        >
            <BoxTitle>  {endMessage[outcome].title}</BoxTitle>
            <BoxSubtitle> {endMessage[outcome].message}</BoxSubtitle>
            <BoxButton>
                <FinalButton onClick={restartGame}>RESTART GAME </FinalButton>
                <FinalButton onClick={quitGame}> QUIT GAME </FinalButton>
            </BoxButton>
        </Box>
        }
    </InterfaceBox>;
};


export default Interface;