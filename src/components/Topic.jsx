import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticlesByQuery } from "../api";
import Card from "./Card";

const Topic = ({ error, setError }) => {
  const [articlesByTopic, setArticlesByTopic] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic");

  useEffect(() => {
    getArticlesByQuery(topic)
      .then((result) => {
        setArticlesByTopic(result.articles);
      })
      .catch((error) => {});
  }, [searchParams]);

  return (
    <>
      <h1>Topic</h1>
      {articlesByTopic.map((article) => {
        return (
          <Card
            key={article.article_id}
            article_id={article.article_id}
            topic={article.topic}
            title={article.title}
            article_img_url={article.article_img_url}
            author={article.author}
            comment_count={article.comment_count}
            votes={article.votes}
            created_at={article.created_at}
          />
        );
      })}
    </>
  );
};
export default Topic;
