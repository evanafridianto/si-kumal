import { Nav, Navbar, Container } from "react-bootstrap";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocation, faDatabase } from "@fortawesome/free-solid-svg-icons";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CulinaryMap from "../pages/CulinaryMap";
import CulinaryList from "../pages/CulinaryList";
export default class Header extends Component {
  render() {
    return (
      <Router>
        <div className="page-container py-5">
          <div className="content-wrap"></div>
          <div>
            <>
              <Navbar bg="primary" expand="md" variant="dark" fixed="top">
                <Container>
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
                        <FontAwesomeIcon icon={faDatabase} fixedWidth />
                        Master Data
                      </Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
            </>
            <div>
              <Routes>
                <Route path="/" element={<CulinaryMap />}></Route>
                <Route path="/culinaries" element={<CulinaryList />}></Route>
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
