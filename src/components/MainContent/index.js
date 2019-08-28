import React from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Button,
  Icon,
  Responsive,
  Divider,
  Segment
} from 'semantic-ui-react';
import styled from 'styled-components';
import 'semantic-ui-css/semantic.min.css';

import VerticalMenu from './components/VerticalMenu';
import Content from './components/Content';

const StyledGrid = styled(Grid)`
  position: relative;
  top: -60px;
`;

const StyledMenu = styled.div`
  margin-top: 60px;
`;

export default class MainContent extends React.Component {
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
                {this.state.mobileMenuVisible && (
                  <StyledMenu>
                    <VerticalMenu />
                  </StyledMenu>
                )}
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
                <Grid.Row>
                  <Content />
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>
      </>
    );
  }
}
