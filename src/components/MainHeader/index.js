import React from 'react';
import { Container, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import 'semantic-ui-css/semantic.min.css';

const StyledContainer = styled.div`
  height: 80px;
  background-color: #2185d0;
  margin-bottom: 1%;
`;

const HeaderContent = styled.div`
  color: white;
  h2 {
    height: 80px;
    line-height: 80px;
    white-space: nowrap;
  }
`;

export default function MainHeader() {
  return (
    <StyledContainer>
      <Container>
        <HeaderContent>
          <h2>
            <Icon name="checked calendar" />
            Get Things Done!
          </h2>
        </HeaderContent>
      </Container>
    </StyledContainer>
  );
}
