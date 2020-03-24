import React from 'react';
// import styled from 'styled-components';

//using styled components makes the gif image to be flickering when an update occurred (flickers on render)
// const Background = styled.div`
//     display: flex;
//     background-image: url("/images/canvas_bg.gif");
//     background-repeat: no-repeat;
//     background-position: center;
//     height: 95vh;
//
// `;
// const Canvas = () => <Background/>;

const Canvas = ({children}) => <div style={{
    display: "flex",
    backgroundImage: `url("/images/canvas_bg.gif")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "1000px 1000px",
    width: "100vw",
    position: "absolute",
    zIndex: "-1",
    height: "95vh"
}}>{children}</div>;



export default Canvas;