import React from "react";
import { useParams, Link } from "react-router-dom";
const PageNotFound = () => {
    const { id }= useParams();
    console.log(`404 ID : ${id}`)
    const message = id ? `No Tutorial found with id : ${id}`: 'The page you requested was not found.';
  return (
    <div className="d-flex justify-content-center align-items-center" id="main">
      <h1 className="mr-3 pr-3 align-top border-right inline-block align-content-center">
        404
      </h1>
      <div className="inline-block align-middle">
        <p className="font-weight-normal lead" id="desc">
        {!id ? 'The page you requested was not found.' : <span>No Tutorial found with id : <b>{id}</b></span>}
        </p>
        <p>
            Go back to :  <Link to={"/"} className="nav-link">
              Home
            </Link>
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
