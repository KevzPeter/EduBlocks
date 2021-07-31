import React, { useState } from "react";
import user_logo from "../assets/student1.png";
import { Document, Page, pdfjs } from "react-pdf";
import { Button, Badge, Modal } from "react-bootstrap";
import "../styles/SubmissionCard.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const axios = require("axios");

export const SubmissionCard = ({ address, contract, ts_contract, std_name, course_name, std_id, course_id, tx, content, student_address, marks }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setShowErr(false);
  };
  const handleShow = () => setShow(true);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [grade, setGrade] = useState("");
  const [err, setErr] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [showErr, setShowErr] = useState(false);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }
  const uploadMarks = async () => {
    if (grade >= 90) {
      await ts_contract.methods.rewardToken(student_address, 20).send({ from: address }, (err, hash) => {
        if (err) console.log("Error: ", err);
        else console.log("Hash: ", hash);
      });
    } else if (grade >= 80) {
      await ts_contract.methods.rewardToken(student_address, 10).send({ from: address }, (err, hash) => {
        if (err) console.log("Error: ", err);
        else console.log("Hash: ", hash);
      });
    } else if (grade >= 70) {
      await ts_contract.methods.rewardToken(student_address, 5).send({ from: address }, (err, hash) => {
        if (err) console.log("Error: ", err);
        else console.log("Hash: ", hash);
      });
    }
    axios
      .post("http://localhost:4000/submissions/uploadmarks", {
        marks: grade,
        course_id: course_id,
        std_id: std_id,
      })
      .then(async (res) => {
        setShowErr(true);
        setUploaded(true);
        res.status === 200 ? setErr(false) : setErr(true);
      })
      .catch((err) => {
        if (!err) console.log("Network Error");
        else console.log(err);
      });
  };

  return (
    <div className="submission-card">
      <div className="submit-img">
        <img src={user_logo} alt="user_img"></img>
      </div>
      <div className="submission-content">
        <p id="std-name">Submitted by: {std_name}</p>
        <p id="scourse-title">Course: {course_name}</p>
        <p id="marks">
          Marks: <Badge variant="info">{marks || uploaded ? marks || grade : "Ungraded"}</Badge>
        </p>
        <Button className="btn-info" onClick={handleShow} disabled={marks !== 0}>
          Grade Submission
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Grade Submission</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {content ? (
              <Document className="submission-pdf" file={{ data: content.data }} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
              </Document>
            ) : (
              <p>Unavailable</p>
            )}
            <p>
              Page {pageNumber} of {numPages}
            </p>
            <div className="buttonc">
              <Button disabled={pageNumber <= 1} onClick={previousPage} className="mx-2">
                Previous
              </Button>
              <Button disabled={pageNumber >= numPages} onClick={nextPage}>
                Next
              </Button>
            </div>
            <div className="form-field marks">
              <label htmlFor="grade">
                Marks <i className="fas fa-clipboard-check"></i>
              </label>
              <input
                type="number"
                id="grade"
                name="Grade"
                max="100"
                min="0"
                placeholder="Grade"
                onChange={(e) => {
                  setGrade(e.target.value);
                }}
              ></input>
            </div>
            {showErr ? (
              err ? (
                <div className="alert alert-danger">Unable to set Marks</div>
              ) : (
                <div className="alert alert-success">
                  <p>
                    Marks Updated<i class="fas fa-check"></i>
                  </p>
                </div>
              )
            ) : null}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="success" onClick={uploadMarks} disabled={uploaded}>
              Set Grade
            </Button>
          </Modal.Footer>
        </Modal>
        <p id="tx-hash">Transaction Hash:{tx}</p>
      </div>
    </div>
  );
};
export default SubmissionCard;
