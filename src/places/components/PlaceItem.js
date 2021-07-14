import React from "react";
import Card from "../../shared/components/UI/Card/Card";
import Button from "../../shared/components/UI/Button/Button";

import "./PlaceItem.css";
import Modal from "../../shared/components/UI/Modal.jsx";
import { Heading, useDisclosure } from "@chakra-ui/react";
import Map from "../../shared/components/UI/Map.jsx";
import { useSelector } from "react-redux";

const PlaceItem = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: delisOpen,
        onOpen: delonOpen,
        onClose: delonClose,
    } = useDisclosure();

    const isLoggedIn = useSelector((state) => state.auth.login.isLoggedIn);

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
            >
                <Heading as="h4" my="2" fontSize="1.1rem" fontWeight="normal">
                    This action is irreversible and the place will be lost
                    forever.
                </Heading>
            </Modal>

            <li className="place-item">
                <Card className="place-item__content">
                    <div className="place-item__image">
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className="place-item__info">
                        <h2 className="place-item__title">{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={onOpen}>
                            VIEW ON MAP
                        </Button>
                        {isLoggedIn && (
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
