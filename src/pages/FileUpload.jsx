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
  const [folderName, setFolderName] = useState("academics");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Define the maximum file size in bytes (3MB)
    const maxFileSize = 3 * 1024 * 1024; // 3MB in bytes

    if (selectedFile && selectedFile.size <= maxFileSize) {
      // File size is within the allowed limit, set the file
      console.log(selectedFile.size);
      setFile(selectedFile);
    } else {
      // File size exceeds the limit, handle the error
      toast.error("File size exceeds the allowed limit (3MB).");
      // You can also reset the file input to clear the selected file
      e.target.value = null;
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast.error("PLEASE FILL ALL FIELDS");
      return;
    }

    console.log({ file, folderName });

    setIsLoading(true);

    const formData = new FormData();
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
        toast.error("Error uploading file");
        console.error("Error uploading file:", error);
      });
  };

  return (
    <div className="modal-form">
      <form>
        <h3>UPLOAD FILE</h3>
        <div>
          <label htmlFor="file">Folder Name</label>
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
          <label htmlFor="file">Upload File</label>
          <input type="file" id="file" onChange={handleFileChange} />
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
