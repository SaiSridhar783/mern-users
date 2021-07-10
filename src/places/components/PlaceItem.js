import React from "react";
import Card from "../../shared/components/UI/Card/Card";
import Button from "../../shared/components/UI/Button/Button";

import "./PlaceItem.css";
import Modal from "../../shared/components/UI/Modal.jsx";
import { useDisclosure } from "@chakra-ui/react";
import Map from "../../shared/components/UI/Map.jsx";

const PlaceItem = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <React.Fragment>
      <Modal isOpen={isOpen} onClose={onClose} title={props.address}>
        <Map lat={props.coordinates.lat} lng={props.coordinates.lng} />
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
            <Button to={`/places/${props.id}`}>EDIT</Button>
            <Button danger>DELETE</Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
