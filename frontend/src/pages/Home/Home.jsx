import { useContext } from "react";
import { elements, variants } from "../../styles/elements";
import { ProfileContext } from "../../context/profileContext";
import { PickerContext } from "../../context/pickerContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { dummyPosts } from "../../constants/dummyPosts";
import { BsArrowUpRightSquareFill } from "react-icons/bs";
import { FaGooglePlay } from "react-icons/fa";
import {
  blogTemplates,
  blogger,
  world,
  guy,
  darkWoman,
  woman,
  appIcon,
} from "../../assets";

const Home = () => {
  const { profile } = useContext(ProfileContext);
  const { setPicker } = useContext(PickerContext);

  const navigate = useNavigate();

  const createANewPost = () => {
    setPicker("newpost");
    navigate("/dashboard");
  };

  return (
    <>
      <header className="bg-gradient-to-r from-fuchsia-500 to-pink-500 p-10 pt-[10%] rounded-b-lg overflow-x-hidden">
        <motion.h1
          initial={{ x: -500 }}
          animate={{ x: 0, transition: { delay: 0.5 } }}
          className={`${elements.h1} text-start text-6xl mt-[75%] md:mt-10`}
        >
          {profile ? "Welcome Back!" : "Join Our Blog!"}
        </motion.h1>
        <div className="flex">
          <img
            src={blogTemplates}
            alt="svg blog"
            className="w-[100px] h-[100px] md:w-[200px] md:h-[200px]"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => navigate("/login")}
            className={`${variants.mainBtnBg} px-3 py-1 m-5 ml-10 bg-white rounded-md h-max relative shadow-md`}
          >
            {profile ? "Start Reading " : "Sign In "}
            <BsArrowUpRightSquareFill className="rounded-full absolute top-[-5px] right-[-5px] bg-white text-black" />
          </motion.button>
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={blogger}
            alt="blogger"
            className="rounded-2xl absolute right-0 top-[5%] shadow-xl md:w-[700px] h-500px]"
          />
        </div>
      </header>
      <section className="bg-gray-100 py-10">
        <div className="flex flex-col justify-center items-center md:flex-row md:justify-around">
          {dummyPosts.map((post, index) => (
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{
                scale: 1,
                transition: { type: "spring", stiffness: 300 },
              }}
              key={index}
              className="w-[300px] h-[450px] rounded-lg shadow-lg bg-white relative m-5"
            >
              <motion.img
                whileInView={{ scale: 1.1 }}
                src={post.img}
                alt="svg blog"
                className="rounded-md shadow-md h-[200px] w-[300px] object-cover object-center"
              />
              <div className="px-2 mt-2">
                <h3 className="text-xl py-2 underline">{post.title}</h3>
                <p className="first-letter:text-2xl">{post.desc}</p>
              </div>
              <div className="absolute bottom-0 left-0 rounded-md bg-gray-500 flex justify-between align-center p-2 w-full">
                <p className="text-fuchsia-400">{post.likes}</p>
                <p className="text-orange-500">{post.views}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="bg-gradient-to-r from-fuchsia-500 to-pink-500 p-10 rounded-t-md">
        <motion.h1
          initial={{ x: -300 }}
          whileInView={{ x: 0 }}
          className={`${elements.h1} text-start text-6xl`}
        >
          {profile ? `Hello ${profile.name}` : "Are You a Gym Enthusiast?"}
        </motion.h1>
        <>
          {profile ? (
            <>
              <p>
                New Posts from your followers have arrived... checkout what they
                have been writing about!!
              </p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => {
                  setPicker("follow");
                  navigate("/dashboard");
                }}
                className={`${variants.mainBtnBg} px-4 py-2 rounded-md h-max relative shadow-md mt-5`}
              >
                Dashboard
                <BsArrowUpRightSquareFill className="rounded-full absolute top-[-5px] right-[-5px] bg-white text-black" />
              </motion.button>
            </>
          ) : (
            <p>
              You are not alone!! And so many of us want to share with the world
              the<strong>Knowledge</strong>, <strong>Experience</strong> &
              <strong>Skill</strong> we've all gained.
            </p>
          )}
        </>
      </section>
      <section className="bg-gradient-to-r from-fuchsia-500 to-pink-500 py-10 my-[-2px]">
        <div className="relative flex justify-center align-center overflow-hidden">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1, transition: { delay: 0.25 } }}
            className="top-10 left-5 absolute w-10 h-10 rounded-full outline outline-pink-500 overflow-hidden sm:left-[25%] md:left-[30%]"
          >
            <img src={guy} alt="guy" />
          </motion.div>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1, transition: { delay: 0.35 } }}
            className="top-40 left-40 absolute w-10 h-10 rounded-full outline outline-yellow-500 overflow-hidden sm:left-[45%] sm:top=[75%] md:left-[45%] md:top-[60%]"
          >
            <img src={darkWoman} alt="dark woman" />
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1, transition: { delay: 0.25 } }}
            className="top-20 right-5 absolute w-10 h-10 rounded-full outline outline-blue-500 overflow-hidden sm:right-[25%] md:top-[40%] md:right-[35%]"
          >
            <img src={woman} alt="woman" />
          </motion.div>
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            src={world}
            alt="world map"
            className="rounded-md"
          />
        </div>
      </section>
      <section className="bg-gradient-to-r from-fuchsia-500 to-pink-500 p-10 rounded-b-md">
        <motion.h1
          initial={{ x: -300 }}
          whileInView={{ x: 0 }}
          className={`${elements.h1} text-start text-6xl`}
        >
          {profile ? "Write Something New" : "So Are We!!"}
        </motion.h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => (profile ? createANewPost() : navigate("/login"))}
          className={`${variants.mainBtnBg} px-4 py-2 rounded-md h-max relative shadow-md`}
        >
          {profile ? "Create!! " : "Join Today!! "}{" "}
          <BsArrowUpRightSquareFill className="rounded-full absolute top-[-5px] right-[-5px] bg-white text-black" />
        </motion.button>
      </section>
      <div className="flex flex-col justify-center items-center text-white text-xl bg-[#222] py-10 mt-[-10px] rounded-t-md w-full">
        <img
          src={appIcon}
          alt="workout blog icon"
          className="scale-75 mb-[-10%] lg:scale-50"
        />
        <p>find us on</p>
        <FaGooglePlay className="text-4xl mt-5" />
      </div>
    </>
  );
};

export default Home;
