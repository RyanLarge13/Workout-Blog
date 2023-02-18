import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserInfo, getPersonalPosts } from "../../client";
import { elements, variants } from "../../styles/elements";
import UserPosts from "./components/UserPosts";

const UserProfile = () => {
  const [userView, setUserView] = useState(false);
  const [userPostsView, setUserPostsView] = useState(false);
  const [posts, setPosts] = useState([]);

  const { userId } = useParams();

  useEffect(() => {
    getUserInfo(userId)
      .then((user) => {
        setUserView(user[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const getUserBlogs = () => {
    getPersonalPosts(userView._id)
      .then((posts) => {
        setPosts(posts);
        setUserPostsView(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="py-20">
      <header className="flex justify-center items-center">
        <div>
          <div className="w-[200px] h-[200px] overflow-hidden rounded-full shadow-lg">
            <img src={userView.image} alt="user" className="object-cover" />
          </div>
          <p className="text-center mt-5 text-2xl">{userView.name}</p>
        </div>
      </header>
      <hr />
      {userPostsView ? (
        <UserPosts posts={posts} />
      ) : (
        <div className="flex flex-col justify-center items-center mt-10">
          <button
            onClick={() => getUserBlogs()}
            className={`${elements.button} ${variants.mainBtnBg} w-[150px]`}
          >
            Show Posts
          </button>
          <button
            className={`${elements.button} ${variants.mainBtnBg} w-[150px]`}
          >
            Message {userView.name}
          </button>
        </div>
      )}
    </section>
  );
};

export default UserProfile;
