import { useState, useEffect } from "react";
import { getArticle } from "../api";
import { useLocation } from "react-router-dom";

const Article = (props) => {
  const [fullArticle, setFullArticle] = useState({});
  const location = useLocation();
  const { article_id } = location.state;

  useEffect(() => {
    getArticle(article_id).then((result) => setFullArticle(result.article));
  }, []);
  return (
    <section>
      <h1>Article</h1>
      <h3>{fullArticle.title}</h3>
      <img src={fullArticle.article_img_url} />
      <p>{fullArticle.body}</p>
      <p>Written By: {fullArticle.author}</p>
      {/* <p>{fullArticle.comment_count}</p>
      <p>Votes: {fullArticle.votes}</p> */}
      <p>On: {new Date(fullArticle.created_at).toDateString()}</p>
    </section>
  );
};

export default Article;
