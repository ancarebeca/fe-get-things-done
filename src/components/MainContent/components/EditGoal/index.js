import React, { Component } from 'react';
import axios from 'axios';
import GlobalForm from '../GlobaForm';
import PropTypes from 'prop-types';

import 'react-datepicker/dist/react-datepicker.css';

export default class EditGoal extends Component {
  constructor(props) {
    super(props);

    this.onChangeGoalDescription = this.onChangeGoalDescription.bind(this);
    this.onChangeGoalDeadline = this.onChangeGoalDeadline.bind(this);
    this.onChangeGoalAcountablePartner = this.onChangeGoalAcountablePartner.bind(
      this
    );
    this.onChangeGoalPenalty = this.onChangeGoalPenalty.bind(this);
    this.onChangeGoalStatus = this.onChangeGoalStatus.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      goal: {
        username: '',
        description: '',
        deadline: new Date(),
        accountablePartner: '',
        penalty: '0',
        status: 'new'
      },
      errors: {},
      touched: {
        username: false,
        description: false,
        deadline: false,
        accountablePartner: false,
        penalty: false,
        status: false
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
          deadline: new Date(response.data.deadline),
          accountablePartner: response.data.accountablePartner,
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

  handleOnFocus = fieldName => e => {
    this.setState({ touched: { ...this.state.touched, [fieldName]: true } });
  };

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
      goal: { ...this.state.goal, accountablePartner: e.target.value }
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

    if (!this.handleValidation()) {
      return;
    }

    const goalUpdated = {
      username: this.state.goal.username,
      description: this.state.goal.description,
      deadline: this.state.goal.deadline,
      accountablePartner: this.state.goal.accountablePartner,
      penalty: this.state.goal.penalty,
      status: this.state.goal.status
    };
    console.log(goalUpdated);

    axios
      .post(
        'http://localhost:4000/goals/update/' + this.props.match.params.id,
        goalUpdated
      )
      .then(res => {
        console.log(res.data);
        this.props.history.push('/');
      });
    // Todo: handler error
  }

  handleValidation() {
    let errors = {};
    let formIsValid = true;
    const touched = Object.keys(this.state.touched).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});

    if (!this.isAcountablePartnerValid()) {
      formIsValid = false;
      errors['accountablePartner'] = 'Accountable partner cannot be empty';
    }

    if (!this.isDescriptionValid()) {
      formIsValid = false;
      errors['description'] = 'Description cannot be empty';
    }

    if (!this.isPenaltyValid()) {
      formIsValid = false;
      errors['penalty'] = 'Penalty has to be bigger than 0';
    }

    this.setState({ errors, touched });
    return formIsValid;
  }

  isEmptyField(value) {
    return !value || value === undefined || value === '' || value.length === 0;
  }

  isDescriptionValid() {
    const description = this.state.goal.description;
    return !this.isEmptyField(description);
  }

  isPenaltyValid() {
    return (
      0 < parseInt(this.state.goal.penalty, 10) &&
      parseInt(this.state.goal.penalty, 10) < Infinity
    );
  }

  isAcountablePartnerValid() {
    return !this.isEmptyField(this.state.goal.accountablePartner);
  }

  render() {
    const actions = {
      onChangeGoalDescription: this.onChangeGoalDescription,
      onChangeGoalDeadline: this.onChangeGoalDeadline,
      onChangeGoalAcountablePartner: this.onChangeGoalAcountablePartner,
      onChangeGoalPenalty: this.onChangeGoalPenalty,
      onChangeGoalStatus: this.onChangeGoalStatus,
      onSubmit: this.onSubmit,
      onFocus: this.handleOnFocus
    };
    const validations = {
      isPenaltyValid: this.isPenaltyValid(),
      isDescriptionValid: this.isDescriptionValid(),
      isAcountablePartnerValid: this.isAcountablePartnerValid()
    };
    return (
      <GlobalForm
        validations={validations}
        goal={this.state.goal}
        actions={actions}
        buttonName="Update"
        errors={Object.values(this.state.errors)}
        touched={this.state.touched}
      />
    );
  }
}

EditGoal.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  })
};
