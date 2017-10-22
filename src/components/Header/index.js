import React from 'react';
import styled from 'styled-components';
import { HEADER_HEIGHT } from '../../constants/styles';

const H1 = styled.h1`
  font-size: 1.5em;
  color: palevioletred;
  display: ${props => (props.inline ? 'inline-block' : 'block')};
  margin: 0;
  padding: 0;
  line-height: ${HEADER_HEIGHT};
`;

const Icon = styled.span`
  display: inline-block;
  height: 20px;
  width: 20px;
  padding-right: 20px;
  background-color: orange;
`;

const Header = styled.header`
  position: fixed;
  background: purple;
  height: ${HEADER_HEIGHT};
  top: 0;
  width: 100vw;
`;

export default () => (
  <Header>
    <Icon />
    <H1 inline>Messages</H1>
  </Header>
);
