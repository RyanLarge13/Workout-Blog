import { useState } from "react";
import { FaCog, FaNewspaper } from "react-icons/fa";
import { BsViewList } from "react-icons/bs";
import { AiFillRead, AiFillPlusCircle } from "react-icons/ai";
import { elements, variants } from "../../styles/elements.js";
import { containers } from "../../styles/containers.js";
import { NavLink } from "react-router-dom";
import MyPosts from "./components/MyPosts";
import NewPost from "./components/NewPost";
import Blog from "../Blog/Blog";

const Dashboard = () => {
  const [picker, setPicker] = useState(<MyPosts />);

  return (
    <section>
      <FaCog className="fixed bottom-3 right-3 text-2xl" />
      <header className="bg-gradient-to-tr from-violet-500 to-purple-500 py-10 rounded-b-2xl text-white shadow-md">
        <div className="mt-10 flex flex-col items-center justify-center">
          <h2 className="text-2xl">Quick Actions</h2>
          <div className="flex justify-center align-center mt-5">
            <div className={`${containers.quickActionContainer}`}>
              <button className={`${elements.quickActions} bg-pink-400`}>
                <NavLink onClick={() => setPicker(<NewPost />)}>
                  <FaNewspaper />
                </NavLink>
              </button>
              <p>New Blog!</p>
            </div>
            <div className={`${containers.quickActionContainer}`}>
              <button className={`${elements.quickActions} bg-blue-400`}>
                <NavLink onClick={() => setPicker(<MyPosts />)}>
                  <BsViewList />
                </NavLink>
              </button>
              <p>My Blogs</p>
            </div>
            <div className={`${containers.quickActionContainer}`}>
              <button className={`${elements.quickActions} bg-orange-400`}>
                <NavLink onClick={() => setPicker(<Blog />)}>
                  <AiFillRead />
                </NavLink>
              </button>
              <p>Read</p>
            </div>
          </div>
        </div>
      </header>
      <div className="my-10 flex flex-col items-center justify-center">
        <button
          onClick={() => setPicker(<NewPost />)}
          className={`${elements.button} ${variants.mainBtnBg} flex align-center justify-center`}
        >
          <AiFillPlusCircle />
        </button>
        <p>Create A New Post</p>
      </div>
      <div className="py-10">{picker}</div>
    </section>
  );
};

export default Dashboard;
