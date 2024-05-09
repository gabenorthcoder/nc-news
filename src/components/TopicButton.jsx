import { Link } from "react-router-dom";
const TopicButton = ({ slug }) => {
  return (
    <Link to={`/articles?topic=${slug}`}>
      <button type="submit">{slug}</button>
    </Link>
  );
};

export default TopicButton;
