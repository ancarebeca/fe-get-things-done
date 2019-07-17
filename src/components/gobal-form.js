import React from "react";
import { Grid, Form, Button } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";

export default function GlobalForm({ validations, goal, actions, buttonName }) {
  return (
    <Grid.Row>
      <Grid.Column width={16}>
        <Form onSubmit={actions.onSubmit}>
          <Form.Field>
            <label>Username: </label>
            <input
              type="text"
              value={goal.user_name}
              onChange={actions.onChangeGoalUserName}
            />
          </Form.Field>
          <Form.Field>
            <label>Description: </label>
            <input
              type="text"
              value={goal.description}
              onChange={actions.onChangeGoalDescription}
            />
          </Form.Field>
          <Form.Field>
            <label>Deadline: </label>
            <DatePicker
              selected={goal.deadline}
              onChange={actions.onChangeGoalDeadline}
            />
          </Form.Field>
          <Form.Field>
            <label>Accountable Partner: </label>
            <input
              type="text"
              value={goal.accountable_partner}
              onChange={actions.onChangeGoalAcountablePartner}
            />
          </Form.Field>
          <Form.Field error={!validations.isPenaltyValid}>
            <label>Penalty: </label>
            <input
              type="text"
              value={goal.penalty}
              onChange={actions.onChangeGoalPenalty}
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
    deadline: PropTypes.string.isRequired,
    accountable_partner: PropTypes.string.isRequired,
    penalty: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired
  }),

  action: PropTypes.shape({
    onChangeGoalUserName: PropTypes.func.isRequired,
    onChangeGoalDescription: PropTypes.func.isRequired,
    onChangeGoalDeadline: PropTypes.func.isRequired,
    onChangeGoalAcountablePartner: PropTypes.func.isRequired,
    onChangeGoalPenalty: PropTypes.func.isRequired,
    onChangeGoalStatus: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  }),

  validations: PropTypes.shape({
    isPenaltyValid: PropTypes.bool.isRequired
  }),

  buttonName: PropTypes.string.isRequired
};
