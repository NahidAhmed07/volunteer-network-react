import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { BsThreeDots, BsFillBookmarkStarFill } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import "./Home.css";
import { useHistory } from "react-router";
import { randomColor } from "../../utilities/utilities";

const Home = () => {
  const [events, setEvents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get("https://fast-ravine-50741.herokuapp.com/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  const handleEvent = (id) => {
    history.push(`/register/${id}`);
  };
  return (
    <Container
      fluid
      className="position-relative"
      // onClick={() => setIsMenuOpen(false)}
    >
      <Container>
        <div>
          <h2 className="header-text mt-5 pt-5">
            I grow by helping people in need.
          </h2>

          <Row>
            <Col sm={10} md={7} lg={5} xl={4} className="mx-auto mt-3 mb-5 ">
              <InputGroup className="mb-3">
                <FormControl placeholder="Search" />
                <button className="search-btn">Search</button>
              </InputGroup>
            </Col>
          </Row>
        </div>
        <Row className="g-3 g-md-4 g-lg-5">
          {events.length > 0 ? (
            events.map((event) => (
              <Col key={event._id} className="ms-4 ms-md-0">
                <div className="event-item">
                  <div className="event-img">
                    <img className="img-fluid" src={event.img} alt="" />
                  </div>
                  <div
                    style={{ backgroundColor: randomColor() }}
                    className="event-text"
                  >
                    <h6>{event.title}</h6>
                  </div>
                  <div className="event-overlay">
                    <div className="event-icons">
                      <BsFillBookmarkStarFill className="event-book"></BsFillBookmarkStarFill>
                      <FiHeart className="event-heart"></FiHeart>
                      <BsThreeDots className="event-dot"></BsThreeDots>
                    </div>
                    <div className="event-add">
                      <AiOutlineAppstoreAdd
                        onClick={() => handleEvent(event._id)}
                        className="add-icon"
                      ></AiOutlineAppstoreAdd>
                    </div>
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <Col sm="2" lg="1" className="mx-auto">
              <Spinner animation="border" variant="secondary" />
            </Col>
          )}
        </Row>
      </Container>
    </Container>
  );
};

export default Home;
