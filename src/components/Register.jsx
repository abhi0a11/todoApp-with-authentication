import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../main";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);
  const submitHandler = async e => {
    setLoading(true);
    try {
      e.preventDefault();
      const { data } = await axios.post(
        `${server}/users/new`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <div className="login">
      <section>
        <form action="" onSubmit={submitHandler}>
          <input
            value={name}
            onChange={e => setname(e.target.value)}
            type="text"
            placeholder="name"
            required
          />
          <input
            value={email}
            onChange={e => setemail(e.target.value)}
            type="email"
            placeholder="email"
            required
          />
          <input
            value={password}
            onChange={e => setpassword(e.target.value)}
            type="password"
            placeholder="password"
            required
          />
          <button disabled={loading} type="submit">
            Sign Up
          </button>
          <h4>Or</h4>
          <Link to={"/register"}> Login</Link>
        </form>
      </section>
    </div>
  );
};

export default Register;
