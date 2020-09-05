import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <nav className="header mb-2">
            <Link to="/">
                <img src="../images/bigscreen_logo.png" />
            </Link>
        </nav>
    );
};

export default Header;
