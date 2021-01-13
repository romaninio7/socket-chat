import React from "react";
import "./app.css";
import { HashRouter as Router, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import Chat from "./containers/Chat";

const App = () => (
  <Router>
    <Route path="/" exact component={SignIn} />
    <Route path="/chat" component={Chat} />
  </Router>
);

export default App;
