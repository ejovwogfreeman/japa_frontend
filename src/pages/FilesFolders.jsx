import React, { useState, useEffect } from "react";
import "../css/Files.css";
import { FaSearch } from "react-icons/fa";
import { files } from "../data";
import Search from "../components/Search";
import { users } from "../data";
import { AiOutlineCloudUpload, AiOutlineMenu } from "react-icons/ai";
import FileUpload from "./FileUpload";
import { BsFolder2 } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import axios from "axios"; // Import Axios
import Loader from "../components/Loader";

const FilesFolder = ({ handleShowNav, token }) => {
  const { query, results, handleInputChange } = Search(files);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  const params = useParams();

  useEffect(() => {
    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint that provides the images
    axios
      .get("https://japaconsults.sammykingx.tech/documents/myfiles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Assuming the API response contains an array of image objects with 'url', 'alt', and 'id' properties
        setImages(response.data);
        setIsLoading(false); // Set isLoading to false when data is loaded
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setIsLoading(false); // Set isLoading to false even if there's an error
      });
  }, []);

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
          <div className="images" style={{ paddingRight: "10px" }}>
            {filteredImages.map((image) => (
              <iframe
                src={image.file_url}
                width="100%"
                height="300"
                style={{ marginBottom: "20px" }}
              ></iframe>
            ))}
          </div>
          {results.length === 0 && query !== "" && (
            <div>No result for your search</div>
          )}
        </div>
      )}
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

export default FilesFolder;
