import { useState, useEffect } from "react";
import { getArticle, getComments } from "../api";
import { useLocation } from "react-router-dom";
import CommentCard from "./CommentCard";

const Article = (props) => {
  const [fullArticle, setFullArticle] = useState({});
  const [comments, setComments] = useState([]);
  const location = useLocation();
  const { article_id } = location.state;

  useEffect(() => {
    getArticle(article_id).then((result) => setFullArticle(result.article));
  }, []);
  useEffect(() => {
    getComments(article_id).then((result) => setComments(result.comments));
  }, []);

  return (
    <section>
      <div>
        <h1>Article</h1>
        <h3>{fullArticle.title}</h3>
        <img src={fullArticle.article_img_url} />
        <p>{fullArticle.body}</p>
        <p>Written By: {fullArticle.author}</p>
        {/* <p>{fullArticle.comment_count}</p>
      <p>Votes: {fullArticle.votes}</p> */}
        <p>On: {new Date(fullArticle.created_at).toDateString()}</p>
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
            />
          );
        })}
      </div>
    </section>
  );
};

export default Article;
