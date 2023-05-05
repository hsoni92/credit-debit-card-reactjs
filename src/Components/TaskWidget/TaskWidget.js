import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import Card from '@material-ui/core/Card';
import Tooltip from '@material-ui/core/Tooltip';
import CardActions from '@material-ui/core/CardActions';
import './TaskWidget.css';
import {
  PieChart, Pie, Cell,
} from 'recharts';

const styles = theme => ({
  card: {
    width: '100%',
    maxWidth: 300,
    height: 400
  },
  header: {
    backgroundColor: "#336278",
    color: "#90A4AE",
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px 0px 12px 0px',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    backgroundColor: '#1C4354'
  },
  topPanel: {
    backgroundColor: "#336278",
    height: 140,
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  percentBox: {
    fontSize: "2em",
    padding: "0.3em",
    margin: "0.1em",
    borderRadius: '4px'
  }
});

class TaskWidget extends React.Component {
  getColorTheme = (type) => {
    let NUM_COLOR = "#CDDC39";
    let NUM_BG = "rgba(205,220,57,0.1)";
    let DONUT_BG = "rgba(255,255,255,0.1)";
    let DONUT_COLORS = [
      NUM_COLOR,
      'rgba(255,255,255,0.1)',
    ];
    switch (type) {
      case 'success':
        NUM_COLOR = "#CDDC39";
        NUM_BG = "rgba(205,220,57,0.1)";
        break;
      case 'error':
        NUM_COLOR = "#f44336";
        NUM_BG = "rgba(244,67,54,0.1)";
        break;
      case 'warning':
        NUM_COLOR = "#FFCA28";
        NUM_BG = "rgba(255,202,42,0.1)";
        break;
      default:
        break;
    }
    DONUT_COLORS = [
      NUM_COLOR,
      DONUT_BG,
    ];
    return { DONUT_COLORS, NUM_COLOR, NUM_BG };

  }
  render() {
    let { classes, percentage, type, title, progressInfo, duration } = this.props;
    if (type === "error") {
      duration = 'Unable';
    };
    const { NUM_COLOR, DONUT_COLORS, NUM_BG } = this.getColorTheme(type);
    const data = [
      {
        name: 'Completed',
        value: percentage
      },
      {
        name: 'Remaining',
        value: (100 - percentage)
      }
    ];

    return (
        <Card className={classes.card}>
          <span className={classes.header}>
            {title}
            <Tooltip title={progressInfo} aria-label="add" placement="right-start">
              <InfoIcon style={{ marginLeft: '5px'}} fontSize="small"/>
            </Tooltip>
          </span>
          <div className={classes.topPanel}>
            <PieChart width={220} height={200} onMouseEnter={this.onPieEnter}>
              <Pie
                data={data}
                cx={105}
                cy={60}
                startAngle={210}
                endAngle={-30}
                innerRadius={41}
                outerRadius={59}
                fill="#8884d8"
                paddingAngle={0}
                stroke={0}
                dataKey="value"
              >
                {data.map((_, index) =>
                  <Cell
                    key={`cell-${index}`}
                    fill={DONUT_COLORS[index % DONUT_COLORS.length]} />)}
              </Pie>
            </PieChart>
          </div>
          <CardActions className={classes.actions} disableActionSpacing>
            <div style={{ fontSize: "0.85em", color: "#999", marginBottom: '1em' }}>
              Overall Job Progress
            </div>
            <div>
              <span className={classes.percentBox} style={{ color: NUM_COLOR, backgroundColor: NUM_BG }} >
                {percentage}
              </span>
              <span style={{ fontSize: "0.7em", color: NUM_COLOR }} >
                {`${duration} to finish`}
              </span>
            </div>
          </CardActions>
        </Card>
    );
  }
}

TaskWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  percentage: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default withStyles(styles)(TaskWidget);
