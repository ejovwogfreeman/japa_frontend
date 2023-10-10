import React, { useState, useEffect } from "react";
import "../css/FilesFolder.css";
import { FaSearch } from "react-icons/fa";
import { files } from "../data";
import Search from "../components/Search";
import { AiOutlineCloudUpload, AiOutlineMenu } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import axios from "axios"; // Import Axios
import Loader from "../components/Loader";

const FilesFolder = ({ handleShowNav, images }) => {
  const { query, results, handleInputChange } = Search(files);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(files.length === 0);
  }, [files]);

  const params = useParams();

  const filteredImages = images.filter((x) => x.folder === params.folder);

  console.log(params.folder);

  console.log(filteredImages);

  console.log(images);

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
            {filteredImages.map((image) => (
              <Link to={image.file_url} id="grid-img" key={Math.random()}>
                <img
                  src={`https://drive.google.com/uc?id=${image.file_id}`}
                  alt={image.name}
                />
              </Link>
            ))}
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
