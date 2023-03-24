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
} from "../../../client";
import { DotLoader } from "react-spinners";
import { AiFillEdit } from "react-icons/ai";
import DOMPurify from "dompurify";
import imageUrlBuilder from "@sanity/image-url";
import NewComment from "./NewComment";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

const BlogDetails = () => {
  const { profile } = useContext(ProfileContext);
  const { setContent } = useContext(newBlogContext);
  const { setPicker } = useContext(PickerContext);

  const [post, setPost] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [categoryPosts, setCategoryPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    singlePost(postId)
      .then((post) => {
        setPost(post[0]);
        window.scrollTo(0, 0);
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

  return (
    <section>
      {post ? (
        <>
          <section>
            <header className="p-5 pt-20 relative flex flex-col justify-center align-center bg-gradient-to-tr from-violet-500 to-purple-500 shadow-md rounded-md">
              <div className="flex justify-between items-center">
                <h1 className="text-4xl text-white mb-5 mt-3">{post.title}</h1>
                {post?.postedBy?._id === profile._id && (
                  <AiFillEdit
                    onClick={() => editPost()}
                    className="text-white text-2xl"
                  />
                )}
              </div>
              <img
                src={post?.image?.asset?.url}
                alt="post header"
                className="rounded-lg w-screen shadow-md"
              />
              <p className="my-5">
                {new Date(post._createdAt).toLocaleDateString()}
              </p>
              <p className="text-center text-white">{post.excerpt}</p>
            </header>
            <div className="py-2 px-3 my-5 border-b max-w-full">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post?.body),
                }}
              ></div>
            </div>
          </section>
          <section className="my-5">
            {post.comments?.map((comment, index) => (
              <div key={index} className="relative">
                <div className="absolute border-b border-l rounded-md left-4 top-0 w-[25%] h-[90%] z-0"></div>
                <div
                  key={index}
                  className="flex justify-around items-center py-2 px-5 m-2 rounded-md shadow-md bg-white isolate"
                >
                  <NavLink
                    to={`/users/${comment?.postedBy?._id}`}
                    className="rounded-full w-[50px] h-[50px] shadow-md overflow-hidden"
                  >
                    <img src={comment?.postedBy?.image} alt="user comment" />
                  </NavLink>
                  <p className="max-w-[75%] min-w-[75%]">{comment?.comment}</p>
                </div>
                <div className="py-1 px-2 mx-2 ml-10 rounded-md shadow-md bg-white isolate">
                  <p>{new Date(comment?.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            <NewComment postId={postId} userId={profile._id} />
          </section>
          <section className="my-10 mt-[100px] p-2">
            <div className="flex flex-col items-center justify-start p-5 mx-2 rounded-md shadow-md relative bg-gradient-to-tr from-purple-400 to-violet-500">
              <div className="absolute top-[-50px]">
                <img
                  src={post?.postedBy?.image}
                  alt="user"
                  className="rounded-full w-[100px] h-[100px] shadow-md object-cover object-center"
                />
                <p className="text-center">{post?.postedBy?.name}</p>
              </div>
              <div className="mt-[100px] text-center mb-[200px]">
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
                      className="p-2 my-2 md:my-5 w-[70%] bg-white rounded-md shadow-md"
                    >
                      <img
                        src={urlFor(userPost.image?.asset?.url)
                          .width(300)
                          .url()}
                        alt={userPost.title}
                        className="max-h-[150px] md:max-h-[300px] min-w-full object-cover object-center rounded-md shadow-md"
                      />
                    </NavLink>
                  ))}
                </>
              ) : (
                <p>No Post To Show</p>
              )}
            </div>
            <h2 className="mb-5 mt-10 text-center">Related Posts</h2>
            <div className="py-10 w-full flex overflow-x-auto">
              {categoryPosts.length > 0 ? (
                <>
                  {categoryPosts.map((post) => (
                    <div key={post?._id}>
                      {post._id !== postId && (
                        <div className="min-w-[250px] min-h-[300px] mx-[15%] md:mx-[25%] rounded-md shadow-md p-3 relative">
                          <img
                            src={post?.image?.asset?.url}
                            alt="category post header"
                            className="rounded-md shadow-md object-cover object-center max-h-[150px] min-h-[150px] w-full"
                          />
                          <p className="text-center m-3">{post?.title}</p>
                          <div className="flex justify-between items-center">
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
