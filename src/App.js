import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideNav from "./components/SideNav";
import Home from "./pages/Home";
import Message from "./pages/Message";
import Files from "./pages/Files";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Drafts from "./pages/Drafts";
import Users from "./pages/Users";
import Invoice from "./pages/Invoice";
import Toastify from "./components/Toastify";
import ProtectedRoutes from "./components/ProtectedRoutes";
import "./App.css";
import AddModal from "./pages/AddModal";
// import { AiOutlineMenu } from "react-icons/ai";
// import { GrClose } from "react-icons/gr";

const App = () => {
  const [user, setUser] = useState({});
  var localUser = JSON.parse(sessionStorage.getItem("user"));
  let token;
  if (localUser) {
    token = localUser.access_token ? localUser.access_token : null;
    const getUser = async () => {
      // Replace 'your_token_here' with the actual token value
      const token_id = token;

      // Create a Headers object and set the Authorization header
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token_id}`);

      // Create the fetch request with the headers
      const res = await fetch(
        "https://japaconsults.sammykingx.tech/user/profile",
        {
          method: "GET",
          headers: headers,
        }
      );

      const data = await res.json();
      setUser(data);
      getUser();
    };
  }

  const [showNav, setShowNav] = useState(false);

  const handleShowNav = () => {
    setShowNav(!showNav);
  };

  return (
    <BrowserRouter>
      {/* <span className="toast_cont"> */}
      <Toastify />
      {/* </span> */}
      {/* {showNav ? (
        <AiOutlineMenu onClick={handleShowNav} />
      ) : (
        <GrClose onClick={handleShowNav} />
      )} */}
      {showNav && <SideNav showNav={showNav} handleShowNav={handleShowNav} />}
      <div className="main-component">
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route
              path="/"
              element={<Home user={user} handleShowNav={handleShowNav} />}
            />{" "}
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route
              path="/message"
              element={<Message token={token} handleShowNav={handleShowNav} />}
            />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route
              path="/drafts"
              element={<Drafts token={token} handleShowNav={handleShowNav} />}
            />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route
              path="/files"
              element={<Files handleShowNav={handleShowNav} />}
            />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route
              path="/users"
              element={<Users handleShowNav={handleShowNav} />}
            />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route
              path="/invoices"
              element={<Invoice handleShowNav={handleShowNav} />}
            />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route
              path="/add_draft"
              element={<AddModal handleShowNav={handleShowNav} />}
            />
          </Route>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
