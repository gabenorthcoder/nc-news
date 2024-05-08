import { Link } from "react-router-dom";
const Card = (props) => {
  const { id } = props;
  return (
    <Link to="/article" state={{ article_id: id }}>
      <section className="card">
        <h4>{props.topic}</h4>
        <h3>{props.title}</h3>
        <img src={props.article_img_url} />
        <p>Written By: {props.author}</p>
        <p>{props.comment_count}</p>
        <p>Votes: {props.votes}</p>
        <p>On: {new Date(props.created_at).toDateString()}</p>
      </section>
    </Link>
  );
};
export default Card;
