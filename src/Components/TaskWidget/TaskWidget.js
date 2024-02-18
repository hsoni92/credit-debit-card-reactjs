import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  IconHistory
} from '@tabler/icons-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './TaskWidget.less';

// https://codesandbox.io/p/sandbox/vymm4oln6y?file=%2Findex.js%3A180%2C24-180%2C35

const types = [
  'error',
  'warning',
  'success',
  'running'
];

export default function TaskWidget (props) {
    let { percentage, type, title, progressInfo, duration } = props;
    const [durationState, setDurationState] =  useState(duration);
    const [percentState, setPercentState] =  useState(percentage);
    const [typeState, setTypeState] =  useState(type);

    const getPrimaryColor = () => {
      let PRIMARY_COLOR = '#eee';
      switch (typeState) {
        case 'error':
          PRIMARY_COLOR = '#ee6055';
          break;
        case 'warning':
          PRIMARY_COLOR = '#ffd97d';
          break;
        case 'success':
          PRIMARY_COLOR = '#aaf683';
          break;
        case 'running':
          PRIMARY_COLOR = '#72ddf7';
          break;
        default:
          break;
      }
      return PRIMARY_COLOR;
    }

    if (type === "error") {
      duration = 'Unable';
    };

    return (
      <div className="card" style={{ width: '200px', height: '350px' }}>
        <div className="header">
          {title}
        </div>
        <div className="body">
          <div className="task-label">
            <span>LLaMA 65B</span>
          </div>
          <div className="graph-container">
            <CircularProgressbar
              value={percentState}
              text={`${percentState}`}
              circleRatio={1}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 8,
                pathColor: getPrimaryColor(),
                textColor: getPrimaryColor(),
                trailColor: "#284351"
              })}
            />
          </div>
          <div className="info">
            <div style={{ textTransform: 'capitalize', fontWeight: '500', color: getPrimaryColor() }}>
              {typeState}
            </div>
            <div className="flex-row" style={{ fontSize: '13px', marginTop: '10px' }}>
              <IconHistory size={15} />
              <span style={{ paddingLeft: '5px' }}>{`${durationState}h to finish`}</span>
            </div>
          </div>
        </div>
        <div className="action">
          <button onClick={ () => {
            setDurationState(Math.floor(Math.random() * 23) + 1);
            setPercentState(Math.floor(Math.random() * 97) + 1);
            setTypeState(types[Math.floor(Math.random() * 3) + 0]);
          }} className="action-btn">Summary</button>
        </div>
      </div>
    );
};
