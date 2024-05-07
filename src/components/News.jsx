import { useEffect, useState } from "react";
import Card from "./Card";
import { getAllArticles } from "../api";

const News = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    getAllArticles().then((result) => setArticles(result.articles));
  }, []);
  console.log(articles);
  return (
    <div>
      <h1>News</h1>
      {articles.map((article) => {
        return (
          <Card
            key={article.article_id}
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
      <Card />
    </div>
  );
};
export default News;
