import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { PickerContext } from "../../context/pickerContext";
import { FaNewspaper } from "react-icons/fa";
import { BsViewList } from "react-icons/bs";
import { AiFillRead, AiFillPlusCircle } from "react-icons/ai";
import { GiShadowFollower } from "react-icons/gi";
import { elements, variants } from "../../styles/elements.js";
import { containers } from "../../styles/containers.js";
import { NavLink } from "react-router-dom";
import MyPosts from "./components/MyPosts";
import NewPost from "./components/NewPost";
import Blog from "../Blog/Blog";

const Dashboard = () => {
  const [component, setComponent] = useState(<MyPosts />);
  const { picker, setPicker } = useContext(PickerContext);

  useEffect(() => {
    if (picker === "myposts") return setComponent(<MyPosts />);
    if (picker === "newpost") return setComponent(<NewPost />);
    if (picker === "blog") return setComponent(<Blog following={false} />);
    if (picker === "follow") return setComponent(<Blog following={true} />);
  }, [picker]);

  return (
    <section>
      <header className="bg-gradient-to-tr from-violet-500 to-purple-500 py-10 rounded-b-2xl text-white shadow-md">
        <div className="mt-10 flex flex-col items-center justify-center">
          <h2 className="text-2xl">Quick Actions</h2>
          <div className="flex flex-wrap justify-center align-center mt-5">
            <div className={`${containers.quickActionContainer}`}>
              <motion.button
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`${
                  elements.quickActions
                } bg-pink-400 hover:outline duration-200 ${
                  picker === "newpost" && "outline"
                }`}
              >
                <NavLink onClick={() => setPicker("newpost")}>
                  <FaNewspaper />
                </NavLink>
              </motion.button>
              <p>New Blog!</p>
            </div>
            <div className={`${containers.quickActionContainer}`}>
              <motion.button
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`${
                  elements.quickActions
                } bg-blue-400 hover:outline duration-200 ${
                  picker === "myposts" && "outline"
                } `}
              >
                <NavLink onClick={() => setPicker("myposts")}>
                  <BsViewList />
                </NavLink>
              </motion.button>
              <p>My Blogs</p>
            </div>
            <div className={`${containers.quickActionContainer}`}>
              <motion.button
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`${
                  elements.quickActions
                } bg-orange-400 hover:outline duration-200 ${
                  picker === "blog" && "outline"
                }`}
              >
                <NavLink onClick={() => setPicker("blog")}>
                  <AiFillRead />
                </NavLink>
              </motion.button>
              <p>Read</p>
            </div>
            <div className={`${containers.quickActionContainer}`}>
              <motion.button
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`${
                  elements.quickActions
                } bg-orange-400 hover:outline duration-200 ${
                  picker === "follow" && "outline"
                }`}
              >
                <NavLink onClick={() => setPicker("follow")}>
                  <GiShadowFollower />
                </NavLink>
              </motion.button>
              <p>Following</p>
            </div>
          </div>
        </div>
      </header>
      {picker !== "newpost" && (
        <div className="mt-10 flex flex-col items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => setPicker("newpost")}
            className={`${elements.button} ${variants.mainBtnBg} flex align-center justify-center`}
          >
            <AiFillPlusCircle />
          </motion.button>
          <p>Create A New Post</p>
        </div>
      )}
      <div className="py-10">{component}</div>
    </section>
  );
};

export default Dashboard;
