import { useState, useEffect, useContext } from "react";
import { ProfileContext } from "../../../context/profileContext.js";
import { useParams, Navigate } from "react-router-dom";
import { singlePost, getPersonalPosts, client } from "../../../client";
import { DotLoader } from "react-spinners";
import imageUrlBuilder from "@sanity/image-url";
import NewComment from "./NewComment";

const builder = imageUrlBuilder(client);

const BlogDetails = () => {
  const { profile } = useContext(ProfileContext);

  const [post, setPost] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    singlePost(postId)
      .then((post) => {
        console.log(post);
        setPost(post[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getPersonalPosts(post?.postedBy?._id)
      .then((res) => setUserPosts(res))
      .catch((err) => console.log(err));
  }, [post]);

  return (
    <section>
      {post ? (
        <>
          <section>
            <header className="p-5 pt-20 relative flex flex-col justify-center align-center bg-gradient-to-tr from-violet-500 to-purple-500 shadow-md rounded-md">
              <img
                src={post.image.asset.url}
                alt="post header"
                className="rounded-lg w-screen shadow-md"
              />
              <h1 className="text-4xl absolute text-white">{post.title}</h1>
              <div>
                <p className="p-1 my-1 rounded-md shadow-md bg-white max-w-max">
                  {new Date(post._createdAt).toLocaleDateString()}
                </p>
              </div>
            </header>
            <div className="p-2 my-5 border-b">
              <p>{post.desc[0].children[0].text}</p>
            </div>
          </section>
          <section className="my-5">
            {post.comments?.map((comment, index) => (
              <>
                <div
                  key={index}
                  className="flex justify-around items-center py-2 px-5 m-2 rounded-md shadow-md"
                >
                  <div className="rounded-full w-[50px] h-[50px] shadow-md overflow-hidden">
                    <img src={comment.postedBy.image} alt="user comment" />
                  </div>
                  <p className="max-w-[75%]">{comment.comment}</p>
                </div>
                <div className="p-1 mx-2 ml-10 rounded-md shadow-md">
                  <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
                </div>
              </>
            ))}
            <NewComment postId={postId} userId={profile._id} />
          </section>
          <section className="my-10 mt-[100px] p-2">
            <div className="flex flex-col items-center justify-start p-5 mx-2 rounded-md shadow-md relative bg-gradient-to-tr from-purple-400 to-violet-500">
              <div className="absolute top-[-50px]">
                <div className="rounded-full w-[100px] h-[100px] shadow-md  overflow-hidden">
                  <img
                    src={post.postedBy.image}
                    alt="user"
                    className="object-cover object-center"
                  />
                </div>
                <p className="text-center">{post.postedBy.name}</p>
              </div>
              <div className="mt-[100px] text-center mb-[200px]">
                <p>View More Posts by</p>
                <p>{post.postedBy.name}</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center translate-y-[-100px]">
              {userPosts.length > 0 ? (
                <>
                  {userPosts.map((userPost) => (
                    <div className="p-2 my-2 w-[70%] bg-white rounded-md shadow-md">
                      <h2>{userPost.title}</h2>
                    </div>
                  ))}
                </>
              ) : (
                <p>No Posts To Show</p>
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
