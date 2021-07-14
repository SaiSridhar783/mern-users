import React from "react";
import UsersList from "../components/UsersList";
import useSWR from "swr";
import axios from "axios";
import { Heading, Spinner } from "@chakra-ui/react";

const Users = () => {
    const getData = async (key) => {
        const response = await axios.get(key);
        return response;
    };

    const { data, error } = useSWR("http://localhost:9001/api/users", getData);

    if (!error && !data) {
        return (
            <div style={{ textAlign: "center" }}>
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="magenta"
                    size="xl"
                    mx="auto"
                    mb="1.1rem"
                    display="block"
                />
            </div>
        );
    }

    if (error) {
        return (
            <Heading textAlign="center" color="whitesmoke" mt="20%">
                Something went Wrong... &nbsp;{error.message}
            </Heading>
        );
    }

    let found = [];
    if (data) {
        found = data.data.users;
    }

    return <UsersList items={found} />;
};

export default Users;
