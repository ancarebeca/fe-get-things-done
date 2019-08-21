import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Grid,
  Container,
  Menu,
  Dropdown,
  Button,
  Icon,
  Responsive
} from "semantic-ui-react";
import styled from "styled-components";
import "semantic-ui-css/semantic.min.css";

import CreateGoal from "./components/create-goal.component";
import EditGoal from "./components/edit-goal.component";
import GoalsList from "./components/goals-list.component";
import ViewGoal from "./components/view-goal.component";

function MainHeader() {
  const Content = styled.div`
    height: 80px;
    background-color: #2185d0;
  `;

  return <Content />;
}

// const StyledButton = styled(Button)`
// &&& {
//   background-color: #1f6fab;
// }
// `;

/* <Responsive
as={StyledButton}
icon="bars"
minWidth={Responsive.onlyMobile.minWidth} // Todo: adjust this values
maxWidth={Responsive.onlyMobile.maxWidth} // Todo: adjust this values
/> */

class VerticalMenu extends React.Component {
  state = { activeItem: "account" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <Menu secondary vertical fluid>
        <Menu.Item header name="my-goals">
          <Link to="/">My goals</Link>
        </Menu.Item>
        <Menu.Item
          name="account"
          active={activeItem === "account"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="settings"
          active={activeItem === "settings"}
          onClick={this.handleItemClick}
        />
        <Dropdown item text="Display Options">
          <Dropdown.Menu>
            <Dropdown.Header>Text Size</Dropdown.Header>
            <Dropdown.Item>Small</Dropdown.Item>
            <Dropdown.Item>Medium</Dropdown.Item>
            <Dropdown.Item>Large</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    );
  }
}

class NavBar extends React.Component {
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
    const menu = <VerticalMenu />;
    return (
      <div>
        <Responsive
          minWidth={Responsive.onlyMobile.minWidth} // Todo: adjust this values
          maxWidth={Responsive.onlyMobile.maxWidth} // Todo: adjust this values
        >
          <Button icon onClick={this.handleClick}>
            <Icon name="bars" />
          </Button>
          {this.state.mobileMenuVisible && menu}
        </Responsive>

        <Responsive
          minWidth={Responsive.onlyComputer.minWidth} // Todo: adjust this values
          maxWidth={Responsive.onlyComputer.maxWidth} // Todo: adjust this values
          onUpdate={this.closeMobileMenuOnUpdate}
        >
          <VerticalMenu />
        </Responsive>
      </div>
    );
  }
}

function MainContent() {
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
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <NavBar />
          </Grid.Column>
          <Grid.Column width={12}>
            <MainContent />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Router>;

function App() {
  return GridExampleColumns(); // todo: sustituir por el codigo
}

export default App;
