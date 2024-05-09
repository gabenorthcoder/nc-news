import { useEffect, useState } from "react";
import Card from "./Card";
import { getAllArticles, getTopics } from "../api";
import TopicButton from "./TopicButton";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    getTopics().then((result) => setTopics(result.topics));
  }, []);
  useEffect(() => {
    getAllArticles().then((result) => setArticles(result.articles));
  }, []);
  return (
    <div>
      <h1>News</h1>
      <div>
        {topics.map((topic) => {
          return <TopicButton key={topic.slug} slug={topic.slug} />;
        })}
      </div>
      {articles.map((article) => {
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
    </div>
  );
};
export default News;
