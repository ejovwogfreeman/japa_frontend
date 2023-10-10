// import React, { useState } from "react";
// import "../css/Files.css";
// import { FaSearch } from "react-icons/fa";
// import { files } from "../data";
// import Search from "../components/Search";
// import { users } from "../data";
// import { AiOutlineCloudUpload, AiOutlineMenu } from "react-icons/ai";
// import FileUpload from "./FileUpload";
// import { BsFolder2 } from "react-icons/bs";
// import { Link } from "react-router-dom";

// const Files = ({ handleShowNav }) => {
//   const { query, results, handleInputChange } = Search(files);

//   // const [modal, setModal] = useState(false);
//   // const handleModal = () => {
//   //   setModal(!modal);
//   // };

//   // <option value="academics">ACADEMICS</option>
//   // <option value="billing">BILLING</option>
//   // <option value="general">GENERAL</option>
//   // <option value="messages">MESSAGES</option>
//   let folders = ["academics", "billing", "general", "messages"];

//   return (
//     <div className="files-container">
//       <div className="left">
//         <span className="menu-btn">
//           <AiOutlineMenu onClick={handleShowNav} />
//         </span>
//         <h3>All Files</h3>{" "}
//         <Link
//           to="/file_upload"
//           className="open-link"
//           style={{ border: "none" }}
//         >
//           <AiOutlineCloudUpload style={{ fontSize: "20px" }} />
//         </Link>
//         <section className="search">
//           <FaSearch />
//           <input
//             type="text"
//             placeholder="Search..."
//             value={query}
//             onChange={handleInputChange}
//           />
//         </section>
//         <div className="files">
//           {folders.map((x) => (
//             // <Link key={x}>
//             //   key={Math.random()}
//             <div className="file">
//               <span>
//                 <BsFolder2 />
//               </span>
//               <div>
//                 <span>{x}</span>
//                 <span>3 files</span>
//               </div>
//             </div>
//             // </Link>
//           ))}
//         </div>
//         {results.length === 0 && query !== "" && (
//           <div>No result for your search</div>
//         )}
//       </div>
//       <div className="right">
//         <div className="top">
//           <h3>File 1</h3>
//           <AiOutlineCloudUpload />
//         </div>
//         <div className="images">
//           {users.map((x) => (
//             <img src={x.img} alt="" key={Math.random()} />
//           ))}
//         </div>
//         {/* {modal && <FileUpload handleModal={handleModal} />} */}
//       </div>
//     </div>
//   );
// };

// export default Files;

import React, { useState, useEffect } from "react";
import "../css/Files.css";
import { FaSearch } from "react-icons/fa";
import { files } from "../data";
import Search from "../components/Search";
import { users } from "../data";
import { AiOutlineCloudUpload, AiOutlineMenu } from "react-icons/ai";
import FileUpload from "./FileUpload";
import { BsFolder2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios

const Files = ({ handleShowNav }) => {
  const { query, results, handleInputChange } = Search(files);
  // const [images, setImages] = useState([]);

  useEffect(() => {
    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint that provides the images
    axios
      .get("YOUR_API_ENDPOINT")
      .then((response) => {
        // Assuming the API response contains an array of image objects with 'url', 'alt', and 'id' properties
        setImages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

  let folders = ["academics", "billing", "general", "messages"];

  return (
    <div className="files-container">
      <div className="left">
        <span className="menu-btn">
          <AiOutlineMenu onClick={handleShowNav} />
        </span>
        <h3>All Files</h3>{" "}
        <Link
          to="/file_upload"
          className="open-link"
          style={{ border: "none" }}
        >
          <AiOutlineCloudUpload style={{ fontSize: "20px" }} />
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
        <div className="files">
          {folders.map((x) => (
            <Link to={`/files/${x}`} className="file" key={x}>
              <span>
                <BsFolder2 />
              </span>
              <div>
                <span>{x}</span>
                <span>3 files</span>
              </div>
            </Link>
          ))}
        </div>
        {results.length === 0 && query !== "" && (
          <div>No result for your search</div>
        )}
      </div>
      {/* <div className="right">
        <div className="top">
          <h3>File 1</h3>
          <AiOutlineCloudUpload />
        </div>
        <div className="images">
          {images.map((image) => (
            <img src={image.url} alt={image.alt} key={image.id} />
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Files;
