import styled from "styled-components";

const InterfaceBox = styled.div`
    display: flex; 
    position: absolute;
    z-index: 10;
    flex-direction: column;
    top:0;
    left:0;
    right: 0;
    bottom:0;
    margin: 0 auto;

`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
`;
const TimerSeconds = styled.div`
    align-self: center;
    font-size: 8rem;
    font-weight:bold;
    color: white;
`;
const Points = styled.div`
    display: inline-block;
    font-size: 3rem;
    font-weight:bold;
    color: #154caf;
    margin-right: 1rem;
`;
const Laps = styled(Points)`
    margin-left: 1rem;
`;
const Box = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 3rem;
    color: #0cb76f;
    font-weight: bold;
    background: #fff;
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
const BoxButton = styled.div`
    display: flex;
    justify-content: space-around;
`;
const InterfaceButton = styled.button`
    padding: 3% 4%;
    margin: 5% 16%;
    cursor: pointer;
    font-size: 1.1rem;
    cursor: pointer;
    &:hover{
    background-color: grey;
    color: #fff;
    }
`;
const FinalButton = styled(InterfaceButton)`
        margin: 5% 5%;
`;

const SoundPanel = styled.div``;
const SoundIcon = styled.img`
    margin: 1rem 0;
    height: 66px;
    position:absolute;
    left:46%;
    cursor: pointer;
    &:hover{
    transform: scale(1.1);
}
`;


export {
    InterfaceBox,
    TimerSeconds,
    Points,
    Laps,
    Box,
    BoxTitle,
    BoxSubtitle,
    BoxButton,
    Header,
    SoundPanel,
    SoundIcon,
    InterfaceButton,
    FinalButton
}