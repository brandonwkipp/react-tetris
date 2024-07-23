import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { music } from '../../unit/music';
import style from './index.less';

const upload = ({ name }) => {
  const [fileName, setFileName] = useState('');

  const listener = (e) => {
    if (e.target.files[0].type.includes('audio')) {
      setFileName(e.target.files[0].name);
      music.fetch(name, URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className={cn({ [style.uploadContainer]: true })}>
      <label htmlFor={`upload-${name}`}>
        Upload ({name})
        {' '}
        {fileName && <span>{fileName}</span>}
      </label>
      <input id={`upload-${name}`} onChange={(e) => listener(e)} type="file" />
    </div >
  );
};

upload.propTypes = {
  name: PropTypes.string.isRequired,
};

export default upload;
