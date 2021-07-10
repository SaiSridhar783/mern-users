import React from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import "./MainNavigation.css";
import SideDrawer from "../UI/SideDrawer";
import { useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const MainNavigation = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <React.Fragment>
      <SideDrawer onClose={onClose} isOpen={isOpen} />

      <MainHeader>
        <HamburgerIcon
          display={{ lg: "none" }}
          fontSize="3rem"
          color="white"
          _hover={{ cursor: "pointer" }}
          mr="2rem"
          onClick={onOpen}
        />

        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
