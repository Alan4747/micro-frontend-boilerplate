import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
const Header = () => {
  return (
    <div className="header">
      <Link to={"/product"} style={{textDecoration:"none"}}>
        <span>Product</span>
      </Link>
      <Link to={"/user"} style={{textDecoration:"none"}}>
        <span>User</span>
      </Link>
    </div>
  );
};

export default Header;
