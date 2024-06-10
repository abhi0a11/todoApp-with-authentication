import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const logoutHandler = async e => {
    setLoading(true);
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });

      toast.success("Logged out successfully");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };
  return (
    <nav className="header">
      <div>
        <h2>TODO APP.</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {isAuthenticated ? (
          <button className="btn" onClick={logoutHandler}>
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </article>
    </nav>
  );
};

export default Header;
