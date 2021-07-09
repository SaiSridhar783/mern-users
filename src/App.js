import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import NewPlace from "./places/pages/NewPlace.js";
import MainNavigation from "./shared/components/Navigation/MainNavigation.js";
import Users from "./users/pages/Users.js";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <MainNavigation />
        <main className="">
          <Switch>
            <Route path="/" component={Users} exact />
            <Route path="/places/new" component={NewPlace} exact />
            <Route path="/:userId/places" component={Users} />
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </React.Fragment>
  );
};

export default App;
