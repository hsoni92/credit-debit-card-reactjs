import React from 'react';
import PropTypes from 'prop-types';
import {
  IconHistory
} from '@tabler/icons-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './TaskWidget.less';

// https://codesandbox.io/p/sandbox/vymm4oln6y?file=%2Findex.js%3A180%2C24-180%2C35

class TaskWidget extends React.Component {
  render() {
    let { classes, percentage, type, title, progressInfo, duration } = this.props;
    let PRIMARY_COLOR = '#eee';
    switch (type) {
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
              value={percentage}
              text={`${percentage}`}
              circleRatio={1}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 8,
                pathColor: PRIMARY_COLOR,
                textColor: PRIMARY_COLOR,
                trailColor: "#284351"
              })}
            />
          </div>
          <div className="info">
            <div style={{ textTransform: 'capitalize', fontWeight: '500' }}>
              {type}
            </div>
            <div className="flex-row" style={{ fontSize: '13px', marginTop: '10px' }}>
            <IconHistory size={15} />
            <span style={{ paddingLeft: '5px' }}>{`${duration} to finish`}</span>
          </div>
          </div>
        </div>
        <div className="action">
          <button className="action-btn">Summary</button>
        </div>
      </div>
    );
  }
}

TaskWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  percentage: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default TaskWidget;