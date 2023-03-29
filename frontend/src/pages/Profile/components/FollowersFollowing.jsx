import { useState, useEffect } from "react";
import { getAllFollowing, getAllFollowers } from "../../../client.js";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const FollowersFollowing = ({ userId, newGradient }) => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [picker, setPicker] = useState(null);
  const [start, setStart] = useState(0);

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

  const checkToClose = (e) => {
    const end = e.clientY;
    if (end - start > window.innerHeight / 1.25) {
      setPicker(null);
      setFollowers([]);
      setFollowing([]);
    }
  };

  return (
    <motion.div
      style={
        newGradient
          ? {
              backgroundImage: `linear-gradient(to top right, violet, ${newGradient})`,
            }
          : { backgroundColor: "white" }
      }
      className="py-5 px-3 mx-2 my-5 rounded-md shadow-lg bg-gradient-to-r from-blue-400 to-violet-500 relative md:p-20"
    >
      <div className="flex justify-center items-center">
        <motion.button
          whileHover={{
            scale: 1.05,
            transition: { type: "spring", stiffness: 200 },
          }}
          onClick={() =>
            setPicker((prev) => (prev === "followers" ? null : "followers"))
          }
          className={`w-2/4 md:w-1/4 p-2 rounded-md shadow-md mx-1 md:mx-3 ${
            picker === "followers"
              ? "bg-violet-400 shadow-sm"
              : "bg-white shadow-md"
          }`}
        >
          Followers
        </motion.button>
        <motion.button
          whileHover={{
            scale: 1.05,
            transition: { type: "spring", stiffness: 200 },
          }}
          onClick={() =>
            setPicker((prev) => (prev === "following" ? null : "following"))
          }
          className={`w-2/4 md:w-1/4 p-2 rounded-md mx-1 md:mx-3 ${
            picker === "following"
              ? "bg-violet-400 shadow-sm"
              : "bg-white shadow-md"
          }`}
        >
          Following
        </motion.button>
      </div>
      {picker && (
        <motion.div
          initial={{ y: 1000 }}
          animate={{ y: 0 }}
          drag="y"
          dragSnapToOrigin="true"
          dragConstraints={{ top: 0 }}
          onDragStart={(e) => setStart(e.clientY)}
          onDragEnd={(e) => checkToClose(e)}
          className="fixed bg-white z-40 inset-0 rounded-md shadow-inner p-5 pt-20 overflow-y-auto"
        >
          <p>
            {picker === "followers"
              ? followers.length < 2
                ? "follower"
                : picker
              : picker}
          </p>
          {following?.length > 0 && (
            <>
              <p>{following.length}</p>
              <div className="mx-5">
                {following?.map((followee) => (
                  <div
                    key={followee?.userId}
                    className="rounded-md shadow-md w-full my-3"
                  >
                    <NavLink
                      to={`/users/${followee?.userId}`}
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
            </>
          )}
          {followers?.length > 0 && (
            <>
              <p>{followers.length}</p>
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
            </>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default FollowersFollowing;
