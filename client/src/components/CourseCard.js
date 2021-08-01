import React, { useState } from "react";
import "../styles/CourseCard.css";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const axios = require("axios");

export const CourseCard = ({ address, contract, ts_contract, title, author_id, s_name, c_id, desc, subs, price, author, thumbnail, id, type, user, author_address, deadline }) => {
  const [loading, setLoading] = useState(false);

  const purchase = async () => {
    setLoading(true);
    if (id === null) {
      window.alert("Create a Student Account to Purchase");
      setLoading(false);
    } else {
      await ts_contract.methods.payEducator(author_address, parseInt(price)).send({ from: address }, (err, hash) => {
        if (err) {
          setLoading(false);
          console.log("Error: ", err);
        } else console.log("Hash: ", hash);
      });
      await contract.methods.buyCourse(parseInt(id), parseInt(c_id), parseInt(Math.round(new Date().getTime() / 1000)), parseInt(author_id)).send({ from: address }, (err, hash) => {
        if (err) {
          setLoading(false);
          console.log("Error: ", err);
        } else console.log("Hash: ", hash);
      });
      axios
        .post("http://localhost:4000/courses/updateusers", { course_id: c_id }, { headers: { "Content-Type": "application/json" } })
        .then((res) => {
          setLoading(false);
          console.log(res.data);
        })
        .catch((err) => {
          setLoading(false);
          if (!err) console.log("Network Error");
          else console.log(err);
        });
    }
  };
  return (
    <div className="course-card">
      <div className="course-img">
        <img src={`data:image/png;base64,${thumbnail}`} alt="course_img"></img>
      </div>
      <div className="course-content">
        <p id="course-title">{title || "No data"}</p>
        <p id="course-desc">{desc || "No data"}</p>
        <p id="course-subs">
          Users: <Badge variant="info">{subs || "0"}</Badge>
        </p>
        <p id="course-price">
          Price: <Badge variant="success">{price || "No data"} EDBX</Badge>
        </p>
        <p id="course-author">
          Author: <Badge variant="secondary">{author || "No data"}</Badge>
        </p>
        {!type ? (
          <Link to={{ pathname: "/course", c_id: c_id, c_name: title, s_name: s_name, deadline: deadline }}>
            <Button>Open Course</Button>
          </Link>
        ) : (
          <Button className="btn-info" onClick={purchase} disabled={user === "educator"}>
            {loading ? <Loader type="TailSpin" height="25" width="25" color="#fff" /> : "Purchase"}
          </Button>
        )}
      </div>
    </div>
  );
};
export default CourseCard;
