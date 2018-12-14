import React, { Component } from "react";
import SquareComp from "./Square.js";

class Square extends Component {
  render() {
    return (
      <SquareComp
        id="square"
        active={this.props.active}
        size={this.props.size}
        margin={this.props.margin}
      />
    );
  }
}

export default Square;
