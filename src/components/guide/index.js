import React from 'react';
import style from './index.less';

import Upload from '../upload';
import { isMobile } from '../../unit';
import { transform } from '../../unit/const';

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
          <form style={{ marginBottom: 0 }}>
            <Upload name="clear" />
            <Upload name="fall" />
            <Upload name="gameover" />
            <Upload name="move" />
            <Upload name="rotate" />
            <Upload name="start" />
            <Upload name="main" />
            {/* <Upload name="pause" /> */}
          </form>
          <div className={style.space}>SPACE</div>
        </div>
      </div>
    );
  }
}

