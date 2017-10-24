import React from 'react';
import styled, { keyframes } from 'styled-components';
import {
  HEADER_COLOR,
  HEADER_HEIGHT,
} from '../../constants/styles';

// Based on https://projects.lukehaas.me/css-loaders/

const animate = keyframes`
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
`;

const common = `
  background: ${HEADER_COLOR};
  animation: ${animate} 1s infinite ease-in-out;
  width: 1em;
  height: 4em;
`;

const Loader = styled.div`
  ${common}

  color: ${HEADER_COLOR};
  text-indent: -9999em;
  position: relative;
  font-size: 8px;
  transform: translateZ(0);
  animation-delay: -0.16s;

  &:before {
    ${common}
    position: absolute;
    top: 0;
    content: '';
    left: -1.5em;
    animation-delay: -0.32s;
  }
  &:after {
    ${common}
    position: absolute;
    top: 0;
    content: '';
    left: 1.5em;
  }
`;

const LoaderWrapper = styled.div`
  height: ${HEADER_HEIGHT};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default () => (
  <LoaderWrapper><Loader /></LoaderWrapper>
);
