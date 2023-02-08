import { useState, useEffect } from "react";
import { getPosts } from "../../../client.js";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const myPosts = getPosts()
      .then((post) => {
        setPosts(post);
      })
      .catch((err) => console.log(err));
  }, []);

  return;
  <section>
    {posts.length > 0 ? (
      posts.map((post, index) => (
        <div key={index}>
          <p>{post.author}</p>
        </div>
      ))
    ) : (
      <h1>You have no posts! Create one!</h1>
    )}
  </section>;
};

export default MyPosts;
