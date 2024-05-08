const CommentCard = (props) => {
  const { id, body, author, created_at, votes } = props;
  return (
    <section className="card" key={id}>
      <p>{body}</p>
      <p>{author}</p>
      <p>On: {new Date(created_at).toDateString()}</p>
      <p>{votes}</p>
    </section>
  );
};

export default CommentCard;
