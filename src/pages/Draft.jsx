import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../css/Drafts.css";
import { IoCreateOutline, IoAddCircleOutline } from "react-icons/io5";
import Search from "../components/Search";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineMenu } from "react-icons/ai";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
// import { useNavigate } from "react-router-dom";
// import jwt_decode from "jwt-decode";

const Draft = ({ token, handleShowNav, drafts }) => {
  const [selectedDraft, setSelectedDraft] = useState(null); // Track the selected draft
  const { query, results, handleInputChange } = Search(drafts);

  const params = useParams();
  const navigate = useNavigate();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [isLoading, setIsLoading] = useState(false);
  console.log(params.id);

  const handleDeleteDraft = async () => {
    try {
      setIsLoading(true);

      const response = await axios.delete(
        `https://japaconsults.sammykingx.tech/notes/delete/?d_id=${params.id}`,
        { headers }
      );

      setIsLoading(false);
      toast.success("Draft deleted successfully");
      window.location.replace("/drafts");
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to delete draft");
      console.error("Error deleting draft:", error);
    }
  };

  return (
    <div className="draft-container">
      <div className="left">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <span className="menu-btn">
              <AiOutlineMenu onClick={handleShowNav} />
            </span>
            <h3>All Drafts</h3>{" "}
            <Link
              to={`/edit_draft/${params.id}`}
              className="open-link"
              style={{ border: "none", padding: "5px" }}
            >
              <IoCreateOutline style={{ fontSize: "25px" }} />
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
            {drafts.map((x) => (
              <section key={Math.random()}>
                {Number(x.draft_id) === Number(params.id) && (
                  <div
                    className="draft-item"
                    key={x.draft_id}
                    style={{ position: "relative" }}
                  >
                    <h1 className="top">
                      <span style={{ margin: "auto" }}>
                        {x.title.toUpperCase()}
                      </span>
                    </h1>
                    <div
                      style={{ marginLeft: "0px", padding: "10px 0px" }}
                      dangerouslySetInnerHTML={{
                        __html: x.content,
                      }}
                    />
                    <span className="msg">{x.date_created}</span>
                    <span
                      style={{
                        position: "absolute",
                        bottom: "0px",
                        right: "10px",
                        fontSize: "25px",
                      }}
                    >
                      <BsTrash onClick={handleDeleteDraft} />
                    </span>
                  </div>
                )}
              </section>
            ))}
            {results.length === 0 && query !== "" && (
              <div>No result for your search</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Draft;
