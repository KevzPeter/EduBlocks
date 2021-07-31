import React, { useState, useEffect, useContext } from "react";
import { Nav, Button, Badge, Row, Col, Tab, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Educator.css";
import { UserContext } from "../UserContext";
import SubmissionCard from "./SubmissionCard";
import CourseCard from "./CourseCard";
import Metamask_Error from "./metamask_error";
const axios = require("axios");

export const Educator = ({ address, contract, t_contract, ts_contract }) => {
  const { id } = useContext(UserContext);
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [courseID, setCourseID] = useState(1);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [author, setAuthor] = useState("");
  const [authorID, setAuthorID] = useState(1);
  const [price, setPrice] = useState(0);
  const [ques, setQues] = useState("");
  const [dline, setDline] = useState(1);
  const [results, setResults] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [thumbnail, setThumbnail] = useState();
  const [content, setContent] = useState();
  const [isThumbnailPicked, setThumbnailPicked] = useState(false);
  const [isContentPicked, setContentPicked] = useState(false);
  const [cd, setCD] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(async () => {
    const getDetails = async () => {
      if (contract !== undefined && id.id != null) {
        await contract.methods
          .getCourseCount()
          .call()
          .then((res) => {
            setCourseID(parseInt(res[0]) + 1);
          });
        await contract.methods
          .getEducator(id.id)
          .call()
          .then((res) => {
            if (res !== null && res !== undefined) {
              setAuthorID(res[0]);
              setAuthor(res[1]);
              if (res[4]) setCount(res[4].length);
            }
          });
      }
    };
    const getSubmissions = async () => {
      axios
        .post("http://localhost:4000/submissions/edu_submissions", { id: id.id }, { headers: { "Content-Type": "application/json" } })
        .then((res) => {
          if (res.data !== undefined) setSubmissions(res.data);
        })
        .catch((err) => {
          if (!err) {
            console.log("Network Error");
          } else console.log(err);
        });
    };
    getDetails();
    getCourses();
    getSubmissions();
    getBalance();
  }, [contract]);

  const t_changeHandler = (e) => {
    setThumbnail(e.target.files[0]);
    setThumbnailPicked(true);
  };
  const c_changeHandler = (e) => {
    setContent(e.target.files[0]);
    setContentPicked(true);
  };

  const uploadCourse = async (e) => {
    e.preventDefault();
    handleClose();
    await contract.methods.addCourse(name, desc, author, parseInt(price), parseInt(dline), parseInt(authorID)).send({ from: address }, (err, hash) => {
      if (err) console.log("Error: ", err);
      else console.log("Hash: ", hash);
    });
    await contract.methods
      .getCourseCount()
      .call()
      .then((res) => {
        setCD(parseInt(res));
      })
      .catch((err) => {
        console.log(err);
      });
    await contract.methods
      .getCourse(parseInt(cd))
      .call()
      .then((res) => {
        setDline(res[7]);
      })
      .catch((err) => {
        console.log(err);
      });
    const form = new FormData();
    form.append("name", name);
    form.append("id", courseID);
    form.append("description", desc);
    form.append("author", author);
    form.append("author_id", authorID);
    form.append("address", address);
    form.append("price", price);
    form.append("question", ques);
    form.append("deadline", dline);
    form.append("thumbnail", thumbnail);
    form.append("content", content);
    axios
      .post("http://localhost:4000/courses/upload", form)
      .then(async (res) => {
        setCount(count + 1);
        getCourses();
        setCourseID(courseID + 1);
      })
      .catch((err) => {
        if (!err) {
          console.log("Network Error");
        } else console.log(err);
      });
  };

  const getCourses = async () => {
    axios
      .post("http://localhost:4000/courses/educator", { id: id.id }, { headers: { "Content-Type": "application/json" } })
      .then((res) => {
        if (res.data !== undefined) setResults(res.data);
      })
      .catch((err) => {
        if (!err) {
          console.log("Network Error");
        } else console.log(err);
      });
  };

  const ShowResults = () => {
    return (
      <div>
        {results.map((el, idx) => (
          <CourseCard
            key={idx}
            title={el.name}
            c_id={el.id}
            s_name={"Kevin Peter"}
            desc={el.description}
            subs={el.users}
            price={el.price}
            author={el.author}
            id={id.id}
            thumbnail={el.thumbnail}
            type={false}
          />
        ))}
      </div>
    );
  };

  const ShowSubmissions = () => {
    return (
      <div>
        {submissions.map((el, idx) => (
          <SubmissionCard
            key={idx}
            address={address}
            std_name={el.std_name}
            marks={el.marks}
            course_name={el.course_name}
            std_id={el.std_id}
            course_id={el.course_id}
            contract={contract}
            tx={el.transaction_hash}
            content={el.content}
            student_address={el.address}
            ts_contract={ts_contract}
          />
        ))}
      </div>
    );
  };

  const getBalance = async () => {
    if (t_contract !== undefined && id.id != null) {
      await t_contract.methods
        .getBalance(address)
        .call()
        .then((res) => {
          console.log(res);
          if (res != null) {
            setBalance(res);
          }
        });
    }
  };

  if (contract === undefined) {
    return <Metamask_Error />;
  } else if (id.id === null) {
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
                  <Nav.Link eventKey="first">Courses</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Submissions</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Payments</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <div className="info-panel">
                    <div className="left">
                      <h4 id="info-name">Welcome {author || null}</h4>
                      <p id="info-address">Address: {address || null}</p>
                    </div>
                    <div className="right">
                      <Button className="btn-primary my-3" variant="dark" onClick={handleShow}>
                        Add Course
                      </Button>
                    </div>
                  </div>
                  <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form className="form-container">
                        <div className="form-field">
                          <label htmlFor="name">
                            <i className="fas fa-signature"></i>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Title"
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                          ></input>
                        </div>
                        <div className="form-field">
                          <label htmlFor="desc">
                            <i className="fas fa-comment-alt"></i>
                          </label>
                          <input
                            type="text"
                            id="desc"
                            name="desc"
                            placeholder="Description"
                            onChange={(e) => {
                              setDesc(e.target.value);
                            }}
                          ></input>
                        </div>
                        <div className="form-field">
                          <label htmlFor="price">
                            <i className="fas fa-dollar-sign"></i>
                          </label>
                          <input
                            type="text"
                            id="price"
                            name="price"
                            placeholder="Price"
                            onChange={(e) => {
                              setPrice(e.target.value);
                            }}
                          ></input>
                        </div>
                        <div className="form-field">
                          <label htmlFor="assignment">
                            <i className="fas fa-file-alt"></i>
                          </label>
                          <input
                            type="text"
                            id="assgn"
                            name="assgn"
                            placeholder="Assignment Question"
                            onChange={(e) => {
                              setQues(e.target.value);
                            }}
                          ></input>
                        </div>
                        <div className="form-field">
                          <label htmlFor="deadline">
                            <i className="fas fa-calendar-check"></i>
                          </label>
                          <input
                            type="number"
                            id="deadline"
                            name="deadline"
                            placeholder="Deadline"
                            onChange={(e) => {
                              setDline(e.target.value);
                            }}
                          ></input>
                        </div>
                      </form>
                      <div>
                        <input type="file" name="file" onChange={t_changeHandler} />
                        {isThumbnailPicked ? <p>Size: {thumbnail === undefined ? "0" : (thumbnail.size / 1000000).toFixed(1)} MB</p> : <p>Upload Course thumbnail</p>}
                      </div>
                      <div>
                        <input type="file" name="file" onChange={c_changeHandler} />
                        {isContentPicked ? (
                          content == null ? (
                            ""
                          ) : (
                            <>
                              <p>Size: {(content.size / 1000000).toFixed(1)}MB</p>
                            </>
                          )
                        ) : (
                          <p>Upload Course content</p>
                        )}
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="danger" onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button variant="success" onClick={uploadCourse}>
                        Publish Course
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <h3> You have created {count} course(s)</h3>
                  <ShowResults />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <h4>You have {submissions.length} submission(s)</h4>
                  <ShowSubmissions />
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <div className="result">
                    <p>
                      Your balance: <Badge variant="success">{balance} EDBX</Badge>
                    </p>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
};
export default Educator;
