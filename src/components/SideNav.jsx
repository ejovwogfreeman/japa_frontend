import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsChatRightText, BsFolder2 } from "react-icons/bs";
import { RiDraftLine } from "react-icons/ri";
import { BiLogOutCircle } from "react-icons/bi";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import "../css/SideNav.css";
import logo from "../images/logo.png";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

const SideNav = ({ showNav, handleShowNav }) => {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <>
      {showNav && <div className="dark-bg"></div>}
      <ul className="side-nav">
        {/* <div className="dark-bg"></div> */}
        <div className="close-icon">
          <AiOutlineClose onClick={handleShowNav} />
        </div>
        <img src={logo} alt="" />
        <a href="/">
          <AiOutlineHome />
          <span>Home</span>
        </a>
        <a href="/users">
          <FaUsers />
          <span>Users</span>
        </a>
        <a href="/message">
          <BsChatRightText />
          <span>Messages</span>
        </a>
        <a href="/drafts">
          <RiDraftLine />
          <span>Drafts</span>
        </a>
        <a href="/files">
          <BsFolder2 />
          <span>Files</span>
        </a>
        <a href="/invoices">
          <LiaFileInvoiceDollarSolid />
          <span>Invoice</span>
        </a>
        <span className="logout" onClick={logout}>
          <BiLogOutCircle />
          <span>Logout</span>
        </span>
      </ul>
    </>
  );
};

export default SideNav;
