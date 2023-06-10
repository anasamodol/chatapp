import "./App.css";
import React, { Component } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { randomColor, randomName } from "./random";

class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomColor(),
    },
  };

  componentDidMount() {
    this.drone = new window.Scaledrone("iQ5oxOQbYCN1LueX", {
      data: this.state.member,
    });
    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });
    const room = this.drone.subscribe("observable-room");
    room.on("message", (message) => {
      const text = message.data;
      const member = message.member.clientData;
      const messageId = message.id;
      const state = this.state;
      const messages = state.messages;
      const messageIdExists = messages.some(
        (message) => message.messageId === messageId
      );
      if (messageIdExists) {
        return;
      }

      messages.push({ member, text: text, messageId: messageId });
      this.setState({ messages: messages });
    });
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message: message,
    });
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>My Chat App</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }
}

export default App;
