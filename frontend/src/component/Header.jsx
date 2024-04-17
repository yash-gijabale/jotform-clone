import React from "react";
import "./component.css";
import logo from "../asset/logo.svg";

const Header = ({ bg, title }) => {
  return (
    <div className="header_main" style={{ backgroundColor: bg }}>
      <div></div>
      <div className="title_main">
        <span>{title ? title : ""}</span>
      </div>
      <div></div>
    </div>
  );
};

export default Header;
