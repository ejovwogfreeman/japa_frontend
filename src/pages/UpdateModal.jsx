// import React, { useState } from "react";
// import "../css/AddModal.css";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { AiOutlineClose } from "react-icons/ai";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import {
//   EditorState,
//   convertToRaw,
//   ContentState,
//   convertFromHTML,
// } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import draftToHtml from "draftjs-to-html";
// import jwt_decode from "jwt-decode";
// import { useParams } from "react-router-dom";

// const UpdateModal = ({ handleShowUpdateModal, token, drafts }) => {
//   const [title, setTitle] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   // const [title, setTitle] = useState(draft.title);
//   // const [isLoading, setIsLoading] = useState(false);

//   const params = useParams();
//   const draftIdToFind = Number(params.id);

//   // Use find to locate the specific draft
//   let draft = drafts.find((x) => Number(x.draft_id) === draftIdToFind);

//   // Check if the draft was found
//   if (draft) {
//     setTitle(draft.title);
//     console.log("Found draft:", draft);
//   } else {
//     console.log("Draft not found or invalid ID:", draftIdToFind);
//   }

//   // Initialize editorState with previous data
//   const [editorState, setEditorState] = useState(() => {
//     if (!draft || !draft.content || draft.content.trim() === "") {
//       return EditorState.createEmpty(); // Handle missing or empty content
//     }

//     const contentBlocks = convertFromHTML(draft.content);
//     const contentState = ContentState.createFromBlockArray(contentBlocks);
//     return EditorState.createWithContent(contentState);
//   });

//   const onEditorStateChange = (newEditorState) => {
//     setEditorState(newEditorState);
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     if (!title || !editorState) {
//       setIsLoading(false);
//       return toast.error("PLEASE FILL ALL FIELDS");
//     }
//     const user_id = jwt_decode(token).sub;
//     try {
//       const contentState = editorState.getCurrentContent();
//       const contentHTML = draftToHtml(convertToRaw(contentState));

//       let form = {
//         draft_id: draft.draft_id,
//         user_id: user_id,
//         content: contentHTML,
//         title: title,
//         doc_url: [null],
//         date_created: draft.date_created,
//         last_updated: new Date(),
//       };

//       console.log(form);
//       // Send the form data to your server
//       const response = await axios.put(
//         "https://japaconsults.sammykingx.tech/drafts/update",
//         form,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       toast.success("DRAFT UPDATED");
//       handleShowUpdateModal();
//       window.location.reload();
//       console.log("Draft updated successfully:", response.data);
//     } catch (error) {
//       toast.error("DRAFT UPDATE FAILED");
//       console.error("Error updating draft:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="modal-form">
//       <form onSubmit={handleFormSubmit}>
//         <h3>UPDATE DRAFT</h3>
//         <AiOutlineClose onClick={handleShowUpdateModal} />
//         <div>
//           <label htmlFor="title">Draft title</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="content">Draft Content</label>
//           <div className="editor">
//             <Editor
//               editorState={editorState}
//               wrapperClassName="demo-wrapper"
//               editorClassName="demo-editor"
//               onEditorStateChange={onEditorStateChange}
//             />
//           </div>
//           <div>
//             <button type="submit" disabled={isLoading}>
//               {isLoading ? "UPDATING DRAFT..." : "UPDATE DRAFT"}
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateModal;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const UpdateModal = ({ handleShowUpdateModal, token, drafts }) => {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const params = useParams();
  const draftIdToFind = Number(params.id);

  useEffect(() => {
    // Find the specific draft based on draftIdToFind
    const draft = drafts.find((x) => Number(x.draft_id) === draftIdToFind);

    if (draft) {
      setTitle(draft.title);

      // Initialize the editorState with draft content if available
      if (draft.content && draft.content.trim() !== "") {
        const contentBlocks = convertFromHTML(draft.content);
        const contentState = ContentState.createFromBlockArray(contentBlocks);
        setEditorState(EditorState.createWithContent(contentState));
      }

      console.log("Found draft:", draft);
    } else {
      console.log("Draft not found or invalid ID:", draftIdToFind);
    }
  }, [drafts, draftIdToFind]);

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

    const user_id = jwt_decode(token).sub;
    try {
      const contentState = editorState.getCurrentContent();
      const contentHTML = draftToHtml(convertToRaw(contentState));

      const form = {
        draft_id: draftIdToFind,
        user_id: user_id,
        content: contentHTML,
        title: title,
        doc_url: [null],
        date_created: new Date(), // Update as needed
        last_updated: new Date(),
      };

      // Send the form data to your server
      const response = await axios.put(
        "https://japaconsults.sammykingx.tech/notes/update",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("DRAFT UPDATED");
      window.location.replace(`/draft/${params.id}`);
      console.log("Draft updated successfully:", response.data);
    } catch (error) {
      toast.error("DRAFT UPDATE FAILED");
      console.error("Error updating draft:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-form">
      <form onSubmit={handleFormSubmit}>
        <h3>UPDATE DRAFT</h3>
        <Link to={`/draft/${params.id}`}>
          <AiOutlineClose />
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
              {isLoading ? "UPDATING DRAFT..." : "UPDATE DRAFT"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateModal;
