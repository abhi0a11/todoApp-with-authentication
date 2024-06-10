import React, { useContext } from "react";
import { Context } from "../main";
import Loader from "./Loader";

const Profile = () => {
  const { isAuthenticated, loading, user } = useContext(Context);
  console.log(isAuthenticated, loading, user);
  return loading ? (
    <Loader />
  ) : (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
};

export default Profile;