// import React from "react";
// import "../css/Modal.css";
// import { AiOutlineClose } from "react-icons/ai";
// import { Link } from "react-router-dom";

// const FileUpload = () => {
//   return (
//     <div className="modal-form">
//       <form>
//         <h3>UPLOAD FILE</h3>
//         <div>
//           <label htmlFor="">File Name</label>
//           <input type="text" />
//         </div>
//         <div>
//           <label htmlFor="">Upload File</label>
//           <input type="file" />
//         </div>
//         <div>
//           <select name="" id="">
//             <option value="academics">ACADEMICS</option>
//             <option value="billing">BILLING</option>
//             <option value="general">GENERAL</option>
//             <option value="messages">MESSAGES</option>
//           </select>
//         </div>
//         <div>
//           <button>UPLOAD</button>
//         </div>
//         <Link to="/files">
//           <AiOutlineClose />
//         </Link>
//       </form>
//     </div>
//   );
// };

// export default FileUpload;

// https://japaconsults.sammykingx.tech/documents/upload?folder_name=academics

import React, { useState } from "react";
import "../css/Modal.css";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"; // Import Axios

const FileUpload = ({ token }) => {
  console.log(token);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [folderName, setFolderName] = useState("academics");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (!file || !fileName) {
      toast.error("PLEASE FILL ALL FIELDS");
      return;
    }

    console.log({ file, fileName, folderName });

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file_name", fileName);
    formData.append("file", file);

    axios
      .post(
        `https://japaconsults.sammykingx.tech/documents/upload?folder_name=${folderName}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Set content type for form data
          },
        }
      )
      .then((response) => {
        setIsLoading(false);

        // Handle the response here (e.g., show success message)
        console.log("File uploaded successfully:", response.data);
        toast.success("FILE UPLOADED SUCCESSFULLY");
        window.location.replace("/files");
      })
      .catch((error) => {
        setIsLoading(false);

        // Handle any errors that occurred during the request
        console.error("Error uploading file:", error);
      });
  };

  return (
    <div className="modal-form">
      <form>
        <h3>UPLOAD FILE</h3>
        <div>
          <label htmlFor="fileName">File Name</label>
          <input
            type="text"
            id="fileName"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="file">Upload File</label>
          <input type="file" id="file" onChange={handleFileChange} />
        </div>
        <div>
          <select
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          >
            <option value="academics">ACADEMICS</option>
            <option value="billing">BILLING</option>
            <option value="general">GENERAL</option>
            <option value="messages">MESSAGES</option>
          </select>
        </div>
        <div>
          <button type="button" onClick={handleUpload} disabled={isLoading}>
            {isLoading ? "UPLOADING..." : "UPLOAD"}
          </button>
        </div>
        <Link to="/files">
          <AiOutlineClose />
        </Link>
      </form>
    </div>
  );
};

export default FileUpload;
