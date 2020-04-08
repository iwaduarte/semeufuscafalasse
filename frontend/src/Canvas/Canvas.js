import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
    display: flex;
    background-image: url("/images/canvas_bg.gif");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 1000px 1000px;
    width: 1000px;
    margin: auto;
    position: absolute;
    z-index: -1;
    height: 95vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;
const Canvas = ({children}) => <Background>{children}</Background>;


export default Canvas;