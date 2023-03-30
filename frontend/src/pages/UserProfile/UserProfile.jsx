import { useEffect, useState, useContext } from "react";
import { ProfileContext } from "../../context/profileContext.js";
import { useParams, NavLink } from "react-router-dom";
import {
  getUserInfo,
  getPersonalPosts,
  updateFollowers,
  followUser,
  unfollowUser,
  client,
} from "../../client";
import { elements, variants } from "../../styles/elements";
import { DotLoader } from "react-spinners";
import { AiTwotoneMessage } from "react-icons/ai";
import { RiUserFollowLine, RiUserFollowFill } from "react-icons/ri";
import imageUrlBuilder from "@sanity/image-url";

const UserProfile = () => {
  const { profile } = useContext(ProfileContext);

  const [loading, setLoading] = useState(false);
  const [userView, setUserView] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const [following, setFollowing] = useState(null);

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
    if (userView) {
      updateFollowers(profile._id)
        .then((res) => {
          update(res);
        })
        .catch((err) => console.log(err));
    }
  }, [userView]);

  const newFollow = () => {
    setLoading(true);
    followUser(profile._id, userView._id)
      .then((res) => {
        updateFollowers(profile._id)
          .then((res) => {
            update(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const unfollow = () => {
    setLoading(true);
    unfollowUser(userView._id, profile._id)
      .then((res) => {
        updateFollowers(profile._id)
          .then((res) => {
            update(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const update = (res) => {
    const filter = res[0].follow.filter((user) => user.userId === userView._id);
    setFollowing(filter.length > 0);
    setLoading(false);
  };

  return (
    <section className="pt-20">
      {userView && (
        <>
          <header className="flex justify-center items-center rounded-b-md shadow-md">
            <div className="absolute top-0 h-[200px] w-full bg-gradient-to-r from-blue-400 to-violet-500 rounded-md shadow-lg">
              {userView?.headerImage && (
                <img
                  src={urlFor(userView.headerImage).url()}
                  alt="header"
                  className="w-full h-full object-cover object-center rounded-lg"
                />
              )}
            </div>
            <div className="w-full">
              <img
                src={userView?.image}
                alt="user"
                className="w-[200px] h-[200px] rounded-full shadow-lg mx-auto isolate object-cover object-center"
              />
              <p className="text-center mt-3 text-2xl">{userView?.name}</p>
              <div className="min-h-[100px]">
                <p className="text-xs text-center mt-5 mx-4 md:text-lg xl:text-xl xl:w-[50%] xl:mx-auto">
                  {userView?.bio}
                </p>
              </div>
              {userView?._id !== profile._id && (
                <div className="flex justify-around items-center py-3 mt-5">
                  <button
                    className={`${elements.button} ${variants.mainBtnBg} flex flex-col items-center justify-center`}
                  >
                    {following ? (
                      <>
                        {loading ? (
                          <DotLoader size={35} />
                        ) : (
                          <>
                            <RiUserFollowFill onClick={() => unfollow()} />
                            <p>Following</p>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {loading ? (
                          <DotLoader size={35} />
                        ) : (
                          <>
                            <RiUserFollowLine onClick={() => newFollow()} />
                            <p>Follow</p>
                          </>
                        )}
                      </>
                    )}
                  </button>
                  <button
                    className={`${elements.button} ${variants.mainBtnBg} flex flex-col items-center justify-center`}
                  >
                    <AiTwotoneMessage />
                    <p>Message</p>
                  </button>
                </div>
              )}
            </div>
          </header>
          <div className="py-5 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {userPosts &&
              userPosts.map((post) => (
                <div
                  key={post?._id}
                  className="max-w-full m-5 p-2 rounded-md shadow-md"
                >
                  <img
                    src={urlFor(post?.image?.asset?.url).url()}
                    alt="post header image"
                    className="w-full max-h-[150px] rounded-md shadow-md object-cover object-center"
                  />
                  <NavLink to={`/posts/${post?._id}`}>
                    <h2 className="text-center m-3">{post?.title}</h2>
                  </NavLink>
                </div>
              ))}
          </div>
        </>
      )}
    </section>
  );
};

export default UserProfile;
