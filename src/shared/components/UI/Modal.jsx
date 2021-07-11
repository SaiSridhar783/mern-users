import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from "@chakra-ui/react";

function ModalMain({ isOpen, onClose, children, title, footer }) {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg="purple.600" color="white">
                        {title}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{children}</ModalBody>

                    {footer === "map" ? (
                        <ModalFooter>
                            <Button
                                colorScheme="purple"
                                mr={3}
                                onClick={onClose}
                            >
                                Close
                            </Button>
                        </ModalFooter>
                    ) : (
                        <ModalFooter>
                            <Button colorScheme="red" mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button variant="solid" colorScheme="green" onClick={console.log}>
                                Continue
                            </Button>
                        </ModalFooter>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default ModalMain;
