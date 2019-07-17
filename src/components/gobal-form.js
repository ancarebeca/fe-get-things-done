import React from "react";
import { Grid, Form, Button } from "semantic-ui-react";
import DatePicker from "react-datepicker";

export default function GlobalForm({ validations, goal, actions, buttonName }) {
  console.log("Inside GlobalForm ");

  console.log({ goal }, goal.user_name);
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

// GlobalForm.propTypes = {
//   goal: PropTypes.shape({
//     color: PropTypes.string,
//     fontSize: PropTypes.number
//   }),
//   action:PropTypes.shape({
//     onChangeGoalAcountablePartner: PropTypes.func.isrequired,
//     fontSize: PropTypes.number
//   }),
// };

// GlobalForm.defaultProps = {
//   goal: PropTypes.shape({
//     color: PropTypes.string,
//     fontSize: PropTypes.number
//   }),
//   action:PropTypes.shape({
//     onChangeGoalAcountablePartner: () => {},
//     fontSize: PropTypes.number
//   }),
// };
