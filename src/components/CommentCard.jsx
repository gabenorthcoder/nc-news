import { useState, useEffect } from "react";
import VerifyUserForm from "./VerifyUserForm";

const CommentCard = ({
  id,
  body,
  author,
  created_at,
  votes,
  commentCount,
  setCommentCount,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <section>
      {isDeleting ? (
        <VerifyUserForm
          setIsDeleting={setIsDeleting}
          user={author}
          userId={id}
          commentCount={commentCount}
          setCommentCount={setCommentCount}
        />
      ) : (
        <div className="card" key={id}>
          <p>
            <b>Comment:</b> {body}
          </p>
          <p>
            <b>Author:</b> {author}
          </p>
          <p>
            <b>Votes:</b> {votes}
          </p>
          <small>
            <b>Published On: {new Date(created_at).toDateString()}</b>
          </small>
          <div>
            <button onClick={() => setIsDeleting(true)}>Delete</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CommentCard;
