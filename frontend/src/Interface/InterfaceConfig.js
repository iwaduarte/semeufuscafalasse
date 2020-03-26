const lapConfig = {

    LAP_START: 1, //default lap
    LAP30: 2,
    LAP60: 3, //60 seconds considering player speed 1 and acceleration 0 (no-turbo) - hashing/map
    LAP90: 4,
    LAP120: 5,
    LAP150: 'FINAL',
    LAP180: 'GAME_OVER',
    LAP_TOTAL: 7,
};
const endMessage = {
    WIN: {
        title: "Congratulations!",
        message: "You have ended the race. Go brag about it!"
    },
    LOST: {
        title: "Ops! :(",
        message: "You have lost. How about trying again?"
    }

};

const Sounds = {
    INTRO: "/sounds/running_LQ.mp3",
    FINISHED: "/sounds/finished_HQ.mp3",
    ICON_PLAYING: "/images/icons/playing.svg",  //Icon made by Muhammad Haq from www.freeicons.io  https://freeicons.io/profile/823
    ICON_MUTED: "/images/icons/muted.svg"       //Icon made by Muhammad Haq from www.freeicons.io  https://freeicons.io/profile/823
};

export {lapConfig, endMessage, Sounds};