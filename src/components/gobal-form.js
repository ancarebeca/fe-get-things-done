import React from "react";
import { Grid, Form, Button, Message } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";

export default function GlobalForm({
  validations,
  goal,
  actions,
  buttonName,
  errors,
  touched
}) {
  return (
    <Grid.Row>
      <Grid.Column width={16}>
        <Form onSubmit={actions.onSubmit} error={errors.length > 0}>
          <Form.Field
            error={!validations.isUserNameValid && touched["user_name"]}
          >
            <label>Username: </label>
            <input
              type="text"
              value={goal.user_name}
              onChange={actions.onChangeGoalUserName}
              onFocus={actions.onFocus("user_name")}
            />
          </Form.Field>
          <Form.Field
            error={!validations.isDescriptionValid && touched["description"]}
          >
            <label>Description: </label>
            <input
              type="text"
              value={goal.description}
              onChange={actions.onChangeGoalDescription}
              onFocus={actions.onFocus("description")}
            />
          </Form.Field>
          <Form.Field>
            <label>Deadline: </label>
            <DatePicker
              selected={goal.deadline}
              onChange={actions.onChangeGoalDeadline}
              minDate={new Date()}
            />
          </Form.Field>
          <Form.Field
            error={
              !validations.isAcountablePartnerValid &&
              touched["accountable_partner"]
            }
          >
            <label>Accountable Partner: </label>
            <input
              type="text"
              value={goal.accountable_partner}
              onChange={actions.onChangeGoalAcountablePartner}
              onFocus={actions.onFocus("accountable_partner")}
            />
          </Form.Field>
          <Form.Field error={!validations.isPenaltyValid && touched["penalty"]}>
            <label>Penalty: </label>
            <input
              type="text"
              value={goal.penalty}
              onChange={actions.onChangeGoalPenalty}
              onFocus={actions.onFocus("penalty")}
            />
          </Form.Field>
          <Form.Field>
            <label>Status: </label>
            <input
              type="text"
              value={goal.status}
              onChange={actions.onChangeGoalStatus}
            />
          </Form.Field>
          <Message
            error
            header="There was some errors with your submission"
            list={errors}
          />
          <Button primary content={buttonName} />
        </Form>
      </Grid.Column>
    </Grid.Row>
  );
}

GlobalForm.propTypes = {
  goal: PropTypes.shape({
    user_name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    deadline: PropTypes.instanceOf(Date).isRequired,
    accountable_partner: PropTypes.string.isRequired,
    penalty: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
  }),

  action: PropTypes.shape({
    onChangeGoalUserName: PropTypes.func.isRequired,
    onChangeGoalDescription: PropTypes.func.isRequired,
    onChangeGoalDeadline: PropTypes.func.isRequired,
    onChangeGoalAcountablePartner: PropTypes.func.isRequired,
    onChangeGoalPenalty: PropTypes.func.isRequired,
    onChangeGoalStatus: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired
  }),

  validations: PropTypes.shape({
    isPenaltyValid: PropTypes.bool.isRequired
  }),

  buttonName: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  touched: PropTypes.shape({
    user_name: PropTypes.bool.isRequired,
    description: PropTypes.bool.isRequired,
    deadline: PropTypes.bool.isRequired,
    accountable_partner: PropTypes.bool.isRequired,
    penalty: PropTypes.bool.isRequired,
    status: PropTypes.bool.isRequired
  })
};

GlobalForm.defaultProps = {
  errors: []
};
