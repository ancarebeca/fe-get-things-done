import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateGoal from "./components/create-goal.component";
import EditGoal from "./components/edit-goal.component";
import GoalsList from "./components/goals-list.component";

function App() {
    return (
        <Router>
            <div className="container">
                <nav className="navbar navbar-expand-lg nav-bar-light bg-light">
                    <Link to="/" className="navbar-brand"> Get things done! </Link>
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/create" className="nav-link">New goal</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <Route path="/" exact component={GoalsList}/>
                <Route path="/edit/:id" exact component={EditGoal}/>
                <Route path="/create" exact component={CreateGoal}/>
            </div>
        </Router>
    );
}

export default App;
