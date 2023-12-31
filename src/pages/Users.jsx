import React, { useState } from "react";
import "../css/Users.css";
import { FaSearch } from "react-icons/fa";
import Search from "../components/Search";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

const Users = ({ handleShowNav, users }) => {
  const { query, results, handleInputChange } = Search(users);

  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="users-container">
      <div className="left">
        <span className="menu-btn">
          <AiOutlineMenu onClick={handleShowNav} />
        </span>
        <h3>All Users</h3>
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
          {users.length <= 0 ? (
            <h2>No Users</h2>
          ) : (
            <>
              {users.map((x) => (
                <Link to={`/user/${x.user_id}`} key={Math.random()}>
                  <img src={x.img} alt="" />
                  <div style={{ marginLeft: "10px" }}>
                    <span className="top">
                      <span>{x.name}</span>
                      <span>{x.email}</span>
                    </span>
                    <span className="msg">{x.msg}</span>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
        {results.length === 0 && query !== "" && (
          <div>No result for your search</div>
        )}
      </div>
      {/* <div className="right">
        <div className="top">
          <h3>ejovwogfreeman</h3>
          <AiOutlineCloudUpload onClick={handleModal} />
        </div>
        <div className="images">
          {users.map((x) => (
            <img src={x.img} alt="" key={Math.random()} />
          ))}
        </div>
        {modal && <Upload handleModal={handleModal} />}
      </div> */}
    </div>
  );
};

export default Users;
