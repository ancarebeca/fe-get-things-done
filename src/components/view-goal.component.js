import React, { Component } from 'react';
import axios from 'axios';
import { Header, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import 'react-datepicker/dist/react-datepicker.css';

export default class ViewGoal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goal: {
        username: '',
        description: '',
        deadline: new Date(),
        accountablePartner: '',
        penalty: '0',
        status: 'new',
        startedAt: new Date()
      }
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:4000/goals/${this.props.match.params.id}`)
      .then(response => {
        const goalRetrieved = {
          username: response.data.username,
          description: response.data.description,
          startedAt:
            response.data.startedAt === undefined
              ? new Date()
              : new Date(response.data.startedAt),
          deadline: new Date(response.data.deadline),
          accountablePartner: response.data.accountable_partner,
          penalty: response.data.penalty,
          status: response.data.status
        };
        this.setState({ goal: goalRetrieved });
      })
      .catch(function(error) {
        // Todo: handle errors
        console.log(error);
      });
  }

  render() {
    var dateFormat = require('dateformat');

    const deadlineFormatted = dateFormat(
      new Date(this.state.goal.deadline),
      'dddd, mmmm dS, yyyy'
    );

    const startedAtFormatted = dateFormat(
      new Date(this.state.goal.startedAt),
      'dddd, mmmm dS, yyyy'
    );

    return (
      <div className="viewGoal">
        <Header as="h2" textAlign="center">
          My Goal
        </Header>

        <Table basic="very" celled collapsing>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Description</Table.Cell>
              <Table.Cell>{this.state.goal.description}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>Deadlines</Table.Cell>
              <Table.Cell>{deadlineFormatted}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>Started at:</Table.Cell>
              <Table.Cell>{startedAtFormatted}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>Penalty</Table.Cell>
              <Table.Cell>{this.state.goal.penalty}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>Accountable Partner</Table.Cell>
              <Table.Cell>{this.state.goal.accountablePartner}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>Status</Table.Cell>
              <Table.Cell>{this.state.goal.status}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}

ViewGoal.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  })
};
