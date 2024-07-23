import store from '../store';

// 使用 Web Audio API
const AudioContext = (
  window.AudioContext ||
  window.webkitAudioContext ||
  window.mozAudioContext ||
  window.oAudioContext ||
  window.msAudioContext
);

const hasWebAudioAPI = {
  data: !!AudioContext && location.protocol.indexOf('http') !== -1,
};

let mainBuffer;
let pauseBuffer;

const music = {};
const samples = {
  clear: null,
  fall: null,
  gameover: null,
  main: null,
  move: null,
  pause: null,
  rotate: null,
  start: null,
};

(() => {
  if (!hasWebAudioAPI.data) return;

  const context = new AudioContext();

  const getSource = (buffer) => {
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    return source;
  };

  music.fetch = (sampleName, url) => {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'arraybuffer';
    request.onload = function () {
      const undecodedAudio = request.response;
      context.decodeAudioData(undecodedAudio, (data) => {
        samples[sampleName] = data;
        return;
      }, (error) => {
        if (window.console && window.console.error) {
          window.console.error(`音频: ${url} 读取错误`, error);
          hasWebAudioAPI.data = false;
        }
      });
    };
    request.send();
  };

  music.start = () => {
    if (store.getState().get('music').mute) {
      return;
    }
    if (pauseBuffer) pauseBuffer.stop();
    if (samples.start) {
      getSource(samples.start).start(0);
    }
    if (samples.main) {
      mainBuffer = getSource(samples.main);
      mainBuffer.loop = true;
      mainBuffer.start(0);
    }
  };

  music.clear = () => {
    if (store.getState().get('music').mute) {
      return;
    }
    if (samples.clear) {
      getSource(samples.clear).start(0);
    }
  };

  music.fall = () => {
    if (store.getState().get('music').mute) {
      return;
    }
    if (samples.fall) {
      getSource(samples.fall).start(0);
    }
  };

  music.gameover = () => {
    if (store.getState().get('music').mute) {
      return;
    }
    if (mainBuffer) mainBuffer.stop();
    if (samples.gameover) {
      getSource(samples.gameover).start(0);
    }
  };

  music.pause = () => {
    if (store.getState().get('music').mute) {
      return;
    }
    if (samples.pause) {
      if (mainBuffer) mainBuffer.stop();
      pauseBuffer = getSource(samples.pause);
      pauseBuffer.loop = true;
      pauseBuffer.start(0);
    }
  };

  music.move = () => {
    if (store.getState().get('music').mute) {
      return;
    }
    if (samples.move) {
      getSource(samples.move).start(0);
    }
  };

  music.resume = () => {
    if (store.getState().get('music').mute) {
      return;
    }
    if (samples.main) {
      if (pauseBuffer) pauseBuffer.stop();
      mainBuffer = getSource(samples.main);
      mainBuffer.loop = true;
      mainBuffer.start(0);
    }
  };

  music.rotate = () => {
    if (store.getState().get('music').mute) {
      return;
    }
    if (samples.rotate) {
      getSource(samples.rotate).start(0);
    }
  };
})();

module.exports = {
  hasWebAudioAPI,
  music,
};

