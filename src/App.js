import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import NewPlace from "./places/pages/NewPlace.js";
import UpdatePlace from "./places/pages/UpdatePlace.js";
import UserPlaces from "./places/pages/UserPlaces.js";
import MainNavigation from "./shared/components/Navigation/MainNavigation.js";
import Auth from "./users/pages/Auth.js";
import Users from "./users/pages/Users.js";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <MainNavigation />
        <main className="">
          <Switch>
            <Route path="/" component={Users} exact />
            <Route path="/:userId/places" component={UserPlaces} exact />
            <Route path="/places/new" component={NewPlace} exact />
            <Route path="/places/:placeId" component={UpdatePlace} exact />
            <Route path="/auth" component={Auth} exact />
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </React.Fragment>
  );
};

export default App;
