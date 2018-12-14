import React, { Component } from "react";

import { theme } from "../../../constants/Theme.js";

// Styled componets
import ElementComp from "./Element.js";
import ClickArea from "./ClickArea.js";

// Helper
import { getSpeed } from "../../../utils/helper.js";

class Element extends Component {
  constructor(props) {
    super(props);
    this.update = false;
  }
  shouldComponentUpdate() {
    return this.update;
  }
  state = { clicked: false };
  componentDidMount = () => {
    this.checkForAnimationEnd();
  };

  checkForAnimationEnd = () => {
    const element = document.getElementById(
      `animation-${this.props.elementId}`
    );
    element.addEventListener("animationend", () => {
      this.setState({ clicked: true });
      this.props.missElement(this.props.elementId);
    });
  };
  clickElement() {
    console.log('#####')
    this.setState({ clicked: true });
    this.props.hitElement(this.props.elementId);
  }

  render() {
    const icons = theme.images;
    const array = Object.keys(icons);
    const icon = array[Math.floor(Math.random() * 4)];
    const iconValue = icons[icon];
    const yCoordinate = Math.floor(Math.random() * 50);
    const speed = getSpeed(this.props.round, this.props.stepsize);

    return (
      <ClickArea
        // Use onClick for Desktop
        // onClick={event => this.clickElement()}
        onTouchStart={event => this.clickElement()}
        speed={speed}
        yCoordinate={yCoordinate}
        xCoordinate={this.props.xCoordinate}
        clicked={this.state.clicked}
        id={`animation-${this.props.elementId}`}
      >
        <ElementComp src={iconValue} id='img'/>
      </ClickArea>
    );
  }
}

export default Element;
