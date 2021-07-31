import React, { useContext } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/Edublocks.png";
import "../styles/Navbar.css";
import { UserContext } from "../UserContext";

const Navigation = () => {
  const { id, setID } = useContext(UserContext);
  const logout = () => {
    setID({ id: null, user: null });
  };
  return (
    <Navbar bg="light">
      <Link to="/">
        <Navbar.Brand>
          <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top" /> Edublocks
        </Navbar.Brand>
      </Link>
      {id.id === null ? (
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href="/login">
              <Button className="btn-success">Login</Button>
            </Nav.Link>
            <Nav.Link href="/signup">
              <Button className="btn-success">Signup</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      ) : id.user === "student" ? (
        <Navbar.Collapse>
          <Nav>
            <Link to="/student">
              <Button className="btn-info" id="account1">
                Account
              </Button>
            </Link>
            <Link to="/">
              <Button className="btn-danger" onClick={logout}>
                Logout
              </Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      ) : (
        <Navbar.Collapse>
          <Nav>
            <Link to="/educator">
              <Button className="btn-info" id="account2">
                Account
              </Button>
            </Link>
            <Link to="/">
              <Button className="btn-danger" onClick={logout}>
                Logout
              </Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
};

export default Navigation;
