import React from "react";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";

const Header = () => {
  return (
    <header>
      <h1>
        <FeedOutlinedIcon className="svg_icons" />
        <span> NC News</span>
      </h1>
    </header>
  );
};

export default Header;
