import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getArticle, getComments, updateVotes } from "../api";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CommentForm from "./CommentForm";
import Error from "./Error";
import Loader from "./Loader";

const Article = ({ error, setError }) => {
  const navigate = useNavigate();
  const [fullArticle, setFullArticle] = useState({});
  const [vote, setVote] = useState(0);
  const [voteError, setVoteError] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { article_id } = useParams();

  useEffect(() => {
    getArticle(article_id)
      .then((result) => {
        setFullArticle(result.data.article);
        setVote(result.data.article.votes);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [article_id]);

  const handleVote = (e) => {
    const { value } = e.target;
    if (value === "down") {
      setVote(vote - 1);
      updateVotes(article_id, -1).catch((error) => {
        setVote(vote + 1);
        setError(error.message);
        setVoteError(`Vote Error: ${error}`);
      });
    } else {
      setVote(vote + 1);
      updateVotes(article_id, 1).catch((error) => {
        setVote(vote - 1);
        setError(error.message);
        setVoteError(`Vote Error: ${error}`);
      });
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <Error error={error} />;
  }
  return (
    <section className="">
      {isCommenting ? (
        <CommentForm
          commentCount={commentCount}
          setCommentCount={setCommentCount}
          setIsCommenting={setIsCommenting}
          // userList={comments}
          article_id={article_id}
          onCancel={() => setIsCommenting(false)}
        />
      ) : (
        <>
          <section className="page-container">
            <div>
              <h2 className="title">{fullArticle.title}</h2>
            </div>

            <div className="single-image">
              <img src={fullArticle.article_img_url} />
            </div>

            {/* <div className="article-image">
          <img src={article_img_url} alt="" />
        </div> */}
            <article className="article-content ">
              <div>
                <p className="article-description">{fullArticle.body}</p>
              </div>

              <div>
                <div className="article-details">
                  <EditOutlinedIcon />
                  <span> Written By: {fullArticle.author}</span>
                </div>
              </div>

              <small>
                <b>
                  Published on:{" "}
                  {new Date(fullArticle.created_at).toDateString()}
                </b>
              </small>

              <button onClick={handleVote} value={"up"}>
                <ThumbUpOutlinedIcon />
                {voteError}
              </button>

              <p className="article-description">Votes: {vote}</p>
              <button onClick={handleVote} value={"down"}>
                <ThumbDownOutlinedIcon />
                {voteError}
              </button>
            </article>
          </section>
          <section>
            <Comments
              setCommentCount={setCommentCount}
              commentCount={commentCount}
              article_id={article_id}
            />
            <div className="comment-button">
              <button onClick={() => setIsCommenting(true)}>Add Comment</button>
            </div>
          </section>
        </>
      )}
    </section>
  );
};

export default Article;
