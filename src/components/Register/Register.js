import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./Register.css";
import logo from "../../images/logo.png";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import swal from "sweetalert";

const Register = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [event, setEvent] = useState({});
  const { eventId } = useParams();
  const { user } = useAuth();
  const history = useHistory();
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    axios
      .get(`https://fast-ravine-50741.herokuapp.com/event/${eventId}`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  setValue("name", user.displayName);
  setValue("username", user.email || user.displayName);
  setValue("event", event.title);

  const onSubmit = (data) => {
    setIsUpdated(true);
    const date = new Date();
    const currentDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    data.registerDate = currentDate;
    data.eventId = event.eventId;
    data.userId = user.uid;

    axios
      .post("https://fast-ravine-50741.herokuapp.com/event/register", data)
      .then((res) => {
        if (res.data?.eventAdded) {
          swal({
            title: "Registration Failed !",
            text: "This event already Added your event list",
            icon: "error",
            buttons: "back to Home",
          });
        }
        if (res.data.insertedId) {
          swal(
            "Registration Successful",
            "Your Entered Information has been Successfully save on our Database",
            "success"
          );
          history.push("/home");
        }
        setIsUpdated(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsUpdated(false);
        swal("Registration Failed", err.message, "error");
      });
  };
  return (
    <Container className="my-5">
      <div>
        <img height="80px" src={logo} alt="" />
      </div>
      <Row>
        <Col sm="12" md="8" lg="6" xl="5" className="mx-auto text-start mt-5">
          <div className="reg-form">
            <h4
              style={{ fontSize: "26px" }}
              className="header-text text-start mb-3"
            >
              Register as a Volunteer{" "}
            </h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="">Full Name </label> <br />
              <input {...register("name")} /> <br />
              <label htmlFor="">Username Or Email</label> <br />
              <input {...register("username", { required: true })} /> <br />
              <label htmlFor="">Date</label> <br />
              <input
                type="date"
                {...register("eventDate", { required: true })}
                placeholder="Date"
              />{" "}
              <br />
              <label htmlFor="">Description</label> <br />
              <input
                {...register("Description", { required: true })}
                placeholder="Description"
              />{" "}
              <br />
              <label htmlFor="">Event Name</label> <br />
              <input {...register("event")} /> <br />
              <button type="submit" className="rag-submit w-100">
                {isUpdated ? (
                  <Spinner
                    animation="border"
                    variant="light"
                    style={{ height: "25px", width: "25px" }}
                  />
                ) : (
                  "Registration"
                )}
              </button>
              {errors.exampleRequired && <span>This field is required</span>}
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
