import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "../css/Profile.css";
import img from "../images/gb-profile.png";
// import { IoCallOutline } from "react-icons/io5";
// import { HiOutlineVideoCamera } from "react-icons/hi";
// import { BsSend } from "react-icons/bs";
// import { users, chats } from "../data";
// import Search from "../components/Search";
import io from "socket.io-client"; // Import Socket.io;
import { AiOutlineMenu } from "react-icons/ai";
import verified from "../images/verified.png";

const Profile = ({ token, handleShowNav, user }) => {
  return (
    <div className="profile-container">
      <span className="menu-btn">
        <AiOutlineMenu onClick={handleShowNav} />
      </span>
      <img src={img} alt="" />
      <span>{user.name}</span>
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <span>@{user.email.split("@")[0]}</span>
        {user.is_verified && (
          <img
            src={verified}
            style={{
              width: "25px",
              height: "25px",
              marginLeft: "3px",
              marginTop: "-3px",
            }}
          />
        )}
      </span>
      <br />
      <p>lorem ipsum dolor sit amet lorem ipsum dolor sit amet</p>
      <section>
        <span>Name:</span>
        <span>{user.name}</span>
      </section>
      <section>
        <span>Email :</span>
        <span>{user.email}</span>
      </section>
      <section>
        <span>Date Joined :</span>
        <span>12/12/2022</span>
      </section>
      <section>
        <span>Date Joined :</span>
        <span>{user.role}</span>
      </section>
    </div>
  );
};

export default Profile;
