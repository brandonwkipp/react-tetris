import React from 'react';
import style from './index.less';

import { isMobile } from '../../unit';
import { transform } from '../../unit/const';
import { music } from '../../unit/music';


export default class Guide extends React.Component {
  constructor() {
    super();
    this.state = {
      isMobile: isMobile(),
    };
  }

  render() {
    if (this.state.isMobile) {
      return (
        null
      );
    }

    const listener = (e) => {
      if (e.target.files[0].type.includes('audio')) {
        music.fetch(e.target.name, URL.createObjectURL(e.target.files[0]));
      }
    };

    return (
      <div style={{ display: this.state.isMobile ? 'none' : 'block' }}>
        <div className={`${style.guide} ${style.right}`}>
          <div className={style.up}>
            <em style={{ [transform]: 'translate(0,-3px) scale(1,2)' }} />
          </div>
          <div className={style.left}>
            <em style={{ [transform]: 'translate(-7px,3px) rotate(-90deg) scale(1,2)' }} />
          </div>
          <div className={style.down}>
            <em style={{ [transform]: 'translate(0,9px) rotate(180deg) scale(1,2)' }} /></div>
          <div className={style.right}>
            <em style={{ [transform]: 'translate(7px,3px)rotate(90deg) scale(1,2)' }} />
          </div>
        </div>
        <div className={`${style.guide} ${style.left}`}>
          <form>
            <label htmlFor="clear">Upload file (Clear)</label>
            <input name="clear" onChange={(e) => listener(e)} type="file" />

            <label htmlFor="fall">Upload file (Fall)</label>
            <input name="fall" onChange={(e) => listener(e)} type="file" />

            <label htmlFor="gameover">Upload file (Gameover)</label>
            <input name="gameover" onChange={(e) => listener(e)} type="file" />

            <label htmlFor="move">Upload file (Move)</label>
            <input name="move" onChange={(e) => listener(e)} type="file" />

            <label htmlFor="rotate">Upload file (Rotate)</label>
            <input name="rotate" onChange={(e) => listener(e)} type="file" />

            <label htmlFor="start">Upload file (Start)</label>
            <input name="start" onChange={(e) => listener(e)} type="file" />
          </form>
          <div className={style.space}>SPACE</div>
        </div>
      </div>
    );
  }
}

