import styled from "styled-components";

const InterfaceBox = styled.div`
    display: flex; 
    position: absolute;
    width: 100%;
    flex-direction: column;
  `;
const TimerSeconds = styled.div`
    align-self: center;
    font-size: 8rem;
    font-weight:bold;
    color: white;
`;
const Points = styled.div`
    position:absolute;
    right: 15%;
    font-size: 3rem;
    font-weight:bold;
    color: #154caf;
`;
const Laps = styled(Points)`
    left: 15%;
`;
const Box = styled.div`
    font-size: 3rem;
    color: #0cb76f;
    font-weight: bold;
    background: #fff;
    margin: 5% auto;
    padding: 1% 30%;
`;
const BoxTitle = styled.h3`
    margin:0;
`;
const BoxSubtitle = styled.h6`
    color: gray;
    margin:0;
    text-align: center
`;
const  BoxButton = styled.button`
padding: 3% 5%;
margin: 0 33%;
cursor: pointer;
&:hover{
background-color: grey;
color: #fff;
}
`;


export {InterfaceBox, TimerSeconds, Points, Laps, Box, BoxTitle, BoxSubtitle,BoxButton}