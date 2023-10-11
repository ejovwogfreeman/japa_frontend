import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "../css/Profile.css";
import img from "../images/gb-profile.png";
import { IoCallOutline } from "react-icons/io5";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { BsSend } from "react-icons/bs";
import { users, chats } from "../data";
import Search from "../components/Search";
import io from "socket.io-client"; // Import Socket.io;
import { AiOutlineMenu } from "react-icons/ai";

const User = ({ token, handleShowNav }) => {
  return (
    <div className="profile-container">
      <span className="menu-btn">
        <AiOutlineMenu onClick={handleShowNav} />
      </span>
      <img src={img} alt="" />
      <span>Ejovwo Godbless</span>
      <span>@ejovwogfreeman</span> <br />
      <p>lorem ipsum dolor sit amet lorem ipsum dolor sit amet</p>
      <section>
        <span>Name:</span>
        <span>Ejovwo Godbless</span>
      </section>
      <section>
        <span>Email :</span>
        <span>ejovwogfreeman007@gmail.com</span>
      </section>
      <section>
        <span>Date Joined :</span>
        <span>12/12/2022</span>
      </section>
    </div>
  );
};

export default User;
