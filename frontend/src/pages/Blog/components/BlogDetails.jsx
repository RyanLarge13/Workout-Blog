import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { singlePost } from "../../../client";
import { DotLoader } from "react-spinners";
import { client } from "../../../client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

const BlogDetails = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    singlePost(postId)
      .then((post) => {
        console.log(post);
        setPost(post[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section>
      {post ? (
        <section>
          <header className="p-5 pt-20 relative flex flex-col justify-center align-center bg-gradient-to-tr from-violet-500 to-purple-500 shadow-md rounded-md">
            <img
              src={post.image.asset.url}
              alt="post header"
              className="rounded-lg w-screen shadow-md"
            />
            <h1 className="text-4xl absolute text-white">{post.title}</h1>
            <div>
              <p>{new Date(post._createdAt).toLocaleDateString()}</p>
            </div>
          </header>
          <div>
            <p>{post.desc[0].children[0].text}</p>
          </div>
        </section>
      ) : (
        <section className="h-screen flex justify-center items-center">
          <DotLoader />
        </section>
      )}
    </section>
  );
};

export default BlogDetails;
