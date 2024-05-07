const Card = (props) => {
  return (
    <div className="card">
      <h4>{props.topic}</h4>
      <h3>{props.title}</h3>
      <img src={props.article_img_url} />
      <p>Written Bye: {props.author}</p>
      <p>{props.comment_count}</p>
      <p>Votes: {props.votes}</p>
      <p>On: {new Date(props.created_at).toDateString()}</p>
    </div>
  );
};
export default Card;
