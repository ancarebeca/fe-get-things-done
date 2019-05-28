import React, {Component} from 'react';
import axios from 'axios';

export default class CreateGoal extends Component {
    // Inside the constructor we’re setting the initial state of the component by assigned an object to this.state.
    constructor(props) {
        super(props);

        //Because in the four implemented methods we’re dealing with the component’s state object we need to make sure to bind those methods to this
        this.onChangeGoalUserName = this.onChangeGoalUserName.bind(this);
        this.onChangeGoalDescription = this.onChangeGoalDescription.bind(this);
        this.onChangeGoalDeadline = this.onChangeGoalDeadline.bind(this);
        this.onChangeGoalAcountablePartner = this.onChangeGoalAcountablePartner.bind(this);
        this.onChangeGoalPenalty = this.onChangeGoalPenalty.bind(this);
        this.onChangeGoalStatus = this.onChangeGoalStatus.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            goal_user_name: '',
            goal_description: '',
            goal_deadline: '',
            goal_accountable_partner: '',
            goal_penalty: '',
            goal_status: 'new'
        };
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

    // To handle the submit event of the form which will be implemented to create a new goal item:
    onSubmit(e) {
        e.preventDefault(); // ensure that the default HTML form submit behaviour is prevented

        console.log(`Form submitted:`);
        console.log(`goal_user_name: ${this.state.goal_user_name}`);
        console.log(`goal_description: ${this.state.goal_description}`);
        console.log(`goal_deadline: ${this.state.goal_deadline}`);
        console.log(`goal_accountable_partner: ${this.state.goal_accountable_partner}`);
        console.log(`goal_penalty: ${this.state.goal_penalty}`);
        console.log(`goal_status: ${this.state.goal_status}`);

        const newGoal = {
            goal_user_name: this.state.goal_user_name,
            goal_description: this.state.goal_description,
            goal_deadline: this.state.goal_deadline,
            goal_accountable_partner: this.state.goal_accountable_partner,
            goal_penalty: this.state.goal_penalty,
            goal_status: this.state.goal_status
        };

        axios.post('http://localhost:4000/goals/add', newGoal)
            .then(res => console.log(res.data));


        //we’re making sure that the form is resetted by setting the resetting the state object.
        this.setState({
            goal_user_name: '',
            goal_description: '',
            goal_deadline: '',
            goal_accountable_partner: '',
            goal_penalty: '',
            goal_status: 'new'
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Goal</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>User: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.goal_user_name}
                               onChange={this.onChangeGoalUserName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.goal_description}
                               onChange={this.onChangeGoalDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Accountable Partner: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.goal_accountable_partner}
                            onChange={this.onChangeGoalAcountablePartner}
                        />
                    </div>
                    <div className="form-group">
                        <label>Deadline: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.goal_deadline}
                            onChange={this.onChangeGoalDeadline}
                        />
                    </div>
                    <div className="form-group">
                        <label>Penalty: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.goal_penalty}
                            onChange={this.onChangeGoalPenalty}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Goal" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}


