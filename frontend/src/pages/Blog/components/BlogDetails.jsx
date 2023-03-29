import { useState, useEffect, useContext } from "react";
import { ProfileContext } from "../../../context/profileContext.js";
import { newBlogContext } from "../../../context/newBlogContext.js";
import { PickerContext } from "../../../context/pickerContext.js";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import {
  singlePost,
  getPersonalPosts,
  getPostsByCategory,
  client,
  updateComment,
  deleteMyComment,
} from "../../../client";
import { DotLoader } from "react-spinners";
import {
  AiFillEdit,
  AiOutlineComment,
  AiFillCloseCircle,
} from "react-icons/ai";
import { RiHeartsFill } from "react-icons/ri";
import DOMPurify from "dompurify";
import imageUrlBuilder from "@sanity/image-url";
import NewComment from "./NewComment";
import { elements, variants } from "../../../styles/elements.js";
import { motion } from "framer-motion";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

const formatter = new Intl.RelativeTimeFormat(undefined, {
  numeric: "auto",
});

const DIVISIONS = [
  { amount: 60, name: "seconds" },
  { amount: 60, name: "minutes" },
  { amount: 24, name: "hours" },
  { amount: 7, name: "days" },
  { amount: 4.34524, name: "weeks" },
  { amount: 12, name: "months" },
  { amount: Number.POSITIVE_INFINITY, name: "years" },
];

const BlogDetails = () => {
  const { profile } = useContext(ProfileContext);
  const { setContent } = useContext(newBlogContext);
  const { setPicker } = useContext(PickerContext);
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [categoryPosts, setCategoryPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const [editCommentText, setEditCommentText] = useState("");
  const [editLoad, setEditLoad] = useState(false);
  const [deleteLoad, setDeleteLoad] = useState(false);
  const [deleteKey, setDeleteKey] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    singlePost(postId)
      .then((post) => {
        setPost(post[0]);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  useEffect(() => {
    getPersonalPosts(post?.postedBy?._id)
      .then((res) => {
        const filter = res.filter((item) => item._id !== post._id);
        setUserPosts(filter);
      })
      .catch((err) => console.log(err));
    post?.categories?.map((category) =>
      getPostsByCategory(category._id)
        .then((res) => {
          setCategoryPosts(res);
        })
        .catch((err) => console.log(err))
    );
  }, [post]);

  const editPost = () => {
    const { title, excerpt, categories, _id } = post;
    const postToEdit = {
      _id,
      title,
      excerpt,
      categories,
    };
    localStorage.setItem("editPost", JSON.stringify(postToEdit));
    setPicker("newpost");
    setContent(post?.body);
    navigate("/dashboard");
  };

  const formatTime = (date) => {
    let duration = (date - new Date()) / 1000;
    for (let i = 0; i < DIVISIONS.length; i++) {
      const division = DIVISIONS[i];
      if (Math.abs(duration) < division.amount) {
        return formatter.format(Math.round(duration), division.name);
      }
      duration /= division.amount;
    }
  };

  const editMyComment = (comment) => {
    if (comment) {
      setEditLoad(true);
      updateComment(editCommentText, comment, post._id, profile._id)
        .then((res) => {
          singlePost(postId)
            .then((post) => {
              setPost(post[0]);
              setEditComment(false);
              setEditLoad(false);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  const deleteComment = (key) => {
    setDeleteLoad(true);
    if (key) {
      deleteMyComment(key, postId)
        .then((res) => {
          callRefresh();
          setDeleteKey(null);
          setDeleteLoad(false);
        })
        .catch((err) => console.log(err));
    }
  };

  const callRefresh = () => {
    singlePost(postId).then((post) => {
      setPost(post[0]);
    });
  };

  return (
    <section>
      {post ? (
        <>
          <section>
            <header className="p-5 pt-20 relative flex flex-col justify-center align-center bg-gradient-to-tr from-violet-500 to-purple-500 shadow-md rounded-md">
              <div>
                <h1 className="text-4xl text-white mb-5 mt-3">{post.title}</h1>
                <div
                  onClick={() => navigate(`/users/${post.postedBy._id}`)}
                  className=" text-white mb-5"
                >
                  <img
                    src={post.postedBy.image}
                    alt="user"
                    className="w-[25px] h-[25px] rounded-full shadow-md"
                  />
                  <p>
                    {post.postedBy.name === profile.name
                      ? "You"
                      : post.postedBy.name}
                  </p>
                </div>
                {post?.postedBy?._id === profile._id && (
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className={`${variants.mainBtnBg} p-3 fixed bottom-5 right-5 z-40 rounded-full shadow-md text-2xl cursor-pointer`}
                    onClick={() => editPost()}
                  >
                    <AiFillEdit />
                  </motion.div>
                )}
              </div>
              <img
                src={post?.image?.asset?.url}
                alt="post header"
                className="rounded-lg w-screen shadow-md"
              />
              <div className="flex justify-between items-start pt-2 mb-5">
                <div className="text-white text-xs mb-5">
                  <p className="text-sm">
                    {new Date(post._createdAt).toLocaleDateString()}
                  </p>
                  <p>{formatTime(new Date(post._createdAt))}</p>
                  <p>last updated {formatTime(new Date(post.publishedAt))}</p>
                </div>
                <div>
                  <div className="flex justify-center items-center text-white">
                    <RiHeartsFill />
                    <p className="ml-3">
                      {post.save ? post.save.length.toLocaleString() : 0}
                    </p>
                  </div>
                  <div className="flex justify-center items-center text-white">
                    <AiOutlineComment />
                    <p className="ml-3">
                      {post.comments
                        ? post.comments.length.toLocaleString()
                        : 0}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-center text-white md:text-2xl md:w-[50%] mx-auto md:py-5">
                {post.excerpt}
              </p>
              <div className="my-5 px-2 flex flex-wrap justify-center items-center gap-2">
                {post.categories.map((cat) => (
                  <div
                    key={cat.title}
                    className="py-1 px-3 rounded-full shadow-md bg-white text-center"
                  >
                    <p>{cat.title}</p>
                  </div>
                ))}
              </div>
            </header>
            <div className="py-2 px-3 my-5 border-b max-w-full md:p-20">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post?.body),
                }}
              ></div>
            </div>
          </section>
          <section className="my-5 md:flex md:justify-center md:items-center md:flex-col md:my-20">
            {post.comments?.map((comment, index) => (
              <div key={index} className="relative lg:w-[50%]">
                <div className="absolute border-b border-l rounded-md left-4 top-0 w-[25%] h-[90%] z-0"></div>
                <div
                  key={index}
                  className="flex justify-around items-center py-2 px-5 m-2 rounded-md shadow-md bg-white isolate"
                >
                  {comment?.postedBy?._id === profile._id && (
                    <>
                      <div
                        onClick={() => {
                          setEditCommentText(comment?.comment);
                          setEditComment((prev) =>
                            prev === comment._key ? false : comment._key
                          );
                        }}
                        className="absolute top-0 right-1 rounded-md bg-gradient-to-r from-green-300 to-green-500 p-1 shadow-md text-white"
                      >
                        <AiFillEdit />
                      </div>
                      {deleteLoad ? (
                        <div className="absolute top-0 left-1 rounded-md bg-gradient-to-r from-red-300 to-red-500 p-1 shadow-md text-white">
                          {deleteKey === comment._key ? (
                            <DotLoader size={15} />
                          ) : (
                            <AiFillCloseCircle size={15} />
                          )}
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            setDeleteKey(comment._key);
                            deleteComment(comment._key);
                          }}
                          className="absolute top-0 left-1 rounded-md bg-gradient-to-r from-red-300 to-red-500 p-1 shadow-md text-white"
                        >
                          <AiFillCloseCircle size={15} />
                        </div>
                      )}
                    </>
                  )}
                  <NavLink
                    to={`/users/${comment?.postedBy?._id}`}
                    className="rounded-full w-[50px] h-[50px] shadow-md overflow-hidden"
                  >
                    <img
                      src={comment?.postedBy?.image}
                      alt="user comment"
                      className="object-cover object-center"
                    />
                  </NavLink>
                  <div className="max-w-[75%] min-w-[75%]">
                    {editComment === comment._key ? (
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="flex justify-between items-center"
                      >
                        <input
                          onChange={(e) => setEditCommentText(e.target.value)}
                          value={editCommentText}
                          className={`${elements.input}`}
                        />
                        {editLoad ? (
                          <DotLoader className="ml-2" size={35} />
                        ) : (
                          <button
                            onClick={() => editMyComment(comment)}
                            type="button"
                            className={`${variants.mainBtnBg} ml-2 px-3 rounded-md shadow-md`}
                          >
                            Edit
                          </button>
                        )}
                      </motion.div>
                    ) : (
                      <p>{comment?.comment}</p>
                    )}
                  </div>
                </div>
                <div className="py-1 px-2 mx-2 ml-10 rounded-md shadow-md bg-white isolate">
                  <p>{new Date(comment?.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            <NewComment
              postId={postId}
              userId={profile._id}
              callRefresh={callRefresh}
            />
          </section>
          <section className="my-10 mt-[100px] p-2">
            <div className="flex flex-col items-center justify-start p-5 mx-2 rounded-md shadow-md relative bg-gradient-to-tr from-purple-400 to-violet-500">
              <div className="absolute top-[-50px]">
                <img
                  onClick={() => navigate(`/users/${post.postedBy._id}`)}
                  src={post?.postedBy?.image}
                  alt="user"
                  className="rounded-full w-[100px] h-[100px] shadow-md object-cover object-center"
                />
                <p className="text-center">{post?.postedBy?.name}</p>
              </div>
              <div className="my-[100px] text-center">
                <p>View More Posts by</p>
                <p>{post?.postedBy?.name}</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center translate-y-[-100px]">
              {userPosts.length > 0 ? (
                <>
                  {userPosts.map((userPost) => (
                    <NavLink
                      key={userPost._id}
                      onClick={() => setRefresh((prev) => !prev)}
                      to={`/posts/${userPost._id}`}
                      className="p-2 my-2 w-[70%] sm:w-[50%] md:w-[30%] xl:w-[25%] bg-white rounded-md shadow-md"
                    >
                      <img
                        src={urlFor(userPost.image?.asset?.url)
                          .width(300)
                          .url()}
                        alt={userPost.title}
                        className="max-h-[150px] min-w-full object-cover object-center rounded-md shadow-md"
                      />
                    </NavLink>
                  ))}
                </>
              ) : (
                <p>No Post To Show</p>
              )}
            </div>
            <h2 className="my-5 text-center md:text-2xl">Related Posts</h2>
            <div className="my-10 mx-auto p-3 w-3/4 flex justify-start items-center gap-5 overflow-auto">
              {categoryPosts.length > 0 ? (
                <>
                  {categoryPosts.map((post) => (
                    <div key={post?._id}>
                      {post._id !== postId && (
                        <div
                          onClick={() => {
                            setRefresh((prev) => !prev);
                            navigate(`/posts/${post?._id}`);
                          }}
                          className="min-w-[250px] min-h-[300px] max-w-[25%] rounded-md shadow-md px-3 p-3 flex flex-col justify-between items-center relative"
                        >
                          <div>
                            <img
                              src={post?.image?.asset?.url}
                              alt="category post header"
                              className="rounded-md shadow-md object-cover object-center max-h-[150px] min-h-[150px] w-full"
                            />
                            <p className="text-center m-3">{post?.title}</p>
                          </div>
                          <div className="flex justify-between items-center mt-10 w-full">
                            <img
                              src={post?.postedBy?.image}
                              alt="user"
                              className="w-[25px] h-[25px] object-cover object-center rounded-full shadow-md"
                            />
                            <p className="text-center text-xs">
                              {post?.postedBy?.name}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </>
              ) : (
                <p>No Related Posts In These Categories</p>
              )}
            </div>
          </section>
        </>
      ) : (
        <section className="h-screen flex justify-center items-center">
          <DotLoader />
        </section>
      )}
    </section>
  );
};

export default BlogDetails;
