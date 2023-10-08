import React from "react";
import "../css/Modal.css";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const InvoiceUpload = () => {
  return (
    <div className="modal-form">
      <form>
        <h3>CREATE INVOICE</h3>
        <div>
          <label htmlFor="">Upload File</label>
          <input type="file" />
        </div>
        <div>
          <button>UPLOAD</button>
        </div>
        <Link to="/invoices">
          <AiOutlineClose />
        </Link>
      </form>
    </div>
  );
};

export default InvoiceUpload;
