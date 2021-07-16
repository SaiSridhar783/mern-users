import React from "react";
import { NavLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import "./NavLinks.css";
import { authActions } from "../../../store/authSlice";

const NavLinks = () => {
    const isLoggedIn = useSelector((state) => state.auth.login.isLoggedIn);
    const uid = useSelector((state) => state.auth.login.userId);
    const dispatch = useDispatch();

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>
                    ALL USERS
                </NavLink>
            </li>
            {isLoggedIn && (
                <li>
                    <NavLink to={`/${uid}/places`}>MY PLACES</NavLink>
                </li>
            )}
            {isLoggedIn && (
                <li>
                    <NavLink to="/places/new">ADD PLACE</NavLink>
                </li>
            )}
            {!isLoggedIn && (
                <li>
                    <NavLink to="/auth">AUTHENTICATE</NavLink>
                </li>
            )}
            {isLoggedIn && (
                <li>
                    <button onClick={() => dispatch(authActions.authReset())}>
                        LOGOUT
                    </button>
                </li>
            )}
        </ul>
    );
};

export default NavLinks;
