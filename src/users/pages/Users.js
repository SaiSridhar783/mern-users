import React from "react";
import UsersList from "../components/UsersList";
import useSWR from "swr";
import axios from "axios";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import Modal from "../../shared/components/UI/Modal";

const Users = () => {
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

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
            <Modal isOpen={isOpen} onClose={onClose} title="ERROR">
                {error.message}
                <br />
                <br />
                <b>Try again Later</b>
            </Modal>
        );
    }

    let found = [];
    if (data) {
        found = data.data.users;
    }

    return <UsersList items={found} />;
};

export default Users;
