import React, { Component } from "react";
import axios from "axios";
import { Form, Grid, Header, Container } from "semantic-ui-react";

export default class EditGoal extends Component {
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
      goal_user_name: "",
      goal_description: "",
      goal_deadline: "",
      goal_accountable_partner: "",
      goal_penalty: "",
      goal_status: "new"
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/goals/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          goal_user_name: response.data.goal_user_name,
          goal_description: response.data.goal_description,
          goal_deadline: response.data.goal_deadline,
          goal_accountable_partner: response.data.goal_accountable_partner,
          goal_penalty: response.data.goal_penalty,
          goal_status: response.data.goal_status
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  //Methods which can be used to update the state properties:
  onChangeGoalUserName(e) {
    this.setState({
      goal_user_name: e.target.value
    });
  }

  onChangeGoalDescription(e) {
    this.setState({
      goal_description: e.target.value
    });
  }

  onChangeGoalDeadline(e) {
    this.setState({
      goal_deadline: e.target.value
    });
  }

  onChangeGoalAcountablePartner(e) {
    this.setState({
      goal_accountable_partner: e.target.value
    });
  }

  onChangeGoalPenalty(e) {
    this.setState({
      goal_penalty: e.target.value
    });
  }

  onChangeGoalStatus(e) {
    this.setState({
      goal_status: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      goal_user_name: this.state.goal_user_name,
      goal_description: this.state.goal_description,
      goal_deadline: this.state.goal_deadline,
      goal_accountable_partner: this.state.goal_accountable_partner,
      goal_penalty: this.state.goal_penalty,
      goal_status: this.state.goal_status
    };
    console.log(obj);
    axios
      .post(
        "http://localhost:4000/goals/update/" + this.props.match.params.id,
        obj
      )
      .then(res => {
        console.log(res.data);
        this.props.history.push("/");
      });
  }

  render() {
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as="h2" textAlign="center">
                Update Goal
              </Header>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <Form onSubmit={this.onSubmit}>
                <Form.Field>
                  <label>Username: </label>
                  <input
                    type="text"
                    value={this.state.goal_user_name}
                    onChange={this.onChangeGoalUserName}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Description: </label>
                  <input
                    type="text"
                    value={this.state.goal_description}
                    onChange={this.onChangeGoalDescription}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Deadline: </label>
                  <input
                    type="text"
                    value={this.state.goal_deadline}
                    onChange={this.onChangeGoalDeadline}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Accountable Partner: </label>
                  <input
                    type="text"
                    value={this.state.goal_accountable_partner}
                    onChange={this.onChangeGoalAcountablePartner}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Penalty: </label>
                  <input
                    type="text"
                    value={this.state.goal_penalty}
                    onChange={this.onChangeGoalPenalty}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Status: </label>
                  <input
                    type="text"
                    value={this.state.goal_status}
                    onChange={this.onChangeGoalStatus}
                  />
                </Form.Field>
                <button control="submit" className="ui button">
                  Update
                </button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
