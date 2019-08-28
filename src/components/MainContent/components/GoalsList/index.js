import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { Segment, Item, Button, Label, Icon } from 'semantic-ui-react';
var dateFormat = require('dateformat');

export default class GoalsList extends Component {
  constructor(props) {
    super(props);
    this.state = { goals: [] };
    this.goalList = this.goalList.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount');
    // axios
    //   .get("http://localhost:4000/goals/")
    //   .then(response => {
    //     this.setState({ goals: response.data });
    //     console.log("Resultados: ", response.data);
    //   })
    //   .catch(function(error) {
    //     console.error(error);
    //   });
    const goals = [
      {
        id: 1,
        username: 'Paco',
        description: 'Go to gym twice at week!!! ',
        deadline: new Date(),
        accountablePartner: 'rebeca@gmail.com',
        penalty: '5',
        status: 'new'
      },
      {
        id: 2,
        username: 'Paco',
        description: 'Do not eat sugar!!! ',
        deadline: new Date(),
        accountablePartner: 'rebeca@gmail.com',
        penalty: '5',
        status: 'new'
      }
    ];
    this.setState({ goals: goals });
  }

  onDelete = id => () => {
    axios
      .delete('http://localhost:4000/goals/delete/' + id)
      .then(res => console.log(res.data));

    this.setState({ goals: this.state.goals.filter(goal => goal._id !== id) });
  };

  goalList = () => {
    // const onDelete = this.onDelete;
    return this.state.goals.map(function(currentGoal) {
      const deadlineFormatted = dateFormat(
        new Date(currentGoal.deadline),
        'mmmm dS, yyyy'
      );

      return (
        <Item key={currentGoal.id}>
          <Item.Content verticalAlign="middle">
            <Item.Header>{currentGoal.description}</Item.Header>
            <Item.Extra>
              <Label color="green" horizontal>
                Succeeded
              </Label>
              <Icon name="calendar"></Icon> {deadlineFormatted}
              <Link to={'/show/' + currentGoal._id}>
                <Button color="blue" floated="right">
                  Show
                </Button>
              </Link>
            </Item.Extra>
          </Item.Content>
        </Item>
      );
    });
  };

  render() {
    return (
      <Segment>
        <Item.Group divided>{this.goalList()}</Item.Group>
      </Segment>
    );
  }
}

// function getActions(props) {
//   if (props.goal.status !== "New") {
//     return (
//       <List>
//         <List.Item>
//           <Link to={"/view/" + props.goal._id}>View</Link>
//         </List.Item>
//       </List>
//     );
//   } else {
//     return (
//       <List>
//         <List.Item>
//           <Link to={"/edit/" + props.goal._id}>Edit</Link>
//         </List.Item>
//         <List.Item>
//           <a onClick={props.onDelete}>Delete</a>
//         </List.Item>
//         <List.Item>
//           <Link to={"/view/" + props.goal._id}>View</Link>
//         </List.Item>
//       </List>
//     );
//   }
// }

GoalsList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};
