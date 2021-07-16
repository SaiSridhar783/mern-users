import React, { Suspense, useEffect } from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
//import NewPlace from "./places/pages/NewPlace.js";
//import UpdatePlace from "./places/pages/UpdatePlace.js";
//import UserPlaces from "./places/pages/UserPlaces.js";
//import Auth from "./users/pages/Auth.js";
//import Users from "./users/pages/Users.js";
import MainNavigation from "./shared/components/Navigation/MainNavigation.js";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/authSlice.js";
import LoadingSpinner from "./shared/components/UI/LoadingSpinner/LoadingSpinner";

const Users = React.lazy(() => import("./users/pages/Users.js"));
const NewPlace = React.lazy(() => import("./places/pages/NewPlace.js"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace.js"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces.js"));
const Auth = React.lazy(() => import("./users/pages/Auth.js"));

let logoutTimer;

const App = () => {
    const tokenExpirationDate = useSelector(
        (state) => state.auth.login.expiration
    );
    const token = useSelector((state) => state.auth.login.token);
    const dispatch = useDispatch();

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("userData"));
        if (
            storedData &&
            storedData.token &&
            new Date() < new Date(storedData.expiration)
        ) {
            dispatch(
                authActions.localLogin({
                    ...storedData,
                    expiration: new Date(storedData.expiration).toISOString(),
                })
            );
        }
    }, [dispatch]);

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime =
                new Date(tokenExpirationDate).getTime() - new Date().getTime();

            logoutTimer = setTimeout(() => {
                dispatch(authActions.authReset());
            }, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, tokenExpirationDate, dispatch]);

    let routes;
    if (token) {
        routes = (
            <Switch>
                <Route path="/" component={Users} exact />
                <Route path="/:userId/places" component={UserPlaces} exact />
                <Route path="/places/new" component={NewPlace} exact />
                <Route path="/places/:placeId" component={UpdatePlace} exact />
                <Redirect to="/" />
            </Switch>
        );
    } else {
        routes = (
            <Switch>
                <Route path="/" component={Users} exact />
                <Route path="/:userId/places" component={UserPlaces} exact />
                <Route path="/auth" component={Auth} exact />
                <Redirect to="/auth" />
            </Switch>
        );
    }

    return (
        <React.Fragment>
            <Router>
                <MainNavigation />
                <main className="">
                    <Suspense
                        fallback={
                            <div className="center">
                                <LoadingSpinner />
                            </div>
                        }
                    >
                        {routes}
                    </Suspense>
                </main>
            </Router>
        </React.Fragment>
    );
};

export default App;
