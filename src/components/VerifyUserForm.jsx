import { useState, useEffect } from "react";
import { deleteComment } from "../api";
const VerifyUserForm = ({
  setIsDeleting,
  user,
  userId,
  commentCount,
  setCommentCount,
}) => {
  const [isExpanded, setExpanded] = useState(false);
  const [isDeletingComment, setIsDeletingComment] = useState(false);
  const [deleteUsername, setDeleteUsername] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [loadingDone, setLoadingDone] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsDeletingComment(true);
    setLoadingDone(false);
    deleteComment(userId).then((result) => {
      if (result.status === 204) {
        setDeleteUsername("");
        setLoadingDone(true);
        setIsDeletingComment(false);
        setCommentCount(commentCount + 1);
        setIsDeletingComment(false);
      }
    });
  };
  const handleExpand = () => {
    if (user === deleteUsername) {
      setExpanded(true);
      setIsValid(true);
    } else {
      setExpanded(false);
    }
  };
  const handleValidation = () => {
    !isExpanded ? setIsValid(false) : setIsValid(true);
  };
  return (
    <div className="overlay">
      <form onSubmit={handleSubmit} className="edit-card" id="overlay-content">
        <label htmlFor="username">
          {isValid ? "Username" : "Invalid Username!"}
          <input
            type="text"
            onChange={(event) => setDeleteUsername(event.target.value)}
            value={deleteUsername}
            placeholder="Verify Username"
            onKeyUp={handleExpand}
            onBlur={handleValidation}
          />
        </label>
        {isExpanded && (
          <>
            <label htmlFor="loader">
              {loadingDone ? "Comment Deleted" : ""}
            </label>
            <button type="submit" disabled={isDeletingComment ? true : false}>
              {isDeletingComment ? "Deleteting Comment...." : " Delete Comment"}
            </button>
          </>
        )}

        <button className="button-edit" onClick={() => setIsDeleting(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default VerifyUserForm;
