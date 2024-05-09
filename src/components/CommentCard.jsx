import { useState, useEffect } from "react";
import VerifyUserForm from "./VerifyUserForm";

const CommentCard = (props) => {
  const { id, body, author, created_at, votes, commentCount, setCommentCount } =
    props;
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
          <p>{body}</p>
          <p>{author}</p>
          <p>On: {new Date(created_at).toDateString()}</p>
          <p>{votes}</p>
          <button onClick={() => setIsDeleting(true)}>Delete</button>
        </div>
      )}
    </section>
  );
};

export default CommentCard;
