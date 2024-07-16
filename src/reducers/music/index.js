import * as reducerType from '../../unit/reducerType';
import { lastRecord } from '../../unit/const';
import { hasWebAudioAPI } from '../../unit/music';

let initState = lastRecord && lastRecord.music !== undefined
  ? { mute: !!lastRecord.music.mute }
  : { mute: false };

if (!hasWebAudioAPI.data) {
  initState = {
    mute: false,
  };
}
const music = (state = initState, action) => {
  switch (action.type) {
    case reducerType.MUSIC_MUTE:
      if (!hasWebAudioAPI.data) { // 若浏览器不支持 WebAudioApi, 将无法播放音效
        return Object.assign({}, state, { mute: false });
      }
      return Object.assign({}, state, { mute: action.data });
    default:
      return state;
  }
};

export default music;
