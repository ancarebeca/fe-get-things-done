import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, List, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
var dateFormat = require("dateformat");

function getActions(props) {
  if (props.goal.status !== "New") {
    return (
      <List>
        <List.Item>
          <Link to={"/view/" + props.goal._id}>View</Link>
        </List.Item>
      </List>
    );
  } else {
    return (
      <List>
        <List.Item>
          <Link to={"/edit/" + props.goal._id}>Edit</Link>
        </List.Item>
        <List.Item>
          <a onClick={props.onDelete}>Delete</a>
        </List.Item>
        <List.Item>
          <Link to={"/view/" + props.goal._id}>View</Link>
        </List.Item>
      </List>
    );
  }
}

function getColorState(state) {
  if (state === "Waiting for score") {
    return "waitingState";
  }

  if (state === "Succeeded") {
    return "succesedState";
  }

  if (state === "Failure") {
    return "failureState";
  }

  if (state === "In progress") {
    return "inProgressState";
  }

  return "defaultState";
}

const Goal = props => {
  const deadlineFormatted = dateFormat(
    new Date(props.goal.deadline),
    "dddd, mmmm dS, yyyy"
  );

  const color = getColorState(props.goal.status);
  return (
    <Table.Row className={`colorState ${color}`}>
      <Table.Cell>
        {props.goal.description}
      </Table.Cell>
      <Table.Cell>
        {deadlineFormatted}
      </Table.Cell>
      <Table.Cell>
        {props.goal.status}
      </Table.Cell>
      <Table.Cell>
        {getActions(props)}
      </Table.Cell>
    </Table.Row>
  );
};

export default class GoalsList extends Component {
  constructor(props) {
    super(props);
    this.state = { goals: [] };
    this.goalList = this.goalList.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount");
    axios
      .get("http://localhost:4000/goals/")
      .then(response => {
        this.setState({ goals: response.data });
        console.log("Resultados: ", response.data);
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  onDelete = id => () => {
    axios
      .delete("http://localhost:4000/goals/delete/" + id)
      .then(res => console.log(res.data));

    this.setState({ goals: this.state.goals.filter(goal => goal._id !== id) });
  };

  goalList = () => {
    const onDelete = this.onDelete;
    return this.state.goals.map(function(currentGoal, i) {
      return (
        <Goal goal={currentGoal} key={i} onDelete={onDelete(currentGoal._id)} />
      );
    });
  };

  render() {
    return (
      <div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Deadline</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.goalList()}
          </Table.Body>
        </Table>
        <div>
          <Link to={"/create/"}>
            <Button color="blue" size="small" floated="right">
              New goal
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

GoalsList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};
