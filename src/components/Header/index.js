import React from 'react';
import styled from 'styled-components';
import { HEADER_HEIGHT } from '../../constants/styles';

const H1 = styled.h1`
  font-size: 1.5em;
  color: white;
  display: ${props => (props.inline ? 'inline-block' : 'block')};
  margin: 0;
  padding: 0;
`;

const Icon = styled.span`
  display: inline-block;
  height: 12px;
  width: 18px;
  margin-right: 29px;
  background-color: white;
`;

const Header = styled.header`
  position: fixed;
  background: #673ab7;
  height: ${HEADER_HEIGHT};
  top: 0;
  width: 100vw;
  padding-left: 19px;
  display: flex;
  align-items: center;
`;

export default () => (
  <Header>
    <Icon />
    <H1 inline>Messages</H1>
  </Header>
);
