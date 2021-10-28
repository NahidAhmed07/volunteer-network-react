import React, { useRef } from "react";
import { useHistory, useLocation } from "react-router";
import swal from "sweetalert";
import useAuth from "../../hooks/useAuth";
import "./AdminLogin.css";
const AdminLogin = () => {
  const nameRef = useRef();
  const passRef = useRef();
  const uName = process.env.REACT_APP_ADMIN_USER_NAME;
  const pass = process.env.REACT_APP_ADMIN_PASS;
  const { setAdmin } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const redirect_uri = location?.state?.from || "/";
  console.log(redirect_uri);
  console.log(location?.state?.from);

  const handleSubmit = (e) => {
    const username = nameRef.current.value;
    const password = passRef.current.value;

    if (username === uName && password === pass) {
      localStorage.setItem("admin_info", "ADMINinfo9910099");
      swal({
        title: "Login Successful",
        text: "congratulation, you are Admin Now",
        icon: "success",
        button: "ok",
      });
      setAdmin(true);

      history.push(redirect_uri);
    } else {
      swal({
        title: "Login Failed",
        text: "Invalid username and password",
        icon: "error",
        button: "try Again",
      });
    }

    e.preventDefault();
  };
  return (
    <div className="py-5">
      <h3>Admin login</h3>

      <div className="admin-form mx-auto">
        <form>
          <input type="text" placeholder="Admin Username" ref={nameRef} />
          <input type="password" placeholder="Admin Password" ref={passRef} />
          <input type="submit" onClick={handleSubmit} />
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
