import React, { FC } from 'react';
import styled from 'styled-components';

import STLViewer from './STLViewer';

import { FOREGROUND_COLOR, BACKGROUND_COLOR } from '../config';

const MODEL_SIZE = [352,210]; 
const CAMERA_SIZE = [542, 307];

const StyledPreviewBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  .PreviewBar__model {
    background: ${BACKGROUND_COLOR};
    border-right: 5px solid ;
    border-top: 5px solid;
    border-color: ${FOREGROUND_COLOR};
    width: ${MODEL_SIZE[0]}px;
    height: ${MODEL_SIZE[1]}px;
    align-self:flex-end;
    transition:border-color 0.1s linear;
    animation:rainbow 0.3s infinite;
  }

  .PreviewBar__camera {
    background: ${BACKGROUND_COLOR};
    border-left: 5px solid;
    border-top: 5px solid;
    border-color: ${FOREGROUND_COLOR};
    width: ${CAMERA_SIZE[0]}px;
    height: ${CAMERA_SIZE[1]}px;
    transition:border-color 0.1s linear;
    animation:rainbow 0.3s infinite;
  }
`;

interface Props {}

const PreviewBar: FC<Props> = ({}) => {
  return (
    <StyledPreviewBar>
      <div className="PreviewBar__model"></div>
      <div className="PreviewBar__camera"></div>
    </StyledPreviewBar>
  );
};

export default PreviewBar;
