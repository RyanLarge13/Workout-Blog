import { useState, useEffect, useContext } from "react";
import { client } from "../../../client.js";
import { getPersonalPosts } from "../../../client.js";
import { NavLink } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";
import { elements, variants } from "../../../styles/elements.js";
import { ProfileContext } from "../../../context/profileContext.js";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

const MyPosts = () => {
  const { profile, setProfile } = useContext(ProfileContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPersonalPosts(profile.name)
      .then((post) => {
        setPosts(post);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="px-10 flex flex-col items-center justify-center">
      {posts.length > 1 && <h1 className="text-2xl text-center">Your Posts</h1>}
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={index} className="rounded-lg shadow-lg p-5 my-5">
            <img
              src={urlFor(post.mainImage.asset._ref).width(300).url()}
              alt="blog image"
              className="rounded-md"
            />
            <h2 className="text-xl my-2">{post.title}</h2>
            <div className="flex justify-between items-end pt-5">
              <button
                className={`py-1 px-2 h-max rounded-md bg-gradient-to-tr from-red-400 to-red-500`}
              >
                Delete
              </button>
              <NavLink
                to={"/post" + post.slug.current}
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
    </section>
  );
};

export default MyPosts;
