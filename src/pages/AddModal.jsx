import React, { useState } from "react";
import "../css/AddModal.css";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { Link } from "react-router-dom";

const AddModal = ({ handleShowAddModal, token }) => {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!title || !editorState) {
      setIsLoading(false);
      return toast.error("PLEASE FILL ALL FIELDS");
    }

    if (title.length > 245) {
      return toast.error("TITLE FIELD HAS A MAXIMUM LIMIT OF 245 CHARACTERS");
    }

    try {
      const contentState = editorState.getCurrentContent();
      const contentHTML = draftToHtml(convertToRaw(contentState));

      const form = {
        title: title,
        content: contentHTML, // Pass the HTML content to the server
        date_created: new Date(),
      };

      console.log(form);
      // Send the form data to your server
      const response = await axios.post(
        "https://japaconsults.sammykingx.tech/notes/save",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("DRAFT CREATED");
      handleShowAddModal();
      window.location.reload();
      console.log("Draft created successfully:", response.data);
    } catch (error) {
      toast.error("DRAFT CREATION FAILED");
      console.error("Error creating draft:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-form">
      <form onSubmit={handleFormSubmit}>
        <h3>CREATE DRAFT</h3>
        <Link to="/drafts">
          <AiOutlineClose onClick={handleShowAddModal} />
        </Link>
        <div>
          <label htmlFor="title">Draft title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">Draft Content</label>
          <div className="editor">
            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={onEditorStateChange}
            />
          </div>
          <div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "CREATING DRAFT..." : "CREATE DRAFT"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddModal;
