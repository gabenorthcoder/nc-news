import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Card from "./Card";
import { getAllArticles, getTopics } from "../api";
import TopicButton from "./TopicButton";
import Error from "./Error";
import Loader from "./Loader";

const News = ({ error, setError }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);

  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");

  useEffect(() => {
    getAllArticles()
      .then((result) => {
        setArticles(result.data.articles);
        setIsLoading(false);
      })
      .catch((error) => setError(error.message));
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

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <Error error={error} />;
  }
  return (
    <div>
      <h1 className="title">Latest NC News</h1>
      <TopicButton />
      <div className="select-style">
        <select onChange={handleSelect}>
          <option value="created_at">Sort By Date</option>
          <option value="comment_count"> Sort By Comment Count</option>
          <option value="votes">Sort By Votes</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <section className="news-grid">
        {articles.map((article) => {
          return (
            <div key={article.article_id}>
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
            </div>
          );
        })}
      </section>
    </div>
  );
};
export default News;
