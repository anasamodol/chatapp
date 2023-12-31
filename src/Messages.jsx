import {Component, React} from "react";

class Messages extends Component {
  render() {
    const {messages, currentMember} = this.props;
    return (
      <ul className="Messages-list">
        {messages.map(msg => this.renderMessage(msg, currentMember))}
      </ul>
    );
  }

  renderMessage(message, currentMember) {
    const {member, text} = message;
    const messageFromMe = member.username === currentMember.username;
    const className = messageFromMe ?
     "Messages-message currentMember" : "Messages-message";
    return (
      <li className={className} key={message.messageId}>
        <span
          className="avatar"
          style={{backgroundColor: member.color}}
        />
        <div className="Message-content">
          <div className="username">
            {member.username}
          </div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  }
}

export default Messages;
