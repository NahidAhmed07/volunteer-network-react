import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import swal from "sweetalert";
import useAuth from "../../hooks/useAuth";
import { processDate } from "../../utilities/utilities";
import "./UserEvents.css";
const UserEvents = () => {
  const { user } = useAuth();
  const [userEvents, setUserEvents] = useState([]);
  useEffect(() => {
    if (user.displayName) {
      axios
        .get(
          `https://fast-ravine-50741.herokuapp.com/user/events?userID=${user.uid}`
        )
        .then((res) => {
          setUserEvents(res.data);
          if (res.data.length < 1) {
            swal(
              "No Event Found",
              "we are not fond any event for you please Register ",
              "error"
            );
          }
        })
        .catch((err) => console.log(err.message));
    }
  }, [user]);

  const hadleCancel = (eventId) => {
    swal({
      title: "Are you sure?",
      text: "Cancel This event form you event list",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(
            `https://fast-ravine-50741.herokuapp.com/user/events/${eventId}/${user.uid}`
          )
          .then((res) => {
            if (res.data.deletedCount > 0) {
              const remaining = userEvents.filter(
                (event) => event.eventId !== eventId
              );
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
  return (
    <Container>
      <h2 className="header-text my-5">Your Registered Events</h2>
      <hr />
      <Row sm={1} lg={2}>
        {userEvents.length > 0 ? (
          userEvents.map((event) => (
            <Col key={event._id}>
              <div className="user-event-item d-flex flex-column flex-md-row p-4 gap-4 position-relative my-3">
                <div className="user-event-img">
                  <img className="img-fluid " src={event.img} alt="" />
                </div>
                <div className="user-event-text text-start ">
                  <h5>{event.title}</h5>
                  <h6>{processDate(event.date)}</h6>
                  <button
                    className="user-event-btn"
                    onClick={() => hadleCancel(event.eventId)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Col>
          ))
        ) : (
          <Col>
            <h2>No Event Found</h2>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default UserEvents;
