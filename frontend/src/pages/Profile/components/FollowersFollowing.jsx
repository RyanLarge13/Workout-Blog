import { useState, useEffect } from "react";
import { getAllFollowing, getAllFollowers } from "../../../client.js";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const FollowersFollowing = ({ userId }) => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [picker, setPicker] = useState(null);

  useEffect(() => {
    if (picker === "following") {
      getAllFollowing(userId)
        .then((res) => {
          setFollowers([]);
          setFollowing(res[0].follow);
        })
        .catch((err) => console.log(err));
    }
    if (picker === "followers") {
      getAllFollowers(userId)
        .then((res) => {
          setFollowing([]);
          setFollowers(res);
        })
        .catch((err) => console.log(err));
    }
  }, [picker]);

  return (
    <div className="py-5 px-3 mx-2 my-5 rounded-md shadow-lg bg-gradient-to-r from-blue-400 to-violet-500 relative">
      <div className="flex">
        <button
          onClick={() =>
            setPicker((prev) => (prev === "followers" ? null : "followers"))
          }
          className={`w-2/4 p-2 rounded-md shadow-md mx-1 ${
            picker === "followers"
              ? "bg-violet-400 shadow-sm"
              : "bg-white shadow-md"
          }`}
        >
          Followers
        </button>
        <button
          onClick={() =>
            setPicker((prev) => (prev === "following" ? null : "following"))
          }
          className={`w-2/4 p-2 rounded-md mx-1 ${
            picker === "following"
              ? "bg-violet-400 shadow-sm"
              : "bg-white shadow-md"
          }`}
        >
          Following
        </button>
      </div>
      {picker && (
        <motion.div
          initial={{ y: 1000 }}
          animate={{ y: 0 }}
          className="fixed bg-white z-1 bottom-0 left-0 w-full min-h-[40%] rounded-md shadow-inner p-5 overflow-y-auto"
        >
          {following?.length > 0 && (
            <div className="mx-5">
              {following?.map((followee) => (
                <div
                  key={followee?.userId}
                  className="rounded-md shadow-md w-full my-3"
                >
                  <NavLink
                    to={`/users/${followee?._id}`}
                    className="flex justify-between items-center p-5"
                  >
                    <img
                      src={followee?.postedBy?.image}
                      alt="user"
                      className="w-[50px] h-[50px] rounded-full shadow-ms object-cover object-center"
                    />
                    <p>{followee?.postedBy?.name}</p>
                  </NavLink>
                </div>
              ))}
            </div>
          )}
          {followers?.length > 0 && (
            <div className="mx-5">
              {followers?.map((follower) => (
                <div
                  key={follower?._id}
                  className="rounded-md shadow-md w-full my-3"
                >
                  <NavLink
                    to={`/users/${follower._id}`}
                    className="flex justify-between items-center p-5"
                  >
                    <img
                      src={follower?.image}
                      alt="user"
                      className="w-[50px] h-[50px] rounded-full shadow-ms object-cover object-center"
                    />
                    <p>{follower?.name}</p>
                  </NavLink>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default FollowersFollowing;
