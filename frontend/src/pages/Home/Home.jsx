import { elements, variants } from "../../styles/elements";
import { motion } from "framer-motion";
import { containers } from "../../styles/containers";
import { dummyPosts } from "../../constants/dummyPosts";
import { BsArrowUpRightSquareFill } from "react-icons/bs";
import { blogTemplates, blogger } from "../../assets";

const Home = () => {
  return (
    <>
      <header className="bg-gradient-to-r from-fuchsia-500 to-pink-500 p-10 pt-[10%] rounded-b-lg overflow-x-hidden">
        <motion.h1
          initial={{ x: -500 }}
          animate={{ x: 0, transition: { delay: 0.5 } }}
          className={`${elements.h1} text-start text-6xl`}
        >
          Join Our Blog!
        </motion.h1>
        <div className="flex">
          <img src={blogTemplates} alt="svg blog" />
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="http://localhost:5173/login"
            className={`${variants.mainBtnBg} px-3 py-1 bg-white rounded-md h-max relative shadow-md`}
          >
            <button>
              Create an Account{" "}
              <BsArrowUpRightSquareFill className="rounded-full absolute top-[-5px] right-[-5px] bg-white text-black" />
            </button>
          </motion.a>
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={blogger}
            alt="blogger"
            className="rounded-2xl absolute right-0 top-[15%] shadow-xl"
          />
        </div>
      </header>
      <section className="bg-gray-100 py-10">
        <div className="flex p-10 justify-evenly align-center">
          {dummyPosts.map((post, index) => (
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{
                scale: 1,
                transition: { type: "spring", stiffness: 300 },
              }}
              key={index}
              className="w-[300px] h-[400px] rounded-lg shadow-lg bg-white relative"
            >
              <img
                src={post.img}
                alt="svg blog"
                className="rounded-md shadow-md"
              />
              <div className="px-2">
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
      <section className="bg-gradient-to-r from-fuchsia-500 to-pink-500 p-10 rounded-md">
        <motion.h1
          initial={{ x: -500 }}
          whileInView={{ x: 0 }}
          className={`${elements.h1} text-start text-6xl`}
        >
          Are You a Gym Enthusiast?
        </motion.h1>
      </section>
    </>
  );
};

export default Home;
