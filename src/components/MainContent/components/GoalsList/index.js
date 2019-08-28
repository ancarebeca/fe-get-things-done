import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import axios from 'axios';
import { Item, Button, Label, Icon } from 'semantic-ui-react';
var dateFormat = require('dateformat');

export default class GoalsList extends Component {
  constructor(props) {
    super(props);
    this.state = { goals: [] };
    this.goalList = this.goalList.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://localhost:4000/goals/')
      .then(response => {
        this.setState({ goals: response.data });
        console.log('Resultados: ', response.data);
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  goalList = () => {
    if (this.state.goals.length < 1) {
      return (
        <Item key="unknown">
          <Item.Content verticalAlign="middle">
            <Item.Header>Sorry! There isn't any goal available</Item.Header>
          </Item.Content>
        </Item>
      );
    }

    return this.state.goals.map(function(currentGoal) {
      const deadlineFormatted = dateFormat(
        new Date(currentGoal.deadline),
        'mmmm dS, yyyy'
      );

      return (
        <>
          <Item key={currentGoal._id}>
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
        </>
      );
    });
  };

  render() {
    const StyledAddGoalLink = styled(Link)`
      float: right;
    `;
    return (
      <>
        <StyledAddGoalLink to={'/create/'}>
          <Icon name="add" sixe="small"></Icon>
          New Goal
        </StyledAddGoalLink>
        <Item.Group divided>{this.goalList()}</Item.Group>
      </>
    );
  }
}

GoalsList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};
