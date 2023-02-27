import { useState, useEffect, useContext } from "react";
import { client } from "../../../client.js";
import { getPersonalPosts, deleteMyPost } from "../../../client.js";
import { NavLink } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";
import { elements, variants } from "../../../styles/elements.js";
import { ProfileContext } from "../../../context/profileContext.js";
import Conformation from "../../../components/Conformation";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

const MyPosts = () => {
  const { profile } = useContext(ProfileContext);
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(null);
  const [confirm, setConfrim] = useState(false);

  useEffect(() => {
    getPersonalPosts(profile._id)
      .then((posts) => {
        setPosts(posts);
      })
      .catch((err) => console.log(err));
  }, []);

  const deletePost = () => {
    deleteMyPost(postId)
      .then((res) => {
        setConfrim(false);
        setPostId(null);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="flex flex-col items-center justify-center">
      {posts.length > 0 && <h1 className="text-2xl text-center">Your Posts</h1>}
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div
            key={index}
            className="rounded-lg shadow-lg p-5 my-5 min-w-[90%] mx-auto w-max relative"
          >
            <img
              src={urlFor(post?.image?.asset?._ref).width(300).url()}
              alt="blog image"
              className="max-h-[150px] min-w-full object-cover object-center rounded-md shadow-md"
            />
            <h2 className="text-xl my-2">{post.title}</h2>
            <div className="flex justify-between items-end pt-5">
              <button
                className={`py-1 px-2 h-max rounded-md bg-gradient-to-tr from-red-400 to-red-500`}
                onClick={() => {
                  setPostId(post?._id);
                  setConfrim(true);
                }}
              >
                Delete
              </button>
              <NavLink
                to={`/posts/${post._id}`}
                className={`${elements.button} ${variants.mainBtnBg} text-center mx-0 my-0`}
              >
                View
              </NavLink>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-2xl text-center">
          You have no posts! <br /> Create one!
        </h1>
      )}
      {confirm && (
        <Conformation
          displayToggle={(bool) => setConfrim(bool)}
          deleteFunc={() => deletePost()}
        />
      )}
    </section>
  );
};

export default MyPosts;
