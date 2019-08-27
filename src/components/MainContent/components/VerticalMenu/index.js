import React from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";
import styled from "styled-components";
import "semantic-ui-css/semantic.min.css";

const StyledLink = styled(Link)`
  color: black;
  :hover {
    color: black;
  }
`;

const StyledVerticalMenuIcon = styled(Icon)`
  &&& {
    margin-right: 1em;
  }

`;

export default class VerticalMenu extends React.Component {
  state = { activeItem: "Goals" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <Menu vertical fluid>
        <Menu.Item
          as={StyledLink}
          to="/"
          name="Goals"
          active={activeItem === "Goals"}
          onClick={this.handleItemClick}
        >
          <div>
            <StyledVerticalMenuIcon name="trophy" />
            Goals
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
