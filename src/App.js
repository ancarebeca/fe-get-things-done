import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Grid, Container, Menu } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import CreateGoal from "./components/create-goal.component";
import EditGoal from "./components/edit-goal.component";
import GoalsList from "./components/goals-list.component";
import ViewGoal from "./components/view-goal.component";

const GridExampleColumns = () =>
  <Router>
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Menu pointing secondary>
              <Menu.Item header name="my-goals">
                <Link to="/">My goals</Link>
              </Menu.Item>
              <Menu.Menu position="right">
                <Menu.Item fixed="right" name="logout">
                  Logout
                </Menu.Item>
              </Menu.Menu>
            </Menu>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <Route path="/" exact component={GoalsList} />
            <Route path="/edit/:id" exact component={EditGoal} />
            <Route path="/create" exact component={CreateGoal} />
            <Route path="/view/:id" exact component={ViewGoal} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Router>;

function App() {
  return GridExampleColumns();
}

export default App;
