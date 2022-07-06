import { Nav, Navbar, Container } from "react-bootstrap";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocation, faList } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default class Header extends Component {
  render() {
    return (
      <Navbar bg="primary" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand as={Link} to={"/"}>
            SI-KUMAL
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item>
                <Nav.Link as={Link} to={"/"}>
                  <FontAwesomeIcon icon={faMapLocation} fixedWidth />
                  Map
                </Nav.Link>
              </Nav.Item>
              <Nav.Item></Nav.Item>
              <Nav.Link as={Link} to={"/culinaries"}>
                <FontAwesomeIcon icon={faList} fixedWidth />
                Data List
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
