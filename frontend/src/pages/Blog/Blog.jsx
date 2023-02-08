import { client, getPosts } from "../../client.js";
import { useState, useEffect } from "react";
import { DotLoader } from "react-spinners";

const Blog = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchedPosts = getPosts();
    fetchedPosts
      .then((post) => {
        setPosts(post);
      })
      .catch((err) => console.log(err));
    // setPosts(fetchedPosts);
  }, []);

  return (
    <>
      {posts ? (
        <section>
          {posts.map((post, index) => (
            <div key={index}>
              <h2>{post.title}</h2>
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
