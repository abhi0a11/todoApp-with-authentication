import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const submitHandler = async e => {
    setLoading(true);
    try {
      e.preventDefault();
      const { data } = await axios.post(
        `${server}/users/login`,
        {
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
      // console.log(data);
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(fasle);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
      setIsAuthenticated(false);
      setLoading(fasle);
    }
  };
  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
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
            Login
          </button>
          <h4>Or</h4>
          <Link to={"/register"}> Sign Up</Link>
        </form>
      </section>
    </div>
  );
};
export default Login;
