import React, { Component } from "react";
import axios from "axios";
import { Header, Container, Table } from "semantic-ui-react";
import PropTypes from "prop-types";

import "react-datepicker/dist/react-datepicker.css";

export default class ViewGoal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goal: {
        username: "",
        description: "",
        deadline: new Date(),
        accountablePartner: "",
        penalty: "0",
        status: "new"
      }
    };
  }



  componentDidMount() {
    axios
      .get(`http://localhost:4000/goals/${this.props.match.params.id}`)
      .then(response => {
        const goalRetrieved = {
          username: response.data.goal_user_name,
          description: response.data.goal_description,
          deadline: new Date(response.data.goal_deadline),
          accountablePartner: response.data.goal_accountable_partner,
          penalty: response.data.goal_penalty,
          status: response.data.goal_status
        };
        this.setState({ goal: goalRetrieved });
      })
      .catch(function(error) {
        // Todo: handle errors
        console.log(error);
      });
  }

  render() {
    var dateFormat = require("dateformat");

    const deadlineFormatted = dateFormat(
      new Date(this.state.goal.deadline),
      "dddd, mmmm dS, yyyy"
    );

    return (
      <div className="viewGoal">
        <Header as="h2" textAlign="center">
          My Goal
        </Header>

        <Table basic="very" celled collapsing>
          <Table.Row>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.Cell>
              {this.state.goal.description}
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.HeaderCell>Deadlines</Table.HeaderCell>
            <Table.Cell>
              {deadlineFormatted}
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.HeaderCell>Penalty</Table.HeaderCell>
            <Table.Cell>
              {this.state.goal.penalty}
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.HeaderCell>Accountable Partner</Table.HeaderCell>
            <Table.Cell>
              {this.state.goal.accountablePartner}
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.Cell>
              {this.state.goal.status}
            </Table.Cell>
          </Table.Row>
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
