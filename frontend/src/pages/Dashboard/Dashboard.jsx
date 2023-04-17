import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { PickerContext } from "../../context/pickerContext";
import { SettingsContext } from "../../context/settingsContext";
import { FaNewspaper } from "react-icons/fa";
import { BsViewList } from "react-icons/bs";
import { AiFillRead, AiFillPlusCircle } from "react-icons/ai";
import { GiShadowFollower } from "react-icons/gi";
import { elements, variants } from "../../styles/elements.js";
import { containers } from "../../styles/containers.js";
import MyPosts from "./components/MyPosts";
import NewPost from "./components/NewPost";
import Blog from "../Blog/Blog";

const Dashboard = () => {
  const [component, setComponent] = useState(<MyPosts />);
  const { picker, setPicker } = useContext(PickerContext);
  const { settings } = useContext(SettingsContext);

  useEffect(() => {
    if (picker === "myposts") return setComponent(<MyPosts />);
    if (picker === "newpost") return setComponent(<NewPost />);
    if (picker === "blog") return setComponent(<Blog following={false} />);
    if (picker === "follow") return setComponent(<Blog following={true} />);
  }, [picker]);

  return (
    <section>
      <header style={settings.selectedColor && {backgroundImage: `linear-gradient(45deg, ${settings.selectedColor}, violet)`}} className="bg-gradient-to-tr from-violet-500 to-purple-500 pb-10 pt-5 rounded-b-2xl text-white shadow-md">
        <div className="mt-10 flex flex-col items-center justify-center">
          <div className="flex flex-wrap justify-center align-center mt-5">
            <div className={`${containers.quickActionContainer}`}>
              <motion.button
                onClick={() => setPicker("newpost")}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`${
                  elements.quickActions
                } bg-pink-400 hover:outline duration-200 ${
                  picker === "newpost" && "outline"
                }`}
              >
                <FaNewspaper />
              </motion.button>
              <p>New Blog!</p>
            </div>
            <div className={`${containers.quickActionContainer}`}>
              <motion.button
                onClick={() => setPicker("myposts")}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                className={`${
                  elements.quickActions
                } bg-blue-400 hover:outline duration-200 ${
                  picker === "myposts" && "outline"
                } `}
              >
                <BsViewList />
              </motion.button>
              <p>My Blogs</p>
            </div>
            <div className={`${containers.quickActionContainer}`}>
              <motion.button
                onClick={() => setPicker("blog")}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.4 } }}
                className={`${
                  elements.quickActions
                } bg-orange-400 hover:outline duration-200 ${
                  picker === "blog" && "outline"
                }`}
              >
                <AiFillRead />
              </motion.button>
              <p>Read</p>
            </div>
            <div className={`${containers.quickActionContainer}`}>
              <motion.button
                onClick={() => setPicker("follow")}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.75 } }}
                className={`${
                  elements.quickActions
                } bg-orange-400 hover:outline duration-200 ${
                  picker === "follow" && "outline"
                }`}
              >
                <GiShadowFollower />
              </motion.button>
              <p>Following</p>
            </div>
          </div>
        </div>
      </header>
      {picker !== "newpost" && (
        <div className="mt-10 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => setPicker("newpost")}
            className={`${elements.button} ${variants.mainBtnBg} flex align-center justify-center`}
          >
            <AiFillPlusCircle />
          </motion.button>
        </div>
      )}
      <div className="pb-10">{component}</div>
    </section>
  );
};

export default Dashboard;
