import React from "react";
import GlobalForm from "./../gobal-form";
import { shallow } from "enzyme";

const emptyFunction = () => {};

const defaultProps = {
  validations: {
    isPenaltyValid: true,
    isUserNameValid: true,
    isDescriptionValid: true,
    isAcountablePartnerValid: true
  },
  actions: {
    onChangeGoalUsername: emptyFunction,
    onChangeGoalDescription: emptyFunction,
    onChangeGoalDeadline: emptyFunction,
    onChangeGoalAcountablePartner: emptyFunction,
    onChangeGoalPenalty: emptyFunction,
    onChangeGoalStatus: emptyFunction,
    onSubmit: emptyFunction,
    onFocus: emptyFunction
  },
  errors: [],
  touched: {
    username: false,
    description: false,
    deadline: false,
    accountablePartner: false,
    penalty: false,
    status: false
  },
  goal: {
    username: "Manuel",
    description: "Go to gym twice at week",
    deadline: new Date(),
    accountablePartner: "Rebeca",
    penalty: "5",
    status: "New"
  },
  buttonName: "Create"
};

function setUp(props = {}) {
  return shallow(<GlobalForm {...defaultProps} {...props} />);
}

describe("<GlobalForm/>", () => {
  it("handles on change succesfully", () => {
    var today = new Date();
    var tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

    const fieldNames = {
      username: "Rebeca",
      description: "Go to gym twice at week",
      dealdline: tomorrow,
      accountablePartner: "Manuel"
    };

    const onChangeFake = jest.fn();

    const wrapper = setUp({
      actions: {
        ...defaultProps.actions,
        onChangeGoalUsername: onChangeFake,
        onChangeGoalDescription: onChangeFake,
        onChangeGoalDeadline: onChangeFake,
        onChangeGoalAcountablePartner: onChangeFake,
        onChangeGoalPenalty: onChangeFake,
        onChangeGoalStatus: onChangeFake
      }
    });

    Object.keys(fieldNames).forEach(function(name) {
      const usernameField = wrapper.find(`[name="${name}"]`);
      usernameField.simulate("change", {
        target: { value: fieldNames[name] }
      });

      expect(onChangeFake).toHaveBeenCalledWith({
        target: { value: fieldNames[name] }
      });
    });
  });

  it("handles on submit", () => {
    const onSubmit = jest.fn();
    const wrapper = setUp({
      actions: { ...defaultProps.actions, onSubmit }
    });
    wrapper.find("Form").props().onSubmit();
    expect(onSubmit).toHaveBeenCalled();
  });

  it("renders errors message when form contains some errors", () => {
    const errors = ["Some forms fields are invalid"];
    const wrapper = setUp({
      errors
    });
    wrapper.find("Message");

    expect(wrapper.find("Message").props()).toMatchObject({
      error: true,
      header: "There was some errors with your submission",
      list: errors
    });
  });

  it("handles on focus", () => {
    const fieldNames = {
      username: "Rebeca",
      description: "Go to gym twice at week",
      accountablePartner: "Manuel"
    };

    const fieldTouched = [];
    const onFocusFake = fieldName => {
      fieldTouched.push(fieldName);
    };

    const wrapper = setUp({
      actions: {
        ...defaultProps.actions,
        onFocus: onFocusFake
      }
    });

    Object.keys(fieldNames).forEach(function(name) {
      const fieldName = wrapper.find(`[name="${name}"]`);
      fieldName.simulate("focus", {
        target: { value: fieldNames[name] }
      });

      const found = fieldTouched.find(function(field) {
        return field === name;
      });

      expect(found).toEqual(name);
    });
  });

  it("does not render field error when validations succeded and inputs are touched", () => {
    const touched = {
      username: true,
      description: true,
      deadline: true,
      accountablePartner: true,
      penalty: true,
      status: true
    };

    const validations = {
      isPenaltyValid: true,
      isUserNameValid: true,
      isDescriptionValid: true,
      isAcountablePartnerValid: true
    };

    const wrapper = setUp({
      touched,
      validations
    });

    wrapper.find("input").forEach(input => {
      expect(input.parent().props().error).not.toBeUndefined();
      expect(input.parent().props().error).toBe(false);
    });
  });

  it("does not render field error when validations succeded and input are not touched", () => {
    const touched = {
      username: false,
      description: false,
      deadline: false,
      accountablePartner: false,
      penalty: false,
      status: false
    };

    const validations = {
      isPenaltyValid: true,
      isUserNameValid: true,
      isDescriptionValid: true,
      isAcountablePartnerValid: true
    };

    const wrapper = setUp({
      touched,
      validations
    });

    wrapper.find("input").forEach(input => {
      expect(input.parent().props().error).not.toBeUndefined();
      expect(input.parent().props().error).toBe(false);
    });
  });

  it("renders field errors when validations are failed and input are touched", () => {
    const touched = {
      username: true,
      description: true,
      deadline: true,
      accountablePartner: true,
      penalty: true,
      status: true
    };

    const validations = {
      isPenaltyValid: false,
      isUserNameValid: false,
      isDescriptionValid: false,
      isAcountablePartnerValid: false
    };

    const wrapper = setUp({
      touched,
      validations
    });

    wrapper.find("input").forEach(input => {
      expect(input.parent().props().error).not.toBeUndefined();
      expect(input.parent().props().error).toBe(true);
    });
  });

  it("renders field errors when validations are failed and input are not touched", () => {
    const touched = {
      username: false,
      description: false,
      deadline: false,
      accountablePartner: false,
      penalty: false,
      status: false
    };
    const validations = {
      isPenaltyValid: false,
      isUserNameValid: false,
      isDescriptionValid: false,
      isAcountablePartnerValid: false
    };

    const wrapper = setUp({
      touched,
      validations
    });

    wrapper.find("input").forEach(input => {
      expect(input.parent().props().error).not.toBeUndefined();
      expect(input.parent().props().error).toBe(false);
    });
  });
});
