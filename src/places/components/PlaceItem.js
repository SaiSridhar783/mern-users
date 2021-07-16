import React from "react";
import Card from "../../shared/components/UI/Card/Card";
import Button from "../../shared/components/UI/Button/Button";

import "./PlaceItem.css";
import Modal from "../../shared/components/UI/Modal.jsx";
import Map from "../../shared/components/UI/Map.jsx";
import {
    Alert,
    AlertIcon,
    Heading,
    Spinner,
    useDisclosure,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useHttpClient } from "../../shared/hooks/useHttp";

const PlaceItem = (props) => {
    const { isLoading, error, sendRequest } = useHttpClient();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: delisOpen,
        onOpen: delonOpen,
        onClose: delonClose,
    } = useDisclosure();

    const userId = useSelector((state) => state.auth.login.userId);
    const token = useSelector((state) => state.auth.login.token);

    const deletePlaceHandler = async () => {
        try {
            await sendRequest(
                `${process.env.REACT_APP_BASE_URL}/places/${props.id}`,
                "DELETE",
                null,
                { Authorization: `Bearer ${token}` }
            );
            props.onDelete(props.id);
        } catch (err) {}
    };

    return (
        <React.Fragment>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title={props.address}
                footer="map"
            >
                <Map lat={props.coordinates.lat} lng={props.coordinates.lng} />
            </Modal>

            <Modal
                isOpen={delisOpen}
                onClose={delonClose}
                title="Are you sure you want to delete?"
                footer="del"
                deleteHandler={deletePlaceHandler}
            >
                <Heading as="h4" my="2" fontSize="1.1rem" fontWeight="normal">
                    This action is irreversible and the place will be lost
                    forever.
                </Heading>
                {isLoading ? (
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="red"
                        size="xl"
                        mx="auto"
                        mb="1.1rem"
                        display="block"
                    />
                ) : (
                    error && (
                        <Alert
                            status="error"
                            my="2rem"
                            maxWidth="38rem"
                            mx="auto"
                        >
                            <AlertIcon />
                            {error}
                        </Alert>
                    )
                )}
            </Modal>

            <li className="place-item">
                <Card className="place-item__content">
                    <div className="place-item__image">
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className="place-item__info">
                        <h2 className="place-item__title">
                            <b>{props.title}</b>
                        </h2>
                        <address>
                            <i className="fa fa-location-arrow"></i>&nbsp;&nbsp;
                            {props.address}
                        </address>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button onClick={onOpen}>VIEW ON MAP</Button>
                        {userId === props.creatorId && (
                            <>
                                <Button to={`/places/${props.id}`}>EDIT</Button>

                                <Button danger onClick={delonOpen}>
                                    DELETE
                                </Button>
                            </>
                        )}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
};

export default PlaceItem;
