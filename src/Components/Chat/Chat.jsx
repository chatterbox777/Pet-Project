import React from "react";
import classTags from "./Chat.module.css";
class Chat extends React.Component {
  state = {
    text: "",
    id: "",
  };

  changeInputValue = (e) => {
    const {
      target: { value },
    } = e;
    this.setState({ text: value, id: Date.now().toString() });
  };

  handleSubmit = (e) => {
    console.log(e.target.closest("input"));
    e.preventDefault();
    if (!this.state.text.trim()) {
      return;
    }
    this.props.addMessage(this.state);
  };

  render() {
    return (
      <div className={classTags.disp}>
        <div className={classTags.window}>
          <ul>
            {this.props.messages.map((item) => (
              <li key={item.id}>
                {item.text}
                <span onClick={() => this.props.deleteMessage(item.id)}>X</span>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            className={classTags.inputText}
            type="text"
            placeholder="Введите сообщение"
            onChange={this.changeInputValue}
          />
          <button>Отправить</button>
        </form>
      </div>
    );
  }
}

export default Chat;
