import React, { useState } from "react";
import "../css/Files.css";
import { FaSearch } from "react-icons/fa";
import { files } from "../data";
import Search from "../components/Search";
import { users } from "../data";
import { AiOutlineCloudUpload, AiOutlineMenu } from "react-icons/ai";
import Upload from "../modals/Upload";
import { BsFolder2 } from "react-icons/bs";
import { Link } from "react-router-dom";

const Files = ({ handleShowNav }) => {
  const { query, results, handleInputChange } = Search(files);

  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="files-container">
      <span className="menu-btn">
        <AiOutlineMenu onClick={handleShowNav} />
      </span>
      <div className="left">
        <h3>All Files</h3>{" "}
        <Link to="/add_draft" className="open-link" style={{ border: "none" }}>
          <AiOutlineCloudUpload style={{ fontSize: "20px" }} />
        </Link>
        <section className="search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleInputChange}
          />
        </section>
        <div className="files">
          {results.map((x) => (
            <div className="file" key={Math.random()}>
              <span>
                <BsFolder2 />
              </span>
              <div>
                <span>{x.filename}</span>
                <span>{x.date}</span>
              </div>
            </div>
          ))}
        </div>
        {results.length === 0 && query !== "" && (
          <div>No result for your search</div>
        )}
      </div>
      <div className="right">
        <div className="top">
          <h3>File 1</h3>
          <AiOutlineCloudUpload onClick={handleModal} />
        </div>
        <div className="images">
          {users.map((x) => (
            <img src={x.img} alt="" key={Math.random()} />
          ))}
        </div>
        {modal && <Upload handleModal={handleModal} />}
      </div>
    </div>
  );
};

export default Files;
