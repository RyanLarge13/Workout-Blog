import { getPosts, client, getCatagoryPosts } from "../../client.js";
import { useState, useEffect } from "react";
import { DotLoader } from "react-spinners";
import { NavLink, useParams } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";
import { elements, variants } from "../../styles/elements.js";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

const Blog = () => {
  const [posts, setPosts] = useState(null);
  const [search, setSearch] = useState("");
  const { catagoryId } = useParams();

  useEffect(() => {
    if (catagoryId) {
      getCatagoryPosts(catagoryId)
        .then((posts) => setPosts(posts))
        .catch((err) => console.log(err));
    } else {
      getPosts()
        .then((post) => {
          setPosts(post);
          console.log(post);
        })
        .catch((err) => console.log(err));
    }
  }, [catagoryId]);

  const queryTitle = () => {};

  return (
    <>
      {posts ? (
        <section className="py-10">
          <div className="flex justify-center align-center">
            <label htmlFor="search" className="hidden">
              Search
            </label>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              className={`${elements.input}`}
              onChange={() => queryTitle()}
            />
          </div>
          {posts.map((post, index) => (
            <div
              key={index}
              className="rounded-lg shadow-lg p-5 my-5 mx-auto w-max"
            >
              <img
                src={urlFor(post.image.asset.url).width(300).url()}
                alt="blog image"
                className="rounded-md"
              />
              <h2 className="text-xl my-2">{post.title}</h2>
              <div className="flex justify-between align-center mt-5">
                <div className="flex flex-col items-center justify-center">
                  <NavLink
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
                    className="rounded-full w-[40px] h-40px]"
                  />
                  <p>{post.postedBy.name}</p>
                </div>
              </div>
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
