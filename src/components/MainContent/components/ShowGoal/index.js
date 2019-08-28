import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Header, Table, Icon, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import 'react-datepicker/dist/react-datepicker.css';

export default class ShowGoal extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);

    this.state = {
      goal: {
        _id: '',
        username: '',
        description: '',
        deadline: new Date(),
        accountablePartner: '',
        penalty: '0',
        status: 'new'
      }
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:4000/goals/${this.props.match.params.id}`)
      .then(response => {
        const goalRetrieved = {
          _id: response.data._id,
          username: response.data.username,
          description: response.data.description,
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

  onDelete = id => () => {
    axios
      .delete('http://localhost:4000/goals/delete/' + id)
      .then(res => console.log(res.data));

    this.setState({
      goal: {
        _id: '',
        username: '',
        description: '',
        deadline: new Date(),
        accountablePartner: '',
        penalty: '0',
        status: 'new'
      }
    });
  };

  render() {
    var dateFormat = require('dateformat');

    const deadlineFormatted = dateFormat(
      new Date(this.state.goal.deadline),
      'mmmm dS, yyyy'
    );
    return (
      <>
        <Table basic="very" celled verticalAlign="middle">
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Header as="h4">The goal:</Header>
              </Table.Cell>
              <Table.Cell>{this.state.goal.description}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">Status:</Header>
              </Table.Cell>
              <Table.Cell>{this.state.goal.status}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">Due date:</Header>
              </Table.Cell>
              <Table.Cell>{deadlineFormatted}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">Penalty:</Header>
              </Table.Cell>
              <Table.Cell>{this.state.goal.penalty}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">Accountable Partner:</Header>
              </Table.Cell>
              <Table.Cell>{this.state.goal.accountablePartner}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <a onClick={this.onDelete(this.state.goal._id)}>
          <Button floated="right" color="red">
            <Icon name="trash alternate" />
          </Button>
        </a>
        <Link to={'/edit/' + this.state.goal._id}>
          <Button floated="right" color="green">
            <Icon name="edit" />
          </Button>
        </Link>
      </>
    );
  }
}

ShowGoal.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  })
};
