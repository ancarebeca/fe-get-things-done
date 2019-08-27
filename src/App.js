import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
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

function MainHeader() {
  const HeaderStyled = styled.div`
    height: 80px;
    background-color: #2185d0;
    margin-bottom: 1%;
  `;

  const HeaderContainer = styled.div`
    color: white;
    h2 {
      height: 80px;
      line-height: 80px;
      white-space: nowrap;
    }
  `;

  return (
    <HeaderStyled>
      <Container>
        <HeaderContainer>
          <h2>
            <Icon name="checked calendar" />Get Things Done!
          </h2>
        </HeaderContainer>
      </Container>
    </HeaderStyled>
  );
}

class VerticalMenu extends React.Component {
  state = { activeItem: "Goals" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    // Todo : Como quito  el link de <Link to="/">Goals</Link>
    const { activeItem } = this.state;
    return (
      <Menu vertical fluid>
        <Menu.Item
          name="Goals"
          active={activeItem === "Goals"}
          onClick={this.handleItemClick}
        >
          <div>
            <Icon name="trophy" />
            Goals
            {/* <Link to="/">Goals</Link>  */}
          </div>
        </Menu.Item>
        <Menu.Item
          name="Reports"
          active={activeItem === "Reports"}
          onClick={this.handleItemClick}
        >
          <div>
            <Icon name="dashboard" />
            Reports
          </div>
        </Menu.Item>

        <Menu.Item
          name="Logout"
          active={activeItem === "Logout"}
          onClick={this.handleItemClick}
        >
          <div>
            <Icon name="log out" />
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
      <div>
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
      </div>
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

const GridExampleColumns = () =>
  <Router>
    <MainHeader />
    <Container>
      <MainContent />
    </Container>
  </Router>;

function App() {
  return GridExampleColumns(); // todo: sustituir por el codigo
}

export default App;
