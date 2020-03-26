//it is not a hook yet, the goal is to be

const useAudio = (url) => {

    const audio = new Audio(url);
    const stop = () => {
        audio.pause();
        audio.currentTime = 0;
    };
    const toggleVolume = () => {
        audio.volume = audio.volume ?  0 : 1
    };
    return [audio, stop, toggleVolume]

};
export default useAudio;