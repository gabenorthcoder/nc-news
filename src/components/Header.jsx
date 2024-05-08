import React from "react";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Link className="link" to="/">
      <header>
        <h1>
          <FeedOutlinedIcon className="svg_icons" />
          <span> NC News</span>
        </h1>
      </header>
    </Link>
  );
};

export default Header;
