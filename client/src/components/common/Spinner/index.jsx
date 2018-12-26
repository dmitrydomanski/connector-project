import React from 'react';
import spin from './spinner.gif';

const spinner = () => (
    <img
        src={spin}
        style={{
            width: '200px',
            margin: 'auto',
            display: 'block',
        }}
        alt="Loading..."
    />
);
export default spinner;
