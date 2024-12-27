import { useState, useEffect } from "react";
import { getComments } from "../api";
import CommentCard from "./CommentCard";
import SmallLoader from "./SmallLoader";
import Error from "./Error";
const Comments = ({
  setCommentCount,
  commentCount,
  article_id,
  error,
  setError,
}) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getComments(article_id)
      .then((result) => {
        setComments(result.data.comments);
        setIsLoading(false);
      })
      .catch((error) => setError(error.message));
  }, [commentCount]);

  if (error) {
    return <Error error={error} />;
  }
  if (isLoading) {
    return <SmallLoader />;
  }
  return (
    <div className="comments-grid">
      <h1>Comments</h1>
      {comments.map((comment) => {
        return (
          <CommentCard
            key={comment.comment_id}
            id={comment.comment_id}
            body={comment.body}
            author={comment.author}
            created_at={comment.created_at}
            votes={comment.votes}
            commentCount={commentCount}
            setCommentCount={setCommentCount}
          />
        );
      })}
    </div>
  );
};
export default Comments;
