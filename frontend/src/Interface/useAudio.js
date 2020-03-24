const useAudio = (url) => {

    const audio = new Audio(url);

    const play = () => audio.play();
    const stop = () => audio.stop();
    const toggleVolume = () => audio.volume = audio.volume ? 0 : 1;
    return [audio, play, stop, toggleVolume]

};
export default useAudio;