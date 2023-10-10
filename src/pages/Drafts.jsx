import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "../css/Drafts.css";
import { IoAddCircleOutline } from "react-icons/io5";
import Search from "../components/Search";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import { toast } from "react-toastify";
import DraftsModal from "./DraftsModal";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const Drafts = ({ token, handleShowNav, drafts }) => {
  const [selectedDraft, setSelectedDraft] = useState(null);
  const { query, results, handleInputChange } = Search(drafts);

  const [isLoading, setIsLoading] = useState(drafts.length === 0);

  useEffect(() => {
    setIsLoading(drafts.length === 0);
  }, [drafts]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDrafts, setShowDrafts] = useState(false);

  const handleDraftSelection = (draft) => {
    setSelectedDraft(draft);
    setShowDrafts(false);
  };

  const handleShowAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const handleShowUpdateModal = () => {
    if (!selectedDraft) {
      return toast.error("PLEASE SELECT A DRAFT");
    }
    setShowUpdateModal(!showUpdateModal);
  };

  const handleShowDrafts = () => {
    setShowDrafts(!showDrafts);
  };

  return (
    <div className="draft-container">
      {showAddModal && (
        <AddModal handleShowAddModal={handleShowAddModal} token={token} />
      )}
      {showDrafts && (
        <DraftsModal
          handleShowDrafts={handleShowDrafts}
          handleDraftSelection={handleDraftSelection}
          token={token}
          drafts={drafts}
        />
      )}
      {showUpdateModal && (
        <>
          {drafts.map(
            (draft) =>
              selectedDraft.draft_id === draft.draft_id && (
                <UpdateModal
                  key={draft.draft_id}
                  draft={draft}
                  handleShowUpdateModal={handleShowUpdateModal}
                  token={token}
                />
              )
          )}
        </>
      )}
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
            {drafts.map((x) => (
              <Link to={`/draft/${x.draft_id}`} key={Math.random()}>
                <div
                  to="/"
                  className={`draft-item ${
                    x === selectedDraft ? "selected" : ""
                  }`}
                  key={x.draft_id}
                  onClick={() => handleDraftSelection(x)}
                  style={{ border: "none" }}
                >
                  <span className="top">
                    <strong> {x.title}</strong>
                  </span>
                  <div
                    style={{ marginLeft: "0px" }}
                    dangerouslySetInnerHTML={{
                      __html:
                        x.content.slice(0, 50) +
                        ` ...<em><small><Link to='/draft/${x.draft_id}' style='color: blue'>see more</Link></small></em>`,
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
      </div>
    </div>
  );
};

export default Drafts;
