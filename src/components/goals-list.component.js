import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, List } from "semantic-ui-react";

const Goal = props => {
  return (
    <Table.Row>
      <Table.Cell>
        {props.goal.goal_user_name}
      </Table.Cell>
      <Table.Cell>
        {props.goal.goal_description}
      </Table.Cell>
      <Table.Cell>
        {props.goal.goal_deadline}
      </Table.Cell>
      <Table.Cell>
        {props.goal.goal_accountable_partner}
      </Table.Cell>
      <Table.Cell>
        {props.goal.goal_penalty}
      </Table.Cell>
      <Table.Cell>
        {props.goal.goal_status}
      </Table.Cell>
      <Table.Cell>
        <List>
          <List.Item>
            <Link to={"/edit/" + props.goal._id}>Edit</Link>
          </List.Item>
          <List.Item>
            <a onClick={props.onDelete}>Delete</a>
          </List.Item>
        </List>
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
        <h3>Goals List</h3>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Username</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Deadline</Table.HeaderCell>
              <Table.HeaderCell>Accountable Partner</Table.HeaderCell>
              <Table.HeaderCell>Penalty</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.goalList()}
          </Table.Body>
        </Table>
      </div>
    );
  }
}
