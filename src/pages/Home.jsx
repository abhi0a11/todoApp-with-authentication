import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context, server } from "../main";
import toast from "react-hot-toast";
import TodoItem from "../components/TodoItem";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { isAuthenticated } = useContext(Context);
  if (!isAuthenticated) return <Navigate to={"/login"} />;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setrefresh] = useState(true);
  const updateHandler = async id => {
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setrefresh(!refresh);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const deleteHandler = async id => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setrefresh(!refresh);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const submitHandler = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/task/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setrefresh(!refresh);
    } catch (error) {
      toast.error(err.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/task/my`, {
        withCredentials: true,
      })
      .then(res => {
        setTasks(res.data.tasks);
      })
      .catch(err => {
        toast.error(err.response.data.message);
      });
  }, [refresh]);
  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <button disabled={loading} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>
      <section className="todosContainer">
        {tasks.map(i => {
          return (
            <TodoItem
              title={i.title}
              description={i.description}
              isCompleted={i.isCompleted}
              updateHandler={updateHandler}
              deleteHandler={deleteHandler}
              id={i._id}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Home;
