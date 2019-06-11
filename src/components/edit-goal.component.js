import React, {Component} from 'react';
import axios from 'axios';


export default class EditGoal extends Component {

    constructor(props) {
        super(props);

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
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/goals/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    goal_user_name: response.data.goal_user_name,
                    goal_description: response.data.goal_description,
                    goal_deadline: response.data.goal_deadline,
                    goal_accountable_partner: response.data.goal_accountable_partner,
                    goal_penalty: response.data.goal_penalty,
                    goal_status: response.data.goal_status
                })
            })
            .catch(function (error) {
                console.log(error);
            })
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
        axios.post('http://localhost:4000/goals/update/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3 align="center">Update Goal</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.goal_user_name}
                               onChange={this.onChangeGoalUserName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.goal_description}
                            onChange={this.onChangeGoalDescription}
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
                        <label>Accountable Partner: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.goal_accountable_partner}
                            onChange={this.onChangeGoalAcountablePartner}
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
                        <label>Status: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.goal_status}
                            onChange={this.onChangeGoalStatus}
                        />
                    </div>

                    <br/>

                    <div className="form-group">
                        <input type="submit" value="Update Goal" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}