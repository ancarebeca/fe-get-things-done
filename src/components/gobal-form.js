import React from 'react';
import { Grid, Form, Button, Message } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

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
            error={!validations.isDescriptionValid && touched['description']}
          >
            <label>Description: </label>
            <input
              id="description"
              name="description"
              type="text"
              value={goal.description}
              onChange={actions.onChangeGoalDescription}
              onFocus={actions.onFocus('description')}
            />
          </Form.Field>
          <Form.Field>
            <label>Deadline: </label>
            <DatePicker
              id="dealdline"
              name="dealdline"
              selected={goal.deadline}
              onChange={actions.onChangeGoalDeadline}
              minDate={new Date()}
            />
          </Form.Field>
          <Form.Field
            error={
              !validations.isAcountablePartnerValid &&
              touched['accountablePartner']
            }
          >
            <label>Accountable Partner: </label>
            <input
              type="text"
              id="accountablePartner"
              name="accountablePartner"
              value={goal.accountablePartner}
              onChange={actions.onChangeGoalAcountablePartner}
              onFocus={actions.onFocus('accountablePartner')}
            />
          </Form.Field>
          <Form.Field error={!validations.isPenaltyValid && touched['penalty']}>
            <label>Penalty: </label>
            <input
              type="text"
              value={goal.penalty}
              onChange={actions.onChangeGoalPenalty}
              onFocus={actions.onFocus('penalty')}
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
    description: PropTypes.string.isRequired,
    deadline: PropTypes.instanceOf(Date).isRequired,
    accountablePartner: PropTypes.string.isRequired,
    penalty: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
  }),

  action: PropTypes.shape({
    onChangeGoalDescription: PropTypes.func.isRequired,
    onChangeGoalDeadline: PropTypes.func.isRequired,
    onChangeGoalAcountablePartner: PropTypes.func.isRequired,
    onChangeGoalPenalty: PropTypes.func.isRequired,
    onChangeGoalStatus: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired
  }),

  validations: PropTypes.shape({
    isPenaltyValid: PropTypes.bool.isRequired,
    isDescriptionValid: PropTypes.bool.isRequired,
    isAcountablePartnerValid: PropTypes.bool.isRequired
  }),

  buttonName: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string)
};

GlobalForm.defaultProps = {
  errors: [],
  touched: PropTypes.shape({
    description: false,
    deadline: false,
    accountablePartner: false,
    penalty: false,
    status: false
  })
};
