import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getArticle, getComments, updateVotes } from "../api";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import CommentForm from "./CommentForm";
import Error from "./Error";

const Article = ({ error, setError }) => {
  const navigate = useNavigate();
  const [fullArticle, setFullArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [vote, setVote] = useState(0);
  const [voteError, setVoteError] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  const { article_id } = useParams();

  useEffect(() => {
    getArticle(article_id)
      .then((result) => {
        setFullArticle(result.data.article);
        setVote(result.data.article.votes);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  }, [article_id]);

  useEffect(() => {
    getComments(article_id)
      .then((result) => setComments(result.data.comments))
      .catch((error) => setError(error.message));
  }, [commentCount]);

  const handleVote = (e) => {
    const { value } = e.target;
    if (value === "down") {
      setVote(vote - 1);
      updateVotes(article_id, -1).catch((error) => {
        setError(error.message);
        setVoteError(`Vote Error: ${error}`);
      });
    } else {
      setVote(vote + 1);
      updateVotes(article_id, 1).catch((error) => {
        setError(error.message);
        setVoteError(`Vote Error: ${error}`);
      });
    }
  };
  if (error) {
    return (
      <>
        {" "}
        <Error error={error} />
      </>
    );
  }
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
            <button onClick={handleVote} value={"up"}>
              <ThumbUpOutlinedIcon />
              {voteError}
            </button>

            <p>Votes: {vote}</p>
            <button onClick={handleVote} value={"down"}>
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
