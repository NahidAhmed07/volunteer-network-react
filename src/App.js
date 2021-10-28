import logo from "./logo.svg";
import "./App.css";
import useFirebase from "./hooks/useFirebase";
import AuthProvider from "./context/AuthProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Menubar from "./components/Menubar/Menubar";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Register from "./components/Register/Register";
import UserEvents from "./components/UserEvents/UserEvents";
import Admin from "./components/Admin/Admin";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import AdminRoute from "./components/AdminRoute/AdminRoute";

function App() {
  return (
    <div className="App py-5">
      <AuthProvider>
        <Router>
          <Menubar></Menubar>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <PrivateRoute Route path="/user_events">
              <UserEvents></UserEvents>
            </PrivateRoute>
            <PrivateRoute path="/register/:eventId">
              <Register></Register>
            </PrivateRoute>

            <AdminRoute path="/admin">
              <Admin></Admin>
            </AdminRoute>
            <Route path="/admin_login">
              <AdminLogin></AdminLogin>
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
