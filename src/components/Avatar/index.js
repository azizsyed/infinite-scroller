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

export const Avatar = ({ name, profilePic, size }) => (
  <CircleBlockImage src={profilePic} size={size} alt={name} />
);

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  profilePic: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default Avatar;
