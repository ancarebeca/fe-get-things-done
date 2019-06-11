import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Goal = props => {
    return (
        <tr>
            <td>{props.goal.goal_user_name}</td>
            <td>{props.goal.goal_description}</td>
            <td>{props.goal.goal_deadline}</td>
            <td>{props.goal.goal_accountable_partner}</td>
            <td>{props.goal.goal_penalty}</td>
            <td>{props.goal.goal_status}</td>
            <td>
                <Link to={"/edit/" + props.goal.goal_id}>Edit</Link>
                <a onClick={props.onDelete}>Delete</a>
            </td>
        </tr>
    )
}

export default class GoalsList extends Component {

    constructor(props) {
        super(props);
        this.state = {goals: []};
        this.goalList = this.goalList.bind(this);
        this.onDelete = this.onDelete.bind(this);


    }

    componentDidMount() {
        axios.get('http://localhost:4000/goals/')
            .then(response => {
                this.setState({goals: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onDelete = (id) => () => {
        // debugger
        axios.delete('http://localhost:4000/goals/delete/' + id)
            .then(res => console.log(res.data));

        this.setState({goals: this.state.goals.filter((goal) => goal._id !== id)})
    }

    goalList = () => {
        const onDelete = this.onDelete;
        return this.state.goals.map(function (currentGoal, i) {
            // debugger;
            return <Goal goal={currentGoal} key={i} onDelete={onDelete(currentGoal._id)}/>;
        })
    }

    render() {
        return (

            <div>
                <h3>Goals List</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Deadline</th>
                        <th>Accountable Partner</th>
                        <th>Penalty</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.goalList()}
                    </tbody>
                </table>
            </div>
        )
    }
}