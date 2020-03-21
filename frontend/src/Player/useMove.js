import React, {useState, useEffect} from 'react';


const useMove = (initialPositionLeft) => {
    const [positionLeft, setPositionLeft] = useState(initialPositionLeft);
    // const [positionBottom, setPositionBottom] = useState(0);

    //below we would have: movePlayer, moveSprite, moveEtc functions.
    const movePlayer = (event) => {
        switch (event.keyCode) {
            //left - (a) || arrow Left
            case 37:
            case 65:
                console.log('moving left');
                setPositionLeft(prevState => prevState - 5);
                break;
            //right - (d) || arrow Right
            case 39:
            case 68:
                console.log('moving right');
                setPositionLeft(prevState => prevState + 5);

                break;
            //middle - (s)
            case 83:
                console.log('moving center');
                setPositionLeft(initialPositionLeft);
                break;
            // turbo - (w) || (arrow Up)
            case 38:
            case 87:
                console.log('turbo');
                break;
            // break - (f)
            case 70:
                console.log('breaking');
        }
    };
    return [positionLeft, movePlayer];
};

export default useMove;