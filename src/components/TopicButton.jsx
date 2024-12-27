import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SmallLoader from "./SmallLoader";
import Error from "./Error";
import { getTopics } from "../api";

const TopicButton = ({ error, setError }) => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTopics()
      .then((result) => {
        setTopics(result.data.topics);
        setIsLoading(false);
      })
      .catch((error) => setError(error.message));
  }, []);

  if (isLoading) {
    return <SmallLoader />;
  }
  if (error) {
    return <Error error={error} />;
  }
  return (
    <div className="button-grid">
      {topics.map((topic) => {
        return (
          <Link to={`/articles?topic=${topic.slug}`}>
            <button key={topic.slug} type="submit">
              {topic.slug}
            </button>
          </Link>
        );
      })}
    </div>
  );
};

export default TopicButton;
