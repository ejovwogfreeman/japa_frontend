// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FaSearch } from "react-icons/fa";
// import "../css/Messages.css";
// import img from "../images/gb-profile.png";
// import { IoCallOutline } from "react-icons/io5";
// import { HiOutlineVideoCamera } from "react-icons/hi";
// import { BsSend } from "react-icons/bs";
// import { chats } from "../data";
// import Search from "../components/Search";

// const Drafts = ({ token }) => {
//   const [drafts, setDrafts] = useState([]);
//   const { query, results, handleInputChange } = Search(drafts);
//   useEffect(() => {
//     const getDrafts = async () => {
//       try {
//         const res = await fetch("http://test.sammykingx.tech/drafts/", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (res.ok) {
//           const data = await res.json();
//           setDrafts(data);
//           return data;
//         } else {
//           console.error("Failed to fetch drafts:", res.status, res.statusText);
//           return null;
//         }
//       } catch (error) {
//         console.error("Error fetching drafts:", error);
//         return null;
//       }
//     };
//     getDrafts();
//   }, [token]);

//   console.log(drafts);

//   return (
//     <div className="message-container">
//       <div className="left">
//         <h3>All Drafts</h3>
//         <section className="search">
//           <FaSearch />
//           <input
//             type="text"
//             placeholder="Search..."
//             value={query}
//             onChange={handleInputChange}
//           />
//         </section>
//         {results.map((x) => (
//           <Link to="" key={x.id}>
//             {console.log(x)}
//             <img src={x.img} alt="" />
//             <div>
//               <span className="top">
//                 <span>{x.content}</span>
//                 {/* <span>{x.date_created}</span> */}
//               </span>
//               <span className="msg">{x.date_created}</span>
//             </div>
//           </Link>
//         ))}
//         {results.length === 0 && query !== "" && (
//           <div>No result for your search</div>
//         )}
//       </div>
//       <div className="center">
//         <div className="top">
//           <div className="top-left">
//             <img src={img} alt="" />
//             <div className="text">
//               <span>ejovwogfreeman</span>
//               <span>online</span>
//             </div>
//           </div>
//           <div className="top-right">
//             <IoCallOutline />
//             <HiOutlineVideoCamera />
//           </div>
//         </div>
//         <div className="chats">
//           {chats.map((x) => (
//             <div
//               className={x.type === "sender" ? "chat sender" : "chat receiver"}
//               key={Math.random()}
//             >
//               <div
//                 className={
//                   x.type === "sender" ? "sender-color" : "receiver-color"
//                 }
//               >
//                 <span>{x.username}</span>
//                 <span>{x.msg}</span>
//                 <span>{x.time}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//         <form action="">
//           <input
//             type="text"
//             id="message"
//             placeholder="Type your message here..."
//           />
//           <button>
//             <BsSend />
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Drafts;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FaSearch } from "react-icons/fa";
// import "../css/Messages.css";
// import img from "../images/gb-profile.png";
// import { IoCallOutline } from "react-icons/io5";
// import { HiOutlineVideoCamera } from "react-icons/hi";
// import { BsSend } from "react-icons/bs";
// import { chats } from "../data";
// import Search from "../components/Search";

// const Drafts = ({ token }) => {
//   const [drafts, setDrafts] = useState([]);
//   const { query, results, handleInputChange } = Search(drafts);

//   useEffect(() => {
//     const getDrafts = async () => {
//       try {
//         const res = await fetch("http://test.sammykingx.tech/drafts/", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (res.ok) {
//           const data = await res.json();
//           setDrafts(data);
//         } else {
//           console.error("Failed to fetch drafts:", res.status, res.statusText);
//         }
//       } catch (error) {
//         console.error("Error fetching drafts:", error);
//       }
//     };

//     getDrafts();
//   }, [token]);

//   console.log(drafts);

//   return (
//     <div className="message-container">
//       <div className="left">
//         <h3>All Drafts</h3>
//         <section className="search">
//           <FaSearch />
//           <input
//             type="text"
//             placeholder="Search..."
//             value={query}
//             onChange={handleInputChange}
//           />
//         </section>
//         {drafts.map((x) => (
//           <Link to={`/draft/${x.draft_id}`} key={Math.random()}>
//             {/* Adjust the content you want to display */}
//             <div>
//               <span className="top">
//                 <span>{x.content}</span>
//               </span>
//               <span className="msg">{x.date_created}</span>
//             </div>
//           </Link>
//         ))}
//         {results.length === 0 && query !== "" && (
//           <div>No result for your search</div>
//         )}
//       </div>

//       <div className="center">
//         <div className="top">
//           <div className="top-left">
//             <img src={img} alt="" />
//             <div className="text">
//               <span>ejovwogfreeman</span>
//               <span>online</span>
//             </div>
//           </div>
//           <div className="top-right">
//             <IoCallOutline />
//             <HiOutlineVideoCamera />
//           </div>
//         </div>
//         <div className="chats">
//           {chats.map((x) => (
//             <div
//               className={x.type === "sender" ? "chat sender" : "chat receiver"}
//               key={Math.random()}
//             >
//               <div
//                 className={
//                   x.type === "sender" ? "sender-color" : "receiver-color"
//                 }
//               >
//                 <span>{x.username}</span>
//                 <span>{x.msg}</span>
//                 <span>{x.time}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//         <form action="">
//           <input
//             type="text"
//             id="message"
//             placeholder="Type your message here..."
//           />
//           <button>
//             <BsSend />
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Drafts;

import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "../css/Drafts.css";
import img from "../images/gb-profile.png";
import { IoCreateOutline, IoAddCircleOutline } from "react-icons/io5";
import Search from "../components/Search";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import { RiDraftLine } from "react-icons/ri";
import DraftsModal from "./DraftsModal";
import { AiOutlineMenu } from "react-icons/ai";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
// import { useNavigate } from "react-router-dom";
// import jwt_decode from "jwt-decode";

const Draft = ({ token, handleShowNav, drafts }) => {
  //   const [drafts, setDrafts] = useState([]);
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
        `https://test.sammykingx.tech/notes/delete/?d_id=${params.id}`,
        { headers }
      );

      setIsLoading(false);
      toast.success("Draft deleted successfully");
      navigate("/drafts");
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to delete draft");
      console.error("Error deleting draft:", error);
    }
  };

  console.log(headers);

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
      <>
        <div className="left">
          <>
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
                        className={`draft-item ${
                          x === selectedDraft ? "selected" : ""
                        }`}
                        key={x.draft_id}
                        onClick={() => handleDraftSelection(x)}
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
          </>
        </div>
      </>
    </div>
  );
};

export default Draft;
