import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Image = styled.img`
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  border-radius: ${props => (props.size / 2)}px;
`;

const CircleBlockImage = styled(Image)`
`;

export const Avatar = ({ path }) => (
  <CircleBlockImage src="http://lorempixel.com/200/200/" size={50} alt={path} />
);

Avatar.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Avatar;
