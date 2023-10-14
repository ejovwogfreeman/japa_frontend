import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "../css/Drafts.css";
import { IoAddCircleOutline } from "react-icons/io5";
import Search from "../components/Search";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const Drafts = ({ handleShowNav, drafts }) => {
  const [selectedDraft, setSelectedDraft] = useState(null);
  const { query, results, handleInputChange } = Search(drafts);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!drafts) {
      setIsLoading(true);
    }
  }, [drafts]);

  return (
    <div className="draft-container">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="left">
          <>
            <span className="menu-btn">
              <AiOutlineMenu onClick={handleShowNav} />
            </span>
            <h3>All Drafts</h3>{" "}
            <Link
              to="/add_draft"
              className="open-link"
              style={{ border: "none", padding: "5px" }}
            >
              <IoAddCircleOutline style={{ fontSize: "25px" }} />
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
            {drafts.length <= 0 ? (
              <h2>No drafts yet</h2>
            ) : (
              <>
                {drafts
                  .slice()
                  .reverse() // Reverse the order of drafts
                  .map((x) => (
                    <Link to={`/draft/${x.draft_id}`} key={x.draft_id}>
                      <div
                        className="draft-item"
                        key={x.draft_id}
                        style={{ border: "none", cursor: "pointer" }}
                      >
                        <span className="top">
                          <strong> {x.title.toUpperCase()}</strong>
                        </span>
                        <div
                          style={{ marginLeft: "0px" }}
                          dangerouslySetInnerHTML={{
                            __html:
                              x.content.slice(0, 50) +
                              ` ...<em><small><Link to='/draft/${x.draft_id}'>see more</Link></small></em>`,
                          }}
                        />
                        <span className="msg">{x.date_created}</span>
                      </div>
                    </Link>
                  ))}
                {results.length === 0 && query !== "" && (
                  <div>No result for your search</div>
                )}
              </>
            )}
          </>
        </div>
      )}
    </div>
  );
};

export default Drafts;
