import { useState, useEffect, useContext } from "react";
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
              <button
                className={`${elements.quickActions} bg-pink-400 ${
                  picker === "newpost" && "outline"
                }`}
              >
                <NavLink onClick={() => setPicker("newpost")}>
                  <FaNewspaper />
                </NavLink>
              </button>
              <p>New Blog!</p>
            </div>
            <div className={`${containers.quickActionContainer}`}>
              <button
                className={`${elements.quickActions} bg-blue-400 ${
                  picker === "myposts" && "outline"
                } `}
              >
                <NavLink onClick={() => setPicker("myposts")}>
                  <BsViewList />
                </NavLink>
              </button>
              <p>My Blogs</p>
            </div>
            <div className={`${containers.quickActionContainer}`}>
              <button
                className={`${elements.quickActions} bg-orange-400 ${
                  picker === "blog" && "outline"
                }`}
              >
                <NavLink onClick={() => setPicker("blog")}>
                  <AiFillRead />
                </NavLink>
              </button>
              <p>Read</p>
            </div>
            <div className={`${containers.quickActionContainer}`}>
              <button
                className={`${elements.quickActions} bg-orange-400 ${
                  picker === "follow" && "outline"
                }`}
              >
                <NavLink onClick={() => setPicker("follow")}>
                  <GiShadowFollower />
                </NavLink>
              </button>
              <p>Following</p>
            </div>
          </div>
        </div>
      </header>
      {picker !== "newpost" && (
        <div className="mt-10 flex flex-col items-center justify-center">
          <button
            onClick={() => setPicker("newpost")}
            className={`${elements.button} ${variants.mainBtnBg} flex align-center justify-center`}
          >
            <AiFillPlusCircle />
          </button>
          <p>Create A New Post</p>
        </div>
      )}
      <div className="py-10">{component}</div>
    </section>
  );
};

export default Dashboard;
