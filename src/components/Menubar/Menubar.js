import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Menubar.css";
import logo from "../../images/logo.png";
import useAuth from "../../hooks/useAuth";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { MdAdminPanelSettings } from "react-icons/md";
import { BsCalendar2Event } from "react-icons/bs";
import avater from "../../images/avater2.png";

const Menubar = () => {
  const { user, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      <Navbar bg="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand as={NavLink} to="/home">
            <img src={logo} alt="" height="50px" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link
                as={NavLink}
                to="/home"
                className="nav-item"
                activeClassName="active-item"
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/donation"
                className="nav-item"
                activeClassName="active-item"
              >
                Donation
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/user_events"
                className="nav-item"
                activeClassName="active-item"
              >
                Events
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/blog"
                className="nav-item"
                activeClassName="active-item"
              >
                Blog
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {!user.displayName ? (
            <Nav>
              <Nav.Link
                as={NavLink}
                to="/login"
                className="user-nav-item"
                activeClassName="active-item"
              >
                <button className="nav-btn nav-reg">
                  <FiLogIn className="me-2"></FiLogIn> Login
                </button>
              </Nav.Link>
            </Nav>
          ) : (
            <Navbar.Brand>
              <img
                src={user.photoURL || avater}
                alt=""
                height="45px"
                width="45px"
                className="rounded-circle user-avater"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            </Navbar.Brand>
          )}
        </Container>
      </Navbar>

      <div
        className="user-menu text-start"
        onBlur={() => setIsMenuOpen(false)}
        style={{ display: isMenuOpen ? "block" : "none" }}
      >
        <AiFillCloseCircle
          className="clos-btn"
          onClick={() => setIsMenuOpen(false)}
        ></AiFillCloseCircle>
        <br />

        <div className="mx-auto  d-flex justify-content-center">
          <img
            src={user.photoURL || avater}
            className="img-fluid rounded-circle mx-auto  "
            style={{ width: "100px", height: "100px" }}
            alt=""
          />
        </div>
        <h5 className="mt-2 text-center">
          {user.displayName || "Unknown User"}
        </h5>
        <hr />

        <Nav.Link
          as={NavLink}
          to="/user_events"
          className="user-nav-item"
          activeClassName="active-item"
        >
          <BsCalendar2Event className="me-2" />
          My events
        </Nav.Link>
        <Nav.Link
          as={NavLink}
          to="/admin/volunteer"
          className="user-nav-item"
          activeClassName="active-item"
        >
          <MdAdminPanelSettings className="me-2" />
          Admin Panel
        </Nav.Link>
        {user.displayName ? (
          <Nav.Link className="user-nav-item" onClick={logOut}>
            {" "}
            <FiLogOut className="me-2"></FiLogOut>Log out
          </Nav.Link>
        ) : (
          <Nav.Link
            as={NavLink}
            to="/login"
            className="user-nav-item"
            activeClassName="active-item"
          >
            <FiLogIn className="me-2"></FiLogIn> Login
          </Nav.Link>
        )}
      </div>
    </div>
  );
};

export default Menubar;
