import React from "react";
import CreateGoal from "./../create-goal.component";
import { shallow } from "enzyme";

const emptyFunction = () => {};

const defaultProps = {
  history: {
    push: emptyFunction
  }
};

function setUp(props = {}) {
  return shallow(<CreateGoal {...defaultProps} {...props} />);
}

describe("<CreateGoal/>", () => {
  it("handles on change succesfully", () => {
    const wrapper = setUp();
    const actions = wrapper.find("GlobalForm").props().actions;
    expect();
  });
});
