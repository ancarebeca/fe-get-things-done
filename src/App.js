import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import MainHeader from "./components/MainHeader";
import MainContent from "./components/MainContent";

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
