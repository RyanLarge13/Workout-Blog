import { useState, useEffect, useContext } from "react";
import { ProfileContext } from "../../context/profileContext";
import { getPosts, client, getSearchedPosts, savePost } from "../../client.js";
import { motion } from "framer-motion";
import { DotLoader } from "react-spinners";
import { NavLink } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";
import { elements, variants } from "../../styles/elements.js";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

const Blog = () => {
  const { profile } = useContext(ProfileContext);

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    getPosts()
      .then((posts) => {
        console.log(posts);
        setPosts(posts);
      })
      .catch((err) => console.log(err));
  }, []);

  const queryTitle = (searchTerm) => {
    if (searchTerm !== "") {
      getSearchedPosts(searchTerm)
        .then((posts) => setPosts(posts))
        .catch((err) => console.log(err));
    } else {
      getPosts()
        .then((posts) => {
          setPosts(posts);
        })
        .catch((err) => console.log(err));
    }
  };

  const likePost = (postId) => {
    savePost(postId, profile._id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      {posts ? (
        <section className="py-10">
          <div className="flex justify-center items-center">
            <label htmlFor="search" className="hidden">
              Search
            </label>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              className={`${elements.input} mx-0`}
              onChange={(e) => queryTitle(e.target.value)}
            />
          </div>
          {posts.map((post, index) => (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { type: "spring", stiffness: 400 },
              }}
              key={index}
              className="rounded-lg shadow-lg p-5 my-5 mx-auto w-max relative"
            >
              <img
                src={urlFor(post.image.asset.url).width(300).url()}
                alt="blog image"
                className="rounded-md shadow-md"
              />
              <h2 className="text-xl my-2">{post.title}</h2>
              <div className="flex justify-between align-center mt-5">
                <div className="flex flex-col items-center justify-center">
                  <NavLink
                    to={`/posts/${post._id}`}
                    className={`${elements.button} ${variants.mainBtnBg} text-center mx-0 my-0`}
                  >
                    View
                  </NavLink>
                  <p className="p-1 mt-2">
                    {new Date(post._createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={post.postedBy.image}
                    alt="user"
                    className="rounded-full w-[40px] h-40px] shadow-md"
                  />
                  <NavLink to={`/users/${post.postedBy._id}`}>
                    {post.postedBy.name}
                  </NavLink>
                </div>
              </div>
              <div className="absolute top-[-10px] right-[-10px] p-1 text-2xl text-red-400 cursor-pointer flex items-center justify-center">
                <p className="text-black text-sm m-1">
                  {post.save
                    ? parseInt(post.save.length).toLocaleString()
                    : "0"}
                </p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white rounded-lg shadow-sm"
                >
                  {!!post?.save?.filter(
                    (item) => item.postedBy._id === profile._id
                  )?.length ? (
                    <AiFillHeart />
                  ) : (
                    <AiOutlineHeart onClick={() => likePost(post._id)} />
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </section>
      ) : (
        <section className="h-screen flex justify-center align-center">
          <DotLoader />
        </section>
      )}
    </>
  );
};

export default Blog;
