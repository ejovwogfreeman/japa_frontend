import React, { useState } from "react";
import "../css/AddModal.css";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

const DraftsModal = ({
  handleShowDrafts,
  handleDraftSelection,
  token,
  drafts,
  selectedDraft,
}) => {
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
        "https://japaconsults.sammykingx.tech/drafts/save",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("DRAFT CREATED");
      handleShowDrafts();
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
        <h3>ALL DRAFTS</h3>
        <AiOutlineClose onClick={() => handleShowDrafts()} />
        {drafts.map((x) => (
          <div
            className={`draft-item ${x === selectedDraft ? "selected" : ""}`}
            key={x.draft_id}
            onClick={() => handleDraftSelection(x)}
          >
            <span className="top">
              <strong> {x.title}</strong>
            </span>{" "}
            <br />
            <span className="msg">{x.date_created}</span>
          </div>
        ))}
      </form>
    </div>
  );
};

export default DraftsModal;
