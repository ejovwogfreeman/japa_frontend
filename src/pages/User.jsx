import React, { useState, useEffect } from "react";
import "../css/Profile.css";
import img from "../images/gb-profile.png";
import { AiOutlineMenu } from "react-icons/ai";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const User = ({ token, users, handleShowNav, user }) => {
  const params = useParams();
  const [role, setRole] = useState("user");

  console.log(user);

  const [loading, setIsLoading] = useState(false);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleRole = async (user_email) => {
    let userInfo = {
      user_email,
      role,
    };
    console.log(userInfo);
    try {
      const response = await axios.patch(
        `https://japaconsults.sammykingx.tech/user/changeRole`,
        { headers },
        userInfo
      );

      setIsLoading(false);
      toast.success("Role updated successfully");
      window.location.reload();
    } catch (error) {
      setIsLoading(false);
      toast.error("Error updating role");
      console.error("Error updating role:", error);
    }
  };

  return (
    <div className="profile-container">
      <span className="menu-btn">
        <AiOutlineMenu onClick={handleShowNav} />
      </span>
      {users.map((x) =>
        Number(x.user_id) === Number(params.id) ? (
          <>
            <img src={img} alt="" />
            <span>{x.name}</span>
            <span>@{x.email.split("@")[0]}</span> <br />
            <p>lorem ipsum dolor sit amet lorem ipsum dolor sit amet</p>
            <section>
              <span>Name:</span>
              <span>{x.name}</span>
            </section>
            <section>
              <span>Email :</span>
              <span>{x.email}</span>
            </section>
            <section>
              <span>Date Joined :</span>
              <span>12/12/2022</span>
            </section>
            <section style={{ position: "relative" }}>
              <span>Role :</span>
              <span>&nbsp;&nbsp;{x.role}</span>
              {user.role === "user" || user.role === "staff" ? (
                ""
              ) : (
                <div
                  onSubmit={handleRole}
                  style={{ position: "absolute", right: "10px" }}
                >
                  <label>Change Role :</label> &nbsp;
                  <select onChange={(e) => setRole(e.target.value)}>
                    <option value="user">USER</option>
                    <option value="staff">STAFF</option>
                    <option value="manager">MANAGER</option>
                  </select>
                  <button onClick={() => handleRole(x.email)}>UPDATE</button>
                </div>
              )}
            </section>
          </>
        ) : (
          <></>
        )
      )}
    </div>
  );
};

export default User;
