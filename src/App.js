import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Grid,
  Container,
  Menu,
  Button,
  Icon,
  Responsive,
  Divider
} from "semantic-ui-react";
import styled from "styled-components";
import "semantic-ui-css/semantic.min.css";

import CreateGoal from "./components/create-goal.component";
import EditGoal from "./components/edit-goal.component";
import GoalsList from "./components/goals-list.component";
import ViewGoal from "./components/view-goal.component";
import MainHeader from "./components/MainHeader";


const StyledLink = styled(Link)`
  color: black;
  :hover {
    color: black;
  }
`

const StyledVerticalMenuIcon = styled(Icon)`
  &&& {
    margin-right: 1em;
  }

`

class VerticalMenu extends React.Component {
  state = { activeItem: "Goals" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <Menu vertical fluid>
        <Menu.Item
          name="Goals"
          active={activeItem === "Goals"}
          onClick={this.handleItemClick}
        >
          <div>
            <StyledVerticalMenuIcon name="trophy" />
            <StyledLink to="/">Goals</StyledLink>
          </div>
        </Menu.Item>
        <Menu.Item
          name="Reports"
          active={activeItem === "Reports"}
          onClick={this.handleItemClick}
        >
          <div>
            <StyledVerticalMenuIcon name="dashboard" />
            Reports
          </div>
        </Menu.Item>

        <Menu.Item
          name="Logout"
          active={activeItem === "Logout"}
          onClick={this.handleItemClick}
        >
          <div>
            <StyledVerticalMenuIcon name="log out" />
            Logout
          </div>
        </Menu.Item>
      </Menu>
    );
  }
}

const StyledGrid = styled(Grid)`
  position: relative;
  top: -60px;
`;

const StyledMenu = styled.div`margin-top: 60px;`;

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mobileMenuVisible: false };

    this.handleClick = this.handleClick.bind(this);
    this.closeMobileMenuOnUpdate = this.closeMobileMenuOnUpdate.bind(this);
  }

  handleClick() {
    this.setState({ mobileMenuVisible: !this.state.mobileMenuVisible });
  }

  closeMobileMenuOnUpdate() {
    this.setState({ mobileMenuVisible: false });
  }



  render() {


    return (
      <>
        {/* Mobile */}
        <Responsive
          minWidth={Responsive.onlyMobile.minWidth}
          maxWidth={Responsive.onlyTablet.maxWidth}
        >
          <StyledGrid stackable="true">
            <Grid.Row>
              <Grid.Column>
                <Button
                  icon
                  size="small"
                  floated="right"
                  onClick={this.handleClick}
                >
                  <Icon name="bars" />
                </Button>
                {this.state.mobileMenuVisible &&
                  <StyledMenu>
                    <VerticalMenu />
                  </StyledMenu>}
              </Grid.Column>
            </Grid.Row>
            <Divider hidden />
            <Grid.Row>
              <Grid.Column>
                <Content />
              </Grid.Column>
            </Grid.Row>
          </StyledGrid>
        </Responsive>

        {/* Tablet and Desktop */}
        <Responsive
          minWidth={Responsive.onlyTablet.maxWidth}
          onUpdate={this.closeMobileMenuOnUpdate}
        >
          <Grid>
            <Grid.Row>
              <Grid.Column width={2}>
                <VerticalMenu />
              </Grid.Column>

              <Grid.Column width={14}>
                <Content />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>
      </>
    );
  }
}

function Content() {
  return (
    <div>
      <Route path="/" exact component={GoalsList} />
      <Route path="/edit/:id" exact component={EditGoal} />
      <Route path="/create" exact component={CreateGoal} />
      <Route path="/view/:id" exact component={ViewGoal} />
    </div>
  );
}

export default function App() {
  return (
  <Router>
    <MainHeader />
    <Container>
      <MainContent />
    </Container>
    </Router>
  );
}

