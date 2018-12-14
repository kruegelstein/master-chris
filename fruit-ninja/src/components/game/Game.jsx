import React, { Component } from "react";

// Styled componets
import GameComp from "./Game.js";
import Button from "../general/Button.js";

import Elements from "./Elements/ElementsContainer.js";

class Game extends Component {

  start = () => {
    this.props.startGame();
  };
  render() {
    if (!this.props.isResults) {
      return (
        <div id="outerGameComp">
          <GameComp userId={this.props.userId} id="innerGameComp">
            <Elements />
            {!this.props.gameStarted ? (
              <Button middle onClick={() => this.start()}>
                Start!
              </Button>
            ) : null}
          </GameComp>
        </div>
      );
    }
    return null;
  }
}

export default Game;
