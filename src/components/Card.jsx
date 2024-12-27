import { Link } from "react-router-dom";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

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
      <section className="article">
        <div className="article-image">
          <img src={article_img_url} alt="" />
        </div>
        <div className="article-content">
          <div className="article-title">
            <h4>{title}</h4>
          </div>

          <div className="article-details">
            <EditOutlinedIcon />
            <span> Written By: {author}</span>
          </div>

          <div className="article-details">
            <CommentOutlinedIcon />
            <span> Comments: {comment_count}</span>
          </div>

          <div className="article-details">
            <StarBorderIcon />
            <span> Votes: {votes}</span>
          </div>

          <div className="article-details"></div>
          <small>
            <b>Published On: {new Date(created_at).toDateString()}</b>
          </small>
        </div>
      </section>
    </Link>
  );
};
export default Card;
