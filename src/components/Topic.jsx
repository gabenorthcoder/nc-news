import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticlesByQuery } from "../api";
import Card from "./Card";
import Error from "./Error";
import Loader from "./Loader";
const Topic = ({ error, setError }) => {
  const [articlesByTopic, setArticlesByTopic] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getArticlesByQuery(topic)
      .then((result) => {
        setArticlesByTopic(result.data.articles);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [searchParams]);
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <Error error={error} />;
  }
  return (
    <>
      <h1 className="title">{`Topic: ${topic}`}</h1>
      <section className="news-grid">
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
      </section>
    </>
  );
};
export default Topic;
