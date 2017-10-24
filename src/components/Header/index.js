import React from 'react';
import styled from 'styled-components';
import {
  HEADER_COLOR,
  HEADER_HEIGHT,
} from '../../constants/styles';

const H1 = styled.h1`
  font-size: 20px;
  font-weight: normal;
  color: white;
  display: ${props => (props.inline ? 'inline-block' : 'block')};
  margin: 0;
  padding: 0;
`;

const IconWrapper = styled.div`
  position: relative;
  display: inline-block;
  height: 12px;
  width: 18px;
  margin-right: 36px;
`;

const HamburgerBar = (height, top, background) => `
  display: block;
  height: ${height};
  top: ${top};
  content: " ";
  position: absolute;
  width: 100%;
  background: ${background};
`;

const Hamburger = styled.div`
  position: absolute;
  top: 0px;
  ${HamburgerBar('2px', '0', 'white')}

  &:after {
    ${HamburgerBar('2px', '5px', 'white')}
  }

  &:before {
    ${HamburgerBar('2px', '10px', 'white')}
  }
`;

const Icon = () => (
  <IconWrapper><Hamburger /></IconWrapper>
);

const Header = styled.header`
  position: fixed;
  background: ${HEADER_COLOR};
  height: ${HEADER_HEIGHT};
  top: 0;
  width: 100vw;
  padding-left: 19px;
  display: flex;
  align-items: center;
  box-shadow: -5px 0px 15px black;
  z-index: 1;
`;

export default () => (
  <Header>
    <Icon />
    <H1 inline>Messages</H1>
  </Header>
);
