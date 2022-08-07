import React from "react"
import { Link } from "react-router-dom"

function NavBar({ subLink, subLinkName, currentPage }) {
  const link = subLinkName ? (
    <>
      <Link to={subLink}>{subLinkName}</Link> {"/"}
    </>
  ) : (
    ""
  );
  return (
    <div>
      <Link to="/">Home</Link>
      {" "}
      / {link}
      {currentPage}
    </div>
  );
}

export default NavBar