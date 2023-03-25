import { useState, useEffect, useContext } from "react";
import { ProfileContext } from "../../context/profileContext";
import {
  getPosts,
  getPersonalPosts,
  getCategories,
  getAllFollowing,
  client,
  getSearchedPosts,
  getPostsByCategory,
  getPostsByFollowing,
  getFollowerCategoryPosts,
  savePost,
  unsavePost,
} from "../../client.js";
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

const Blog = ({ following }) => {
  const { profile } = useContext(ProfileContext);

  const [posts, setPosts] = useState([]);
  const [saved, setSaved] = useState(false);
  const [pickerCategories, setPickerCategories] = useState([]);
  const [pickedCategory, setPickedCategory] = useState("");
  const [peopleIFollow, setPeopleIFollow] = useState([]);
  const [noPostsToShow, setNoPostsToShow] = useState(false);
  const [followerId, setFollowerId] = useState("");

  useEffect(() => {
    setPosts([]);
    if (following) {
      getAllFollowing(profile._id)
        .then((res) => {
          setPeopleIFollow(res[0].follow);
        })
        .catch((err) => console.log(err));
      profile.follow.map((user) =>
        getPostsByFollowing(user.userId)
          .then((postRes) => {
            setPosts((prev) => [...prev, ...postRes]);
          })
          .catch((err) => console.log(err))
      );
    }
    if (!following) {
      getPosts()
        .then((posts) => {
          setPosts(posts);
        })
        .catch((err) => console.log(err));
    }
    getCategories()
      .then((res) => setPickerCategories(res))
      .catch((err) => console.log(err));
  }, [following]);

  useEffect(() => {
    const isSaved = posts?.map(
      (post) =>
        !!post?.save?.filter((item) => item?.postedBy?._id === profile._id)
          ?.length
    );
    setSaved(isSaved);
  }, [posts]);

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
      .then((res) => {
        getPosts()
          .then((posts) => {
            setPosts(posts);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const unlikePost = (postId, saved) => {
    const key = saved[0]?._key;
    unsavePost(postId, key)
      .then((res) => {
        getPosts()
          .then((posts) => {
            setPosts(posts);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const filterPostsByCategory = (id) => {
    if (pickedCategory === id) {
      setPickedCategory("");
      return getPosts()
        .then((res) => setPosts(res))
        .catch((err) => console.log(err));
    } else {
      setPickedCategory(id);
      filterCategories(id);
    }
  };

  const filterCategories = (id) => {
    getPostsByCategory(id)
      .then((res) => {
        setPickedCategory(id);
        if (res.length < 1) {
          setPosts([]);
          setNoPostsToShow(true);
          setTimeout(() => {
            setNoPostsToShow(false);
          }, 2000);
          setTimeout(() => {
            getPosts()
              .then((res) => {
                setPickedCategory("");
                setPosts(res);
              })
              .catch((err) => console.log(err));
          }, 3000);
        }
        setPosts(res);
      })
      .catch((err) => console.log(err));
  };

  const getUserPosts = (userId) => {
    setPosts([]);
    setPickedCategory("");
    setFollowerId((prev) => (prev === userId ? null : userId));
    followerId === userId
      ? profile.follow.map((user) =>
          getPostsByFollowing(user.userId)
            .then((postRes) => {
              setPosts((prev) => [...prev, ...postRes]);
            })
            .catch((err) => console.log(err))
        )
      : getPersonalPosts(userId)
          .then((res) => {
            setPosts(res);
            if (res.length < 1) {
              setTimeout(() => {
                setNoPostsToShow(true);
                setFollowerId(null);
                profile.follow.map((user) =>
                  getPostsByFollowing(user.userId)
                    .then((postRes) => {
                      setPosts((prev) => [...prev, ...postRes]);
                    })
                    .catch((err) => console.log(err))
                );
              }, 500);
            }
          })
          .catch((err) => console.log(err));
  };

  return (
    <>
      {posts.length > 0 ? (
        <section className="pt-20">
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
          {pickerCategories.length > 0 && (
            <div className="my-5 mx-auto py-5 px-2 flex flex-wrap max-w-full justify-center items-center md:w-[50%]">
              {pickerCategories.map((category, index) => (
                <div
                  key={index}
                  onClick={() => filterPostsByCategory(category._id)}
                  className={`px-3 py-1 m-1 rounded-full shadow-md text-center min-w-max transition-all duration-200 hover:text-pink-400 cursor-pointer ${
                    pickedCategory === category._id
                      ? "bg-violet-400"
                      : "bg-white"
                  }`}
                >
                  <p className="text-xs">{category.title}</p>
                </div>
              ))}
            </div>
          )}
          {following && peopleIFollow.length > 0 && (
            <div className="m-5 max-w-full flex flex-wrap justify-center items-center">
              {peopleIFollow.map((user) => (
                <div
                  key={user.userId}
                  onClick={() => getUserPosts(user.userId)}
                  className={`m-2 p-1 cursor-pointer`}
                >
                  <img
                    src={user?.postedBy?.image}
                    alt="user"
                    className={`rounded-full w-[50px] h-[50px] shadow-md mx-auto p-1 object-cover object-center hover:bg-violet-400 duration-200 ${
                      followerId === user.userId && "bg-violet-400"
                    }`}
                  />
                  <p className="text-center">{user?.postedBy?.name}</p>
                </div>
              ))}
            </div>
          )}
          <div className="sm:grid sm:grid-cols-2 md:grid md:grid-cols-3 lg:grid-cols-4">
            {posts.map((post, index) => (
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 400 },
                }}
                key={index}
                className="rounded-lg shadow-lg p-5 my-5 min-w-[90%] mx-auto max-w-[90%] relative"
              >
                <img
                  src={urlFor(post?.image?.asset?.url).width(300).url()}
                  alt="blog image"
                  className="max-h-[150px] min-w-full object-cover object-center rounded-md shadow-md"
                />
                <h2 className="text-xl my-2">{post?.title}</h2>
                <p className="text-center text-xs my-5">{post?.excerpt}</p>
                <div className="flex justify-between align-center mt-5">
                  <div className="flex flex-col items-center justify-start">
                    <NavLink
                      to={`/posts/${post?._id}`}
                      className={`${elements.button} ${variants.mainBtnBg} text-center mx-0 my-0`}
                    >
                      View
                    </NavLink>
                    <p className="p-1 mt-2">
                      {new Date(post?._createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-start">
                    <img
                      src={post?.postedBy?.image}
                      alt="user"
                      className="rounded-full w-[40px] h-[40px] shadow-md object-cover object-center"
                    />
                    <NavLink to={`/users/${post?.postedBy?._id}`}>
                      {post?.postedBy?.name}
                    </NavLink>
                  </div>
                </div>
                {post?.categories?.length > 0 && (
                  <div className="my-3 py-2 flex flex-wrap">
                    {post?.categories?.map((category) => (
                      <div
                        onClick={() => filterCategories(category._id)}
                        key={category._id}
                        className="rounded-full px-3 py-1 m-1 shadow-md bg-violet-400 hover:bg-white cursor-pointer transition-all duration-200"
                      >
                        <p className="text-sm select-none">{category.title}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="absolute top-[-10px] right-[-10px] text-2xl text-red-400 cursor-pointer flex items-center justify-center w-min h-min">
                  <p className="text-black text-sm m-1">
                    {post?.save
                      ? parseInt(post?.save?.length).toLocaleString()
                      : "0"}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: [0.2, 1.2, 0.7, 1.1, 1] }}
                  >
                    {saved && saved[index] === true ? (
                      <AiFillHeart
                        onClick={() =>
                          unlikePost(
                            post?._id,
                            post?.save?.filter(
                              (item) => item?.postedBy?._id === profile._id
                            )
                          )
                        }
                        className="min-w-[7px] min-h-[7px]"
                      />
                    ) : (
                      <AiOutlineHeart
                        onClick={() => likePost(post?._id)}
                        className="min-w-[7px] min-h-[7px]"
                      />
                    )}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      ) : (
        <section className="h-screen flex justify-center items-center">
          {noPostsToShow ? <p>No Posts To Show</p> : <DotLoader />}
        </section>
      )}
    </>
  );
};

export default Blog;
