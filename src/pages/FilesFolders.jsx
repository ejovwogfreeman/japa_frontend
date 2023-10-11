import React, { useState, useEffect } from "react";
import "../css/FilesFolder.css";
import { FaSearch } from "react-icons/fa";
import { files } from "../data";
import Search from "../components/Search";
import { AiOutlineCloudUpload, AiOutlineMenu } from "react-icons/ai";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import Loader from "../components/Loader";
import axios from "axios";
import { toast } from "react-toastify";

const FilesFolder = ({ handleShowNav, images, token }) => {
  const { query, results, handleInputChange } = Search(files);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(files.length === 0);
  }, [files]);

  const params = useParams();
  const navigate = useNavigate();

  const filteredImages = images.filter((x) => x.folder === params.folder);
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);

      const response = await axios.delete(
        `https://japaconsults.sammykingx.tech/documents/removeMyFile/${id}`,
        { headers }
      );

      setIsLoading(false);
      toast.success("File deleted successfully");
      navigate("/drafts");
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to delete file");
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div className="files-container">
      {isLoading ? (
        <Loader />
      ) : (
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
          <div
            className="images"
            id="grid-img-cont"
            style={{ paddingRight: "10px" }}
          >
            {filteredImages.length <= 0 ? (
              <h2>No files here yet</h2>
            ) : (
              <>
                {" "}
                {filteredImages.map((image) => (
                  <div>
                    <Link to={image.file_url} id="grid-img" key={Math.random()}>
                      <img
                        src={`https://drive.google.com/uc?id=${image.file_id}`}
                        alt={image.name}
                      />
                    </Link>
                    <div className="delete-cont">
                      <span
                        className="delete-btn"
                        onClick={() => handleDelete(image.file_id)}
                      >
                        <BsTrash />
                        <span>DELETE FILE</span>
                      </span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {results.length === 0 && query !== "" && (
            <div>No result for your search</div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilesFolder;
