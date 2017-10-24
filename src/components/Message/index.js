import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import Waypoint from 'react-waypoint';
import styled from 'styled-components';
import Avatar from '../Avatar';
import Timestamp from '../Timestamp';

const MessageWrapper = styled.div`
  border-bottom: 1px solid #e5e5e5;

  &:first-child{
    margin-top: 9px;
  }

  &:last-child{
    border-bottom: none;
  }
`;

const InnerMessageWrapper = styled.div`
  padding: 15px 17px 18px;
`;

const P = styled.p`
  padding: 0;
  margin: 0;
`;

const Title = styled.h1`
  font-size: 14px;
  font-weight: bold;
  padding: 0;
  margin: 0;
`;
const Subtitle = styled(P)`
  padding-top: 4px;
  font-size: 12px;
`;
const Content = styled(P)`
  font-size: 14px;
  line-height: 20px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 14px;
`;

const Header = styled.div`
  margin-left: 16px;
`;

const MaxLen = (props) => {
  const {
    max,
    children,
  } = props;

  if (children.length > max) {
    return `${children.substr(0, max)}....`;
  }

  return children;
};

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnSwiped = this.handleOnSwiped.bind(this);
    this.state = {
      isActive: true,
    };
  }

  remove() {
    this.props.onDelete(this.props.message.id);
  }

  handleOnSwiped() {
    this.setState({
      deleted: true,
    });
  }

  handleOnDelete() {
    if (this.state.deleted) {
      this.props.onDelete(this.props.message.id);
    }
  }

  toggleActive(isActive) {
    this.setState({
      isActive,
    });
  }

  render() {
    const { message } = this.props;
    const { isActive } = this.state;

    return (
      <MessageWrapper>
        <SwipeableViews
          onChangeIndex={() => this.handleOnSwiped()}
          onTransitionEnd={() => this.handleOnDelete()}
        >
          <InnerMessageWrapper>
            <Row>
              <Waypoint
                onEnter={() => this.toggleActive(true)}
                onLeave={() => this.toggleActive(false)}
                fireOnRapidScroll={false}
              />
              <Avatar size={40} src={message.user.profilePic} alt={message.user.name} />
              <Header>
                <Title>{message.user.name}</Title>
                <Subtitle><Timestamp timestamp={message.timestamp} isActive={isActive} /></Subtitle>
              </Header>
            </Row>
            <Content><MaxLen max={200}>{message.content}</MaxLen></Content>
          </InnerMessageWrapper>
          <div>&nbsp;</div>
        </SwipeableViews>
      </MessageWrapper>
    );
  }
}

Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      profilePic: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Message;
