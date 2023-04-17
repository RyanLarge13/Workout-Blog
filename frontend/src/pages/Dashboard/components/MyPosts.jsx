import { useState, useEffect, useContext } from "react";
import { client } from "../../../client.js";
import { getPersonalPosts, deleteMyPost } from "../../../client.js";
import { NavLink } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";
import { elements, variants } from "../../../styles/elements.js";
import { AiOutlineComment } from "react-icons/ai";
import { RiHeartsFill } from "react-icons/ri";
import { ProfileContext } from "../../../context/profileContext.js";
import { SettingsContext } from "../../../context/settingsContext.js";
import Conformation from "../../../components/Conformation";
import CommentsAndLikes from "./CommentsAndLikes";

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

const MyPosts = () => {
  const { profile } = useContext(ProfileContext);
  const { settings } = useContext(SettingsContext);

  const [darkMode, setDarkMode] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(null);
  const [confirm, setConfrim] = useState(false);
  const [showCommentsAndLikes, setShowCommentsAndLikes] = useState(false);
  const [postInteractions, setPostInteractions] = useState(null);
  const [dataType, setDataType] = useState(null);

  useEffect(() => {
    if (settings) {
      setDarkMode(settings.darkMode);
    }
  }, [settings]);

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

  const formatTime = (date) => {
    if (date === null || date === undefined) {
      return "Try Refreshing Again";
    }
    let duration = (date - new Date()) / 1000;
    for (let i = 0; i < DIVISIONS.length; i++) {
      const division = DIVISIONS[i];
      if (Math.abs(duration) < division.amount) {
        return formatter.format(Math.round(duration), division.name);
      }
      duration /= division.amount;
    }
  };

  const showInteractions = (interactions) => {
    setPostInteractions(interactions);
    setShowCommentsAndLikes(true);
  };

  return (
    <section className="flex flex-col items-center justify-center">
      {showCommentsAndLikes && (
        <CommentsAndLikes
          data={postInteractions}
          open={setShowCommentsAndLikes}
          dataType={dataType}
        />
      )}
      {posts.length > 0 && (
        <h1
          className={`${
            darkMode ? "text-white" : "text-black"
          } mt-10 text-2xl text-center whitespace-nowrap`}
        >
          Your Posts
        </h1>
      )}
      {posts.length > 0 ? (
        <div
          className={`grid gap-5 content-center justify-items-center md:grid-cols-2 lg:grid-cols-4`}
        >
          {posts.map((post) => (
            <div
              key={post._id}
              className={`${
                darkMode ? "bg-gray-300" : "bg-white"
              } rounded-lg shadow-lg p-5 my-5 mx-auto`}
            >
              <img
                src={
                  post?.image?.asset?.url &&
                  urlFor(post?.image?.asset?.url).width(300).url()
                }
                alt="blog"
                className="max-h-[150px] min-w-[300px] max-w-[300px] object-cover object-center rounded-md shadow-md md:max-h-[300px]"
              />
              <h2 className="text-xl my-2">{post.title}</h2>
              <p className="text-xs">
                published {formatTime(new Date(post?._createdAt))}
              </p>
              <p className="text-xs">
                last updated {formatTime(new Date(post?.publishedAt))}
              </p>
              <div className="flex justify-between items-center my-3">
                <div
                  onClick={() => {
                    setDataType("likes");
                    showInteractions(
                      post.save
                        ? post.save.filter(
                            (save) => save.postedBy._id !== profile._id
                          )
                        : null
                    );
                  }}
                  className="flex justify-center items-center"
                >
                  <RiHeartsFill className="mr-2" />
                  <p>
                    {post?.save?.length
                      ? post.save.filter(
                          (save) => save.postedBy._id !== profile._id
                        ).length
                      : 0}
                  </p>
                </div>
                <div
                  onClick={() => {
                    setDataType("comments");
                    showInteractions(
                      post?.comments
                        ? post.comments.filter(
                            (comment) => comment.postedBy._id !== profile._id
                          )
                        : null
                    );
                  }}
                  className="flex justify-center items-center"
                >
                  <AiOutlineComment className="mr-2" />
                  <p>
                    {post?.comments?.length
                      ? post.comments.filter(
                          (comment) => comment.postedBy._id !== profile._id
                        ).length
                      : 0}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-end pt-3">
                <button
                  className={`py-1 px-2 h-max rounded-md ${variants.dangerBtn}`}
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
          ))}
        </div>
      ) : (
        <h1 className=" mt-10 text-2xl text-center">
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
