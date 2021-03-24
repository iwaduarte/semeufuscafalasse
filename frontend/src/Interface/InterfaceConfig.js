import ICON_PLAYING from '../assets/images/icons/playing.svg';
import ICON_MUTED from '../assets/images/icons/muted.svg';
import INTRO from '../assets/sounds/running_LQ.mp3';
import FINISHED from '../assets/sounds/finished_HQ.mp3';

const lapConfig = {
  // default lap
  LAP_START: 1,
  LAP30: 2,
  // 60 seconds considering player speed 1 and acceleration 0 (no-turbo) - hashing/map
  LAP60: 'FINAL',
  LAP90: 'GAME_OVER',
  // LAP120: 5,
  // LAP150: 'FINAL',
  // LAP180: 'GAME_OVER',
  LAP_TOTAL: 4
};
const endMessage = {
  WIN: {
    title: 'Congratulations!',
    message: 'You have ended the race. Go brag about it!'
  },
  LOST: {
    title: 'Ops! :(',
    message: 'You have lost. How about trying again?'
  }
};

const Sounds = {
  INTRO,
  FINISHED,
  // Icon made by Muhammad Haq from www.freeicons.io  https://freeicons.io/profile/823
  ICON_PLAYING,
  // Icon made by Muhammad Haq from www.freeicons.io  https://freeicons.io/profile/823
  ICON_MUTED
};

export { lapConfig, endMessage, Sounds };
