import Button from "@restart/ui/esm/Button";
import axios from "axios";
import React from "react";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { randomId } from "../../utilities/utilities";

const AddEvent = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    data.eventId = randomId();
    axios
      .post("http://localhost:5000/events", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <>
      <h4>Add Event</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row sm="1" md="2" className="g-4">
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-bold">Event Title</Form.Label>
              <Form.Control
                {...register("title", { required: true })}
                type="text"
                placeholder="....write here"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-bold">Event date</Form.Label>
              <Form.Control
                {...register("date", { required: true })}
                type="date"
                placeholder="....write here"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-bold">Event description</Form.Label>
              <Form.Control
                as="textarea"
                {...register("description", { required: true })}
                rows="4"
                placeholder="Event description"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-bold">Event Banner</Form.Label>
              <Form.Control
                {...register("img", { required: true })}
                type="text"
                placeholder="image url"
              />
            </Form.Group>
          </Col>
          <input
            type="submit"
            value="Add Event"
            className="nav-btn nav-reg mx-auto"
          />
        </Row>
      </form>
    </>
  );
};

export default AddEvent;
