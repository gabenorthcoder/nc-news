import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "./Card";
import { getAllArticles, getTopics } from "../api";
import TopicButton from "./TopicButton";

const News = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");
  useEffect(() => {
    getTopics().then((result) => setTopics(result.topics));
  }, []);
  useEffect(() => {
    getAllArticles().then((result) => setArticles(result.articles));
  }, []);

  const setSortOrder = (direction) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set("order", direction);
    setSearchParams(newParams);
  };
  const setSortBy = (param) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set("sort_by", param);
    setSearchParams(newParams);
  };

  useEffect(() => {
    /* fetch new data based on the queries.
    This was in advanced BE task, didn't do those yet
    But will revisit after completing FE project
    */
  }, [sortByQuery, orderQuery]);

  const handleSelect = (e) => {
    e.preventDefault();
    const { value } = e.target;
    if (value === "asc" || value === "desc") {
      setSortOrder(value);
    } else {
      setSortBy(value);
    }
  };

  return (
    <div>
      <h1>News</h1>
      <div>
        {topics.map((topic) => {
          return <TopicButton key={topic.slug} slug={topic.slug} />;
        })}
      </div>
      <div>
        <select onChange={handleSelect}>
          <option value="created_at">Sort By Date</option>
          <option value="comment_count"> Sort By Comment Count</option>
          <option value="votes">Sort By Votes</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
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
