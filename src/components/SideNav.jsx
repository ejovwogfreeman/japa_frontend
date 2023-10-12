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
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const SideNav = ({ showNav, handleShowNav, user }) => {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
    handleShowNav();
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
        <Link onClick={handleShowNav} to="/">
          <AiOutlineHome />
          <span>Home</span>
        </Link>
        {user.role !== "user" && (
          <Link onClick={handleShowNav} to="/users">
            <FaUsers />
            <span>Users</span>
          </Link>
        )}
        <Link onClick={handleShowNav} to="/message">
          <BsChatRightText />
          <span>Messages</span>
        </Link>
        <Link onClick={handleShowNav} to="/drafts">
          <RiDraftLine />
          <span>Drafts</span>
        </Link>
        <Link onClick={handleShowNav} to="/files">
          <BsFolder2 />
          <span>Files</span>
        </Link>
        <Link onClick={handleShowNav} to="/invoices">
          <LiaFileInvoiceDollarSolid />
          <span>Invoice</span>
        </Link>
        <Link onClick={handleShowNav} to="/profile">
          <CgProfile />
          <span>Profile</span>
        </Link>
        <span className="logout" onClick={logout}>
          <BiLogOutCircle />
          <span>Logout</span>
        </span>
      </ul>
    </>
  );
};

export default SideNav;
