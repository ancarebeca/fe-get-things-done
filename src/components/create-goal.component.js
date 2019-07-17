import React, { Component } from "react";
import axios from "axios";
import { Grid, Header, Container } from "semantic-ui-react";
import GlobalForm from "./gobal-form";
import PropTypes from "prop-types";

import "react-datepicker/dist/react-datepicker.css";

export default class CreateGoal extends Component {
  constructor(props) {
    super(props);

    this.onChangeGoalUserName = this.onChangeGoalUserName.bind(this);
    this.onChangeGoalDescription = this.onChangeGoalDescription.bind(this);
    this.onChangeGoalDeadline = this.onChangeGoalDeadline.bind(this);
    this.onChangeGoalAcountablePartner = this.onChangeGoalAcountablePartner.bind(
      this
    );
    this.onChangeGoalPenalty = this.onChangeGoalPenalty.bind(this);
    this.onChangeGoalStatus = this.onChangeGoalStatus.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      goal: {
        user_name: "",
        description: "",
        deadline: new Date(),
        accountable_partner: "",
        penalty: "",
        status: "new"
      }
    };
  }

  onChangeGoalUserName(e) {
    this.setState({ goal: { ...this.state.goal, user_name: e.target.value } });
  }

  onChangeGoalDescription(e) {
    this.setState({
      goal: { ...this.state.goal, description: e.target.value }
    });
  }

  onChangeGoalDeadline(date) {
    this.setState({
      goal: { ...this.state.goal, deadline: date }
    });
  }

  onChangeGoalAcountablePartner(e) {
    this.setState({
      goal: { ...this.state.goal, accountable_partner: e.target.value }
    });
  }

  onChangeGoalPenalty(e) {
    this.setState({
      goal: { ...this.state.goal, penalty: e.target.value }
    });
  }

  onChangeGoalStatus(e) {
    this.setState({
      goal: { ...this.state.goal, status: e.target.value }
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newGoal = {
      goal_user_name: this.state.goal.user_name,
      goal_description: this.state.goal.description,
      goal_deadline: this.state.goal.deadline,
      goal_accountable_partner: this.state.goal.accountable_partner,
      goal_penalty: this.state.goal.penalty,
      goal_status: this.state.goal.status
    };

    console.log("New goal");
    console.log(newGoal);

    axios
      .post("http://localhost:4000/goals/add", newGoal)
      .then(res => console.log(res.data));

    this.setState = {
      goal: {
        user_name: "",
        description: "",
        deadline: new Date(),
        accountable_partner: "",
        penalty: "",
        status: "new"
      }
    };

    this.props.history.push("/");
  }

  render() {
    const isPenaltyValid =
      0 < parseInt(this.state.goal.penalty, 10) &&
      parseInt(this.state.goal.penalty, 10) < Infinity;

    const actions = {
      onChangeGoalUserName: this.onChangeGoalUserName,
      onChangeGoalDescription: this.onChangeGoalDescription,
      onChangeGoalDeadline: this.onChangeGoalDeadline,
      onChangeGoalAcountablePartner: this.onChangeGoalAcountablePartner,
      onChangeGoalPenalty: this.onChangeGoalPenalty,
      onChangeGoalStatus: this.onChangeGoalStatus,
      onSubmit: this.onSubmit
    };

    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as="h2" textAlign="center">
                Create Goal
              </Header>
            </Grid.Column>
          </Grid.Row>
          <GlobalForm
            validations={{ isPenaltyValid }}
            goal={this.state.goal}
            actions={actions}
            buttonName="Create"
          />
        </Grid>
      </Container>
    );
  }
}

CreateGoal.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};
