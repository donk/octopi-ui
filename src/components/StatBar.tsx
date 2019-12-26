import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';
import moment from 'moment';

import { FOREGROUND_COLOR, BACKGROUND_COLOR } from '../config';

const DURATION_FORMAT = 'd [days], h [hours], m [minutes], s [seconds]';

const rotateAnimation = keyframes`
  100% {
    background-position: 20px 0;
  }
`;

const StyledStatBar = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;

  .StatBar__progress {
    height: 10px;
    background: ${BACKGROUND_COLOR};
    transform-origin: center bottom;

    &-bar {
      position: relative;
      height: 100%;
      background: ${FOREGROUND_COLOR};
      transition: width 300ms,  background-color 0.1s linear;
      animation: rainbowbg 0.3s infinite;

      &:before {
        position: absolute;
        content: '';
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: repeating-linear-gradient(
          55deg,
          rgba(0,0,0,0.1),
          rgba(0,0,0,0.1) 8px,
          rgba(0,0,0,0.2) 8px,
          rgba(0,0,0,0.2) 16px
        );
        background-size: 20px;
        animation: 1.5s ${rotateAnimation} linear infinite;
      }
    }
  }

  .StatBar__stats {
    display: flex;
    align-items: center;
    background: ${BACKGROUND_COLOR};
    color: #dcdcdc;
    padding: 20px 25px;

    .Stat__filename {
      font-weight: 700;
      font-size: 20px;
      margin: 0 0 3px;
    }

    .Stat__state {
      font-size: 14px;
      font-weight: 500;
      font-style: italic;
      opacity: 0.5;
    }

    .Stat__time {
      font-weight: 700;
      line-height: 1;
    }

    .Stat__item {
      display: inline-flex;
      flex-flow: column;
      margin-right: 45px;
      text-align: center;

      &:last-child {
        margin: 0;
      }

      &-label {
        color: ${FOREGROUND_COLOR};
        font-size: 14px;
        text-transform: uppercase;
        line-height: 1;
        opacity: 0.8;
        margin: 0 0 3px;
      }

      &-value {
        font-size: 18px;
      }
    }

    .Stat__percent {
      font-size: 14px;
      font-weight: 300;
      font-style: italic;
      opacity: 0.7;
    }

    &-left {
      margin-right: 10px;
    }

    &-right {
      margin-left: auto;
      text-align: right;
    }
  }
`;

const STATE_MAP: { [key: string]: string } = {
  'Operational': 'Printer Idle',
};

// interface Props {
//   durationCurrent: number;
//   durationEstimate: number;
//   durationPercent: number;
//   durationRemaining: number;
//   filamentLength?: number;
//   filamentVolume?: number;
//   fileName: string;
//   layers: any;
//   state: string;
// }

interface Props {
  jobState: any;
  layerState: any;
  printerState?: any;
}

const StatBar: FC<Props> = ({
  jobState,
  layerState,
}) => {
  const { durationCurrent, durationEstimate, durationPercent, durationRemaining, fileName, state } = jobState;
  const { layerCurrent, layerTotal } = layerState;

  const formattedPercentage = Math.min(durationPercent, 100).toFixed(2);

  const renderState = (state: string) => {
    if (state === 'Printing') {
      return (
        <>
          {state || 'Idle'}
          {state === 'Printing' && ` - Layer ${layerCurrent} / ${layerTotal} (${formattedPercentage}%)`}
        </>
      );
    }

    return STATE_MAP[state] || state;
  };

  return (
    <StyledStatBar>
      <div className="StatBar__progress">
        <div className="StatBar__progress-bar" style={{ width: `${formattedPercentage}%` }}></div>
      </div>
      <div className="StatBar__stats">
        <div className="StatBar__stats-left">
          <div className="Stat__filename">{fileName || 'BobRoss.gcode'}</div>
          <div className="Stat__state">{renderState(state)}</div>
        </div>
        <div className="StatBar__stats-right">
          <div className="Stat__time">
            <div className="Stat__item">
              <div className="Stat__item-label">Elapsed Time</div>
              <div className="Stat__item-value">{moment.duration(durationCurrent, 's').format(DURATION_FORMAT)}</div>
            </div>
            <div className="Stat__item">
              <div className="Stat__item-label">Time Remaining</div>
              <div className="Stat__item-value">{moment.duration(durationRemaining, 's').format(DURATION_FORMAT)}</div>
            </div>
            {durationEstimate && <div className="Stat__item">
              <div className="Stat__item-label">Estimated Time</div>
              <div className="Stat__item-value">{moment.duration(durationEstimate, 's').format(DURATION_FORMAT)}</div>
            </div>}
          </div>
        </div>
      </div>
    </StyledStatBar>
  );
};

export default StatBar;
