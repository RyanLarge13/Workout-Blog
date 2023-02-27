import { useEffect, useState, useContext } from "react";
import { ProfileContext } from "../../context/profileContext.js";
import { useParams } from "react-router-dom";
import {
  getUserInfo,
  getPersonalPosts,
  followUser,
  unfollowUser,
  client,
} from "../../client";
import { elements, variants } from "../../styles/elements";
import { AiTwotoneMessage } from "react-icons/ai";
import { RiUserFollowLine, RiUserFollowFill } from "react-icons/ri";
import imageUrlBuilder from "@sanity/image-url";

const UserProfile = () => {
  const { profile } = useContext(ProfileContext);

  const [userView, setUserView] = useState({});
  const [userPosts, setUserPosts] = useState(null);
  const [following, setFollowing] = useState({});

  const { userId } = useParams();

  const builder = imageUrlBuilder(client);
  function urlFor(source) {
    return builder.image(source);
  }

  useEffect(() => {
    getUserInfo(userId)
      .then((user) => {
        setUserView(user[0]);
      })
      .catch((err) => console.log(err));
    getPersonalPosts(userId)
      .then((res) => {
        setUserPosts(res);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const filter = profile.follow?.filter(
      (follower) => follower.userId === userView._id
    );
    setFollowing(filter);
  }, [userView]);

  const newFollow = () => {
    followUser(profile._id, userView._id)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const unfollow = () => {
    unfollowUser(following[0]._key, profile._id)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="pt-20">
      <header className="flex justify-center items-center rounded-b-md shadow-md">
        <div className="absolute top-0 h-[200px] w-full bg-gradient-to-r from-blue-400 to-violet-500 rounded-md shadow-lg">
          {userView.headerImage && (
            <img
              src={urlFor(userView.headerImage).url()}
              alt="header"
              className="w-full h-full object-cover object-center rounded-lg"
            />
          )}
        </div>
        <div className="w-full">
          <img
            src={userView.image}
            alt="user"
            className="w-[200px] h-[200px] rounded-full shadow-lg mx-auto isolate object-cover object-center"
          />
          <p className="text-center mt-3 text-2xl">{userView.name}</p>
          <div className="min-h-[100px]">
            <p className="text-xs text-center mt-5 mx-4">{userView.bio}</p>
          </div>
          {userView._id !== profile._id && (
            <div className="flex justify-around items-center py-3 mt-5">
              <button
                className={`${elements.button} ${variants.mainBtnBg} flex justify-center`}
              >
                {following?.length > 0 ? (
                  <RiUserFollowFill onClick={() => unfollow()} />
                ) : (
                  <RiUserFollowLine onClick={() => newFollow()} />
                )}
              </button>
              <button
                className={`${elements.button} ${variants.mainBtnBg} flex justify-center`}
              >
                <AiTwotoneMessage />
              </button>
            </div>
          )}
        </div>
      </header>
      <div>
        {userPosts &&
          userPosts.map((post) => {
            <div
              key={post?._id}
              className="w-full mx-5 p-2 rounded-md shadow-md"
            >
              <img
                src={urlFor(post?.image?.asset?._ref).url()}
                alt="post header image"
                className="w-full max-h-[150px] rounded-md shadow-md object-cover object-center m-2"
              />
              <h2>{post.title}</h2>
            </div>;
          })}
      </div>
    </section>
  );
};

export default UserProfile;
