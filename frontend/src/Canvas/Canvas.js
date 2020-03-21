import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
    display: flex;
    background-image: url("/images/canvas_bg.gif");
    background-repeat: no-repeat;
    background-position: center;
    height: 95vh;
    
`;

const Canvas = ({children}) => <Background>{children}</Background>;


export default Canvas;