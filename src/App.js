import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideNav from "./components/SideNav";
import Home from "./pages/Home";
import Message from "./pages/Message";
import Files from "./pages/Files";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Drafts from "./pages/Drafts";
import Draft from "./pages/Draft";
import Users from "./pages/Users";
import Invoice from "./pages/Invoice";
import Toastify from "./components/Toastify";
import ProtectedRoutes from "./components/ProtectedRoutes";
import "./App.css";
import AddModal from "./pages/AddModal";
import UpdateModal from "./pages/UpdateModal";
import InvoiceUpload from "./pages/InvoiceUpload";
import FileUpload from "./pages/FileUpload";
import axios from "axios";
import FilesFolder from "./pages/FilesFolders";
import Loader from "./components/Loader";
import Profile from "./pages/Profile";
import User from "./pages/User";
import jwtDecode from "jwt-decode";

const App = () => {
  var localUser = JSON.parse(sessionStorage.getItem("user"));
  let token;
  let user;
  if (localUser) {
    token = localUser.access_token ? localUser.access_token : null;
    const token_id = token;

    user = jwtDecode(token_id);
  }

  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  const [drafts, setDrafts] = useState([]);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const getDrafts = async () => {
      try {
        const res = await axios.get(
          "https://japaconsults.sammykingx.tech/notes",
          {
            headers,
          }
        );

        if (res.status === 200) {
          setDrafts(res.data);
        } else {
          console.error("Failed to fetch drafts:", res.status, res.statusText);
        }
      } catch (error) {
        console.error("Error fetching drafts:", error);
      }
    };

    getDrafts();
  }, [token]);

  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("https://japaconsults.sammykingx.tech/documents/myfiles", {
        headers,
      })
      .then((response) => {
        setImages(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setIsLoading(false);
      });
  }, [token]);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("https://japaconsults.sammykingx.tech/user", {
        headers,
      })
      .then((response) => {
        setUsers(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setIsLoading(false);
      });
  }, [token]);

  const [showNav, setShowNav] = useState(false);

  console.log(users, drafts, images);

  const handleShowNav = () => {
    setShowNav(!showNav);
  };

  // console.log(user);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Toastify />
          {showNav && (
            <SideNav
              showNav={showNav}
              handleShowNav={handleShowNav}
              user={user}
            />
          )}
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
                  element={
                    <Message token={token} handleShowNav={handleShowNav} />
                  }
                />
              </Route>
              <Route element={<ProtectedRoutes />}>
                <Route
                  path="/drafts"
                  element={
                    <Drafts
                      token={token}
                      handleShowNav={handleShowNav}
                      drafts={drafts}
                    />
                  }
                />
              </Route>
              <Route element={<ProtectedRoutes />}>
                <Route
                  path="/draft/:id"
                  element={
                    <Draft
                      token={token}
                      handleShowNav={handleShowNav}
                      drafts={drafts}
                    />
                  }
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
                  path="/files/:folder"
                  element={
                    <FilesFolder
                      handleShowNav={handleShowNav}
                      token={token}
                      images={images}
                    />
                  }
                />
              </Route>
              <Route element={<ProtectedRoutes />}>
                <Route
                  path="/users"
                  element={
                    <Users handleShowNav={handleShowNav} users={users} />
                  }
                />
              </Route>
              <Route element={<ProtectedRoutes />}>
                <Route
                  path="/user/:id"
                  element={<User handleShowNav={handleShowNav} />}
                />
              </Route>
              <Route element={<ProtectedRoutes />}>
                <Route
                  path="/profile"
                  element={
                    <Profile user={user} handleShowNav={handleShowNav} />
                  }
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
                  path="/create_invoice"
                  element={<InvoiceUpload handleShowNav={handleShowNav} />}
                />
              </Route>
              <Route element={<ProtectedRoutes />}>
                <Route
                  path="/add_draft"
                  element={
                    <AddModal
                      handleShowNav={handleShowNav}
                      token={token}
                      drafts={drafts}
                    />
                  }
                />
              </Route>
              <Route element={<ProtectedRoutes />}>
                <Route
                  path="/edit_draft/:id"
                  element={
                    <UpdateModal
                      handleShowNav={handleShowNav}
                      token={token}
                      drafts={drafts}
                    />
                  }
                />
              </Route>
              <Route element={<ProtectedRoutes />}>
                <Route
                  path="/file_upload"
                  element={
                    <FileUpload handleShowNav={handleShowNav} token={token} />
                  }
                />
              </Route>
              <Route path="/register" element={<SignUp />} />
              <Route path="/login" element={<SignIn />} />
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
