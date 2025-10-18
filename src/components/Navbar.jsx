import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <Link className="navbar-brand" to="/">
        {import.meta.env.VITE_APP_NAME}
      </Link>
    </div>
  </nav>
);

export default Navbar;
