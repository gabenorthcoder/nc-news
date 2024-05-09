import { useState, useEffect } from "react";
import { getArticle, getComments, updateVotes } from "../api";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import CommentForm from "./CommentForm";

const Article = () => {
  const [fullArticle, setFullArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [vote, setVote] = useState(0);
  const [voteError, setVoteError] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  const { article_id } = useParams();

  useEffect(() => {
    getArticle(article_id).then((result) => {
      setFullArticle(result.article);
      setVote(result.article.votes);
    });
  }, [article_id]);

  useEffect(() => {
    getComments(article_id).then((result) => setComments(result.comments));
  }, [commentCount]);

  const handleUpVote = () => {
    setVote(vote + 1);
    updateVotes(article_id, 1).catch((error) => {
      setVoteError(`Vote Error: ${error}`);
    });
  };
  const handleDownVote = () => {
    setVote(vote - 1);
    updateVotes(article_id, -1).catch((error) => {
      setVoteError(`Vote Error: ${error}`);
    });
  };

  return (
    <section className="">
      {isCommenting ? (
        <CommentForm
          commentCount={commentCount}
          setCommentCount={setCommentCount}
          setIsCommenting={setIsCommenting}
          userList={comments}
          article_id={article_id}
          onCancel={() => setIsCommenting(false)}
        />
      ) : (
        <>
          <div>
            <h1>Article</h1>
            <h3>{fullArticle.title}</h3>
            <img src={fullArticle.article_img_url} />
            <p>{fullArticle.body}</p>
            <p>Written By: {fullArticle.author}</p>
            {/* <p>{fullArticle.comment_count}</p> */}
            <p>On: {new Date(fullArticle.created_at).toDateString()}</p>
            <button onClick={handleUpVote}>
              <ThumbUpOutlinedIcon />
              {voteError}
            </button>

            <p>Votes: {vote}</p>
            <button onClick={handleDownVote}>
              <ThumbDownOutlinedIcon />
              {voteError}
            </button>
          </div>
          <div>
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
          <div>
            <button onClick={() => setIsCommenting(true)}>Add Comment</button>
          </div>
        </>
      )}
    </section>
  );
};

export default Article;
