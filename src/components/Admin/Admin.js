import React, { useEffect, useState } from "react";
import { Col, Container, Nav, Row, Table } from "react-bootstrap";
import { NavLink, Switch, Route } from "react-router-dom";
import logo from "../../images/logo.png";
import { FiUsers } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import "./Admin.css";
import axios from "axios";
import swal from "sweetalert";
import VolunteerList from "../VolunteerList/VolunteerList";
import { FiLogOut } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

const Admin = () => {
  const [userEvents, setUserEvents] = useState([]);
  const { setAdmin } = useAuth();
  useEffect(() => {
    axios
      .get("https://fast-ravine-50741.herokuapp.com/event_list")
      .then((res) => {
        setUserEvents(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleDelete = (eventId, userId) => {
    swal({
      title: "Are you sure?",
      text: "Delete this Events and user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(
            `https://fast-ravine-50741.herokuapp.com/user/events/${eventId}/${userId}`
          )
          .then((res) => {
            if (res.data.deletedCount > 0) {
              const remaining = userEvents.filter(
                (event) =>
                  !(event.eventId === eventId && event.userId === userId)
              );
              console.log(remaining);
              setUserEvents(remaining);
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            }
          })
          .catch((err) => console.log(err.message));
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  const adminLogout = () => {
    localStorage.setItem("admin_info", null);
    swal("successful Logout Admin", {
      icon: "success",
    });
    setAdmin(false);
  };
  return (
    <Container fluid className="my-5 text-start h-100">
      <Row className="h-100">
        <Col sm="12" md="4" lg="3" className="h-100">
          <div
            style={{ borderRight: "1px solid gray", minHeight: "100vh" }}
            className="ps-4"
          >
            <img
              className="img-fluid mb-4"
              style={{ height: "80px" }}
              src={logo}
              alt=""
            />
            <br />
            <NavLink
              className="admin-nav-item"
              activeClassName="admin-active-nav-item"
              to="/admin/volunteer"
            >
              <FiUsers></FiUsers> Volunteer register list
            </NavLink>
            <br />
            <NavLink
              className="admin-nav-item"
              activeClassName="admin-active-nav-item"
              to="/admin/addEvent"
            >
              <AiOutlinePlus></AiOutlinePlus> Add event
            </NavLink>
            <Nav.Link className="user-nav-item" onClick={adminLogout}>
              {" "}
              <FiLogOut className="me-2"></FiLogOut>Log out
            </Nav.Link>
          </div>
        </Col>
        <Col sm="12" md="8" lg="9">
          <Switch>
            <Route path="/admin/volunteer">
              <VolunteerList
                userEvents={userEvents}
                handleDelete={handleDelete}
              ></VolunteerList>
            </Route>
            <Route path="/admin/addEvent">
              <h4>Add Event</h4>
            </Route>
          </Switch>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
