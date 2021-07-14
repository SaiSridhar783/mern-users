import React from "react";

import Card from "../../shared/components/UI/Card/Card";
import UserItem from "./UserItem";
import "./UsersList.css";

const UsersList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>No users found</h2>
                </Card>
            </div>
        );
    }

    return (
        <ul className="users-list">
            {props.items.map((user) => (
                <UserItem
                    key={user._id}
                    id={user._id}
                    image={user.image}
                    name={user.name}
                    placeCount={user.places.length}
                />
            ))}
        </ul>
    );
};

export default UsersList;
