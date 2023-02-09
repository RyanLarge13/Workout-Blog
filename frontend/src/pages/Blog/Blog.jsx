import { getPosts, client } from "../../client.js";
import { useState, useEffect } from "react";
import { DotLoader } from "react-spinners";
import { NavLink } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";
import { elements, variants } from "../../styles/elements.js";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

const Blog = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchedPosts = getPosts();
    fetchedPosts
      .then((post) => {
        setPosts(post);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {posts ? (
        <section className="py-20">
          {posts.map((post, index) => (
            <div
              key={index}
              className="rounded-lg shadow-lg p-5 my-5 mx-auto w-max"
            >
              <img
                src={urlFor(post.mainImage.asset._ref).width(300).url()}
                alt="blog image"
                className="rounded-md"
              />
              <h2 className="text-xl my-2">{post.title}</h2>
              <div className="flex justify-between items-end pt-5">
                <NavLink
                  to={"/post/" + post.slug.current}
                  className={`${elements.button} ${variants.mainBtnBg} text-center mx-0 my-0`}
                >
                  View
                </NavLink>
              </div>
              <p className="p-1 mt-2">
                {new Date(post._createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </section>
      ) : (
        <DotLoader />
      )}
    </>
  );
};

export default Blog;
