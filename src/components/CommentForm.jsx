import { useState } from "react";
import { postComment } from "../api";
import { ConstructionOutlined, ContactPageSharp } from "@mui/icons-material";

const CommentForm = ({
  article_id,
  onCancel,
  userList,
  commentCount,
  setCommentCount,
  setIsCommenting,
}) => {
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [isExpanded, setExpanded] = useState(false);
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [loadingDone, setLoadingDone] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsPostingComment(true);
    setLoadingDone(false);

    postComment(article_id, username, comment).then((result) => {
      if (result.status === 201) {
        setUsername("");
        setComment("");
        setLoadingDone(true);
        setIsPostingComment(false);
        setCommentCount(commentCount + 1);
        setIsCommenting(false);
      }
    });
  };
  const handleValidation = () => {
    !isExpanded ? setIsValid(false) : setIsValid(true);
  };
  const handleExpand = () => {
    const userListArr = userList.map((user) => {
      return user.author;
    });
    const isAValidUserName = userListArr.includes(username);
    isAValidUserName
      ? setIsValid(true) & setExpanded(true)
      : setExpanded(false);
  };
  return (
    <div className="overlay">
      <form onSubmit={handleSubmit} className="edit-card" id="overlay-content">
        <label htmlFor="username">
          {isValid ? "Username" : "Invalid Username!"}
          <input
            onChange={(event) => setUsername(event.target.value)}
            type="text"
            placeholder="Enter Username"
            value={username}
            onKeyUp={handleExpand}
            onBlur={handleValidation}
          />
        </label>
        {isExpanded && (
          <>
            <label htmlFor="comments">
              Comment
              <textarea
                name="comments"
                id="comments"
                cols="30"
                rows="10"
                placeholder="Enter your comment here"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
              ></textarea>
            </label>
            <label htmlFor="loader">
              {loadingDone ? "Posting Successful...." : ""}
            </label>
            <button type="submit" disabled={isPostingComment ? true : false}>
              {isPostingComment ? "Posting Comment...." : " Add Comment"}
            </button>
          </>
        )}
        <button className="button-edit" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};
export default CommentForm;
