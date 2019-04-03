import React from "react";

export default class Home extends React.Component {
  state = {
    name: "home"
  };

  render() {
    return (
      <>
        <div>
          <h1>hello in my {this.state.name}</h1>
        </div>
      </>
    );
  }
}
