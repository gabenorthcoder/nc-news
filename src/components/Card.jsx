import { Link } from "react-router-dom";
const Card = ({
  article_id,
  topic,
  title,
  article_img_url,
  author,
  comment_count,
  votes,
  created_at,
}) => {
  return (
    <Link to={`/article/${article_id}`}>
      <section className="card">
        <h4>{topic}</h4>
        <h3>{title}</h3>
        <img src={article_img_url} />
        <p>Written By: {author}</p>
        <p>{comment_count}</p>
        <p>Votes: {votes}</p>
        <p>On: {new Date(created_at).toDateString()}</p>
      </section>
    </Link>
  );
};
export default Card;
