import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import RouteNav from "./components/RouteNav";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:slug"  component={RouteNav} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

