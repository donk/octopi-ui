import React, { FC } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { FOREGROUND_COLOR, BACKGROUND_COLOR } from '../config';

const DURATION_FORMAT = 'd [days], h [hours], m [minutes], s [seconds]';

const StyledStatBox = styled.div`
  background: ${BACKGROUND_COLOR};
  position:fixed;
  top:0;right:0;
  padding: 25px;
  width:auto;
  border-left: 5px solid;
  border-bottom: 5px solid;
  border-color: ${FOREGROUND_COLOR};
  transition:border-color 0.1s linear;
  animation:rainbow 0.3s infinite;

  .rb{
    transition: color 0.02s linear;
      animation: rainbow 0.2s infinite;
  }

  .Stat__item {
    margin-bottom: 25px;
    text-align: center;
    font-weight: 700;

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
      transition:color 0.1s linear;
      animation:rainbow 0.3s infinite;
      
    }

    &-value {
      font-size: 18px;
      color: #dcdcdc;
    }
  }
`;

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
  jobState?: any;
  layerState: any;
  printerState: any;
}

const StatBox: FC<Props> = ({
  layerState,
  printerState,
}) => {
  const { heightCurrent, heightTotal, layerAverageDuration, layerLastDuration } = layerState;
  const { bedTemp, printerTemp } = printerState;

  return (
    <StyledStatBox>
      <div className="Stat__item">
        <div className="Stat__item-label">Bed Temperature</div>
        <div className="Stat__item-value">{bedTemp}° C</div>
      </div>
      <div className="Stat__item">
        <div className="Stat__item-label">Nozzle Temperature</div>
        <div className="Stat__item-value">{printerTemp}° C</div>
      </div>
      <div className="Stat__item">
        <div className="Stat__item-label">Current Height</div>
        <div className="Stat__item-value">{heightCurrent}mm</div>
      </div>
      <div className="Stat__item">
        <div className="Stat__item-label">Print Height</div>
        <div className="Stat__item-value">{heightTotal}mm</div>
      </div>
      <div className="Stat__item">
        <div className="Stat__item-label">Average Layer Duration</div>
        <div className="Stat__item-value">{moment.duration(layerLastDuration, 's').format(DURATION_FORMAT)}</div>
      </div>
      <div className="Stat__item">
        <div className="Stat__item-label">Last Layer Duration</div>
        <div className="Stat__item-value">{moment.duration(layerAverageDuration, 's').format(DURATION_FORMAT)}</div>
      </div>
      <div className="Stat__item">
        <div className="Stat__item-label">Filament Used</div>
        <div className="Stat__item-value rb">Amolen PLA - Rainbow</div>
      </div>
    </StyledStatBox>
  );
};

export default StatBox;
