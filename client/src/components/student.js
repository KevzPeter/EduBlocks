import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Nav, Button, Badge, Row, Col, Tab } from "react-bootstrap";
import CourseCard from "./CourseCard";
import Metamask_Error from "./metamask_error";
import InfoPanel from "./infopanel";

const axios = require("axios");

export const Student = ({ address, contract, t_contract, ts_contract }) => {
  const tokenPrice = 100000000000000;
  const { id } = useContext(UserContext);
  const [name, setName] = useState("");
  const [tokens, setTokens] = useState(0);
  const [balance, setBalance] = useState(0);
  const [deadline, setDeadline] = useState(0);
  const [results, setResults] = useState([]);

  useEffect(() => {
    getCourses();
    getBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getCourses = async () => {
    if (contract !== undefined && id.id !== null) {
      await contract.methods
        .getStudent(id.id)
        .call()
        .then(async (res) => {
          console.log(res);
          if (res != null || (undefined && res[4][0] != null) || undefined) {
            setName(res[1]);
            setDeadline(res[5]);
          }
          axios
            .post("http://localhost:4000/courses/student", { courses: res[4] }, { headers: { "Content-Type": "application/json" } })
            .then((res) => {
              if (res.data !== undefined) setResults(res.data);
            })
            .catch((err) => {
              if (!err) {
                console.log("Network Error");
              } else console.log(err);
            });
        });
    }
  };
  const getBalance = async () => {
    if (t_contract !== undefined && id.id != null) {
      await t_contract.methods
        .getBalance(address)
        .call()
        .then((res) => {
          console.log(res);
          setBalance(res);
        });
    }
  };
  const buyToken = async (total) => {
    if (ts_contract !== undefined && id.id != null) {
      await ts_contract.methods.buyTokens(parseInt(tokens)).send({ from: address, value: tokens * tokenPrice }, (err, hash) => {
        if (err) console.log("Error: ", err);
        else console.log("Hash: ", hash);
      });
      getBalance();
    }
  };
  const ShowResults = () => {
    return (
      <div>
        {results.map((el, idx) => (
          <CourseCard
            key={idx}
            title={el.name}
            s_name={name}
            deadline={deadline}
            desc={el.description}
            subs={el.users}
            price={el.price}
            c_id={el.id}
            author={el.author}
            id={id.id}
            thumbnail={el.thumbnail}
            type={false}
          />
        ))}
      </div>
    );
  };
  if (contract === undefined) {
    return <Metamask_Error />;
  } else if (id.id == null) {
    return (
      <div className="Error">
        <h1>You are not authorised to view this page</h1>
        <Link to="/">Home</Link>
      </div>
    );
  } else
    return (
      <div>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={2} className="left-tab-container">
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">My Courses</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Payments</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <InfoPanel address={address} name={name} />
                  <h4>Courses</h4>
                  <ShowResults />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <div className="result">
                    <p>
                      Your balance: <Badge variant="success">{balance} EDBX</Badge>
                    </p>
                  </div>
                  <div className="buyToken">
                    <h5>
                      <label htmlFor="token">
                        EDBX Tokens <i className="fas fa-coins"></i>
                      </label>
                    </h5>
                    <input
                      type="text"
                      id="edbx"
                      name="edbx"
                      className="form-control token"
                      placeholder="Enter amount"
                      onChange={(e) => {
                        setTokens(e.target.value);
                      }}
                    ></input>
                    <p>
                      <Badge variant="info">{tokens * 100000000000000} Wei</Badge> = <Badge variant="info">{tokens * 0.0001} Ether</Badge>
                    </p>
                    <Button
                      className="btn-primary"
                      onClick={(e) => {
                        buyToken(tokens);
                      }}
                      active
                    >
                      Buy Token
                    </Button>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
};

export default Student;
