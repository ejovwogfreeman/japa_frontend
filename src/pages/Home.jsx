import React from "react";
import "../css/Home.css";
import { FaUsers } from "react-icons/fa";
import BarChart from "../components/BarCart";
import PieChart from "../components/PieChart";
import { users } from "../data";
import img from "../images/gb-profile.png";
import { Link, useNavigate } from "react-router-dom";
import { BsChatRightText, BsFolder2 } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

const Home = ({ user }) => {
  const navigate = useNavigate();
  const logoutUser = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  const cards = [
    { id: 1, icon: <FaUsers />, text: "Members", num: 55 },
    { id: 2, icon: <BsFolder2 />, text: "Uploads", num: 55 },
    { id: 3, icon: <BsChatRightText />, text: "Messages", num: 55 },
    { id: 4, icon: <CgProfile />, text: "Profile", num: 55 },
  ];
  return (
    <div className="dashboard-component">
      <div className="top">
        <div>
          <h2>Dashboard</h2>
          <span>Welcome {user.name}</span>
        </div>
        <div className="profile-img">
          <img src={img} alt="" />
          <div className="account">
            <Link>Account</Link>
            <span className="a" onClick={logoutUser}>
              Logout
            </span>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="cards">
          {cards.map((x) => (
            <div className="card" key={Math.random()}>
              <span className="info">
                <span>{x.text}</span>
                {x.icon}
              </span>
              <h3>{x.num}</h3>
            </div>
          ))}
        </div>
        <div className="charts">
          <BarChart />
          <PieChart />
        </div>
        <div className="users">
          <h3>Users</h3>
          {users.map((x) => (
            <div className="user" key={Math.random()}>
              <img src={x.img} alt="" />
              <div>
                <span>{x.username}</span>
                <span>onine</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
