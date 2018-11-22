import React, { Component } from "react";

// Styled componets
import UserIdInputComp from "./UserIdInput.js";
import Input from "../general/Input.js";
import Title from "../general/Title.js";
import Paragraph from "../general/Paragraph.js";
import BlockContainer from "../general/BlockContainer.js";
import Button from "../general/Button.js";
import Stepsize from "./Stepsize.js";

const STEP_SIZES = ["Linear", "Half", "Smart"];

class UserIdInput extends Component {
  state = {
    inputValue: "",
    selectedStepsize: "Linear"
  };
  onTextinputChange = (event: Event) => {
    const newInput = event.target.value;
    this.setState({
      inputValue: newInput
    });
  };

  onSubmit() {
    this.props.onStart(this.state.inputValue, this.state.selectedStepsize);
  }

  selectStepsize(stepsize) {
    this.setState({ selectedStepsize: stepsize });
  }

  render() {
    if (!this.props.userId) {
      return (
        <UserIdInputComp>
          <Title>Fruit Ninja</Title>
          <BlockContainer>
            <Paragraph>Please enter a user id:</Paragraph>
            <Input
              onChange={this.onTextinputChange}
              value={this.state.inputValue}
              placeholder="Enter ID"
              autoFocus
            />
          </BlockContainer>
          <BlockContainer margin="4rem 0 0 0">
            {STEP_SIZES.map((stepsize, index) => (
              <Stepsize
                key={index}
                selected={this.state.selectedStepsize === stepsize}
                onClick={() => this.selectStepsize(stepsize)}
              >
                {stepsize}
              </Stepsize>
            ))}
          </BlockContainer>
          <BlockContainer margin="4rem 0 0 0">
            <Button onClick={() => this.onSubmit()}>Start!</Button>
          </BlockContainer>
        </UserIdInputComp>
      );
    } else return null;
  }
}

export default UserIdInput;
