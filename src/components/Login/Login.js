import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import googleIcon from "../../images/google.png";
import "./Login.css";
import useAuth from "../../hooks/useAuth";
import swal from "sweetalert";

const Login = () => {
  const { googleSignIn, user, setError, setUser, setIsLoading } = useAuth();
  const location = useLocation();
  const history = useHistory();

  const redirect_uri = location?.state?.from || "/";

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        setUser(result.user);
        history.push(redirect_uri);
        setIsLoading(false);
        swal(
          `Hi ! ${result.user.displayName}`,
          "You Are Successfully Login",
          "success"
        );
      })
      .catch((err) => setError(err.message));
  };
  return (
    <Container className="my-5">
      <Row>
        <Col
          sm={12}
          md={8}
          lg={5}
          xl={4}
          className="mx-auto 
          "
        >
          <div className="login-form shadow-lg my-5">
            <h5 className="mb-4">Login With</h5>
            <button className="google-login" onClick={handleGoogleSignIn}>
              <img width="25px" src={googleIcon} alt="" />
              <span>Continue with Google</span>
            </button>
            <p>
              Don’t have an account? <NavLink to="">Create an account</NavLink>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
