import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Swipeable from 'react-swipeable';
import Waypoint from 'react-waypoint';
import Avatar from '../Avatar';
import Timestamp from '../Timestamp';

const MessageWrapper = styled.div`
  border-bottom: 1px solid #e5e5e5;
  padding: 15px 17px 18px;

  &:first-child{
    margin-top: 9px;
  }

  &:last-child{
    border-bottom: none;
  }
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
    return children.substr(0, max)+'....';
  }

  return children;
};

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnSwipedLeft = this.handleOnSwipedLeft.bind(this);
    this.state = {
      isActive: true,
    };
  }

  remove() {
    this.props.onDelete(this.props.message.id);
  }

  handleOnSwipedLeft(e, deltaX, complete) {
    if (complete) {
      this.remove();
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
      <Waypoint
        onEnter={() => this.toggleActive(true)}
        onLeave={() => this.toggleActive(false)}
        fireOnRapidScroll={false}
      >
        <MessageWrapper>
          <Swipeable
            onSwipedLeft={this.handleOnSwipedLeft}
          >
            <Row>
              <Avatar size={40} profilePic={message.user.profilePic} name={message.user.name} />
              <Header>
                <Title>{message.user.name} ({message.id})</Title>
                <Subtitle><Timestamp timestamp={message.timestamp} isActive={isActive} /></Subtitle>
              </Header>
            </Row>
            <Content><MaxLen max={200}>{message.content}</MaxLen></Content>
          </Swipeable>
        </MessageWrapper>
      </Waypoint>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Message;
