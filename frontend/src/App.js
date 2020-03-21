import React, {useState} from 'react';
import Canvas from "./Canvas/Canvas";
import Player from "./Player/Player"
import Menu from "./Menu/Menu";
import Interface from "./Interface/Interface";
import useMove from "./Player/useMove";
import playerConfig from "./Player/playerConfig";

const App = () => {
    {/*// <Initialize/>*/
    }
    // console.log(display);
    const [playerPosition, movePlayer] = useMove(playerConfig.LEFT);
    const [start, setStart] = useState(false);
    const [initialize, setInitialize] = useState(false);

    return <>
        <Canvas>
            {initialize ?
                <Interface playerPosition={playerPosition}
                           start={start}
                           setStart={setStart}
                />
                : < Menu setInitialize={setInitialize}/>

            }
            {start && <Player movePlayer={movePlayer}
                              playerPosition={playerPosition}
                              display={start}/>
            }
        </Canvas>

    </>
};


export default App;
