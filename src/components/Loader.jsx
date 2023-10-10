import React from "react";
import loader from "../images/loading.gif";
import "../css/Loader.css";

const Loader = () => {
  return <img src={loader} alt="" className="loader" />;
};

export default Loader;
