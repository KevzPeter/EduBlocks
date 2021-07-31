import React from "react";
import { Link } from "react-router-dom";

export const Error = () => {
  return (
    <div className="Error">
      <h1>ERROR 404</h1>
      <h3>This page does not exist</h3>
      <Link to="/">Home</Link>
    </div>
  );
};
