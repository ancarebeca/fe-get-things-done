import React from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { Grid, Container, Header } from "semantic-ui-react";
import CreateGoal from "./components/create-goal.component";
import EditGoal from "./components/edit-goal.component";
import GoalsList from "./components/goals-list.component";

const GridExampleColumns = () =>
  <Router>
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header as="h2" textAlign="center">
              <Link to="/" className="navbar-brand">
                {" "}Get things done!{" "}
              </Link>
            </Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <div>
              <Route path="/" exact component={GoalsList} />
              <Route path="/edit/:id" exact component={EditGoal} />
              <Route path="/create" exact component={CreateGoal} />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Router>;

function App() {
  return GridExampleColumns();
}

export default App;
