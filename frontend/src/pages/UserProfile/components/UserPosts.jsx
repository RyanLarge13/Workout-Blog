import { useEffect } from "react";
import { client } from "../../../client";
import imageUrlBuilder from "@sanity/image-url";
import { elements, variants } from "../../../styles/elements";
import { NavLink } from "react-router-dom";

const UserPosts = ({ posts }) => {
  const builder = imageUrlBuilder(client);
  function urlFor(source) {
    return builder.image(source);
  }
  useEffect(() => {
    console.log(posts);
  }, []);

  return (
    <section className="flex flex-col justify-start items-center">
      {posts.map((post) => (
        <div key={post._id} className="m-5 rounded-md shadow-md p-5">
          <img
            src={urlFor(post.image.asset._ref).width(300).url()}
            alt="post image"
            className="rounded-md shadow-md"
          />
          <h1>{post.title}</h1>
          <p>{new Date(post._createdAt).toLocaleDateString()}</p>
          <p>
            Last Updated On: {new Date(post._updatedAt).toLocaleDateString()}
          </p>
          <NavLink to={`/posts/${post._id}`}>
            <button className={`${elements.button} ${variants.mainBtnBg} mb-0`}>
              View
            </button>
          </NavLink>
        </div>
      ))}
    </section>
  );
};

export default UserPosts;
