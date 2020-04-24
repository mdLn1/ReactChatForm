import React, { Component } from "react";
import PropTypes from "prop-types";

// message component to show in the chat box like form component

class Message extends Component {
  render() {
    const { side, spanType, text } = this.props;
    return (
      <div className={`${side}-message`}>
        <span className={spanType}>{text}</span>
      </div>
    );
  }
}

Message.defaultProps = {
  side: "left",
  spanType: "",
  text: "Default text",
};

Message.propTypes = {
  side: PropTypes.string,
  spanType: PropTypes.string,
  text: PropTypes.string,
};

export default Message;
