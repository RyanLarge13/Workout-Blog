import { useState, useEffect } from "react";
import { getAllFollowing, getAllFollowers } from "../../../client.js";

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
    <div>
      <div className="flex mx-5">
        <button
          onClick={() => setPicker("followers")}
          className={`w-2/4 p-2 rounded-md shadow-md mx-1 ${
            picker === "followers"
              ? "bg-violet-400 shadow-sm"
              : "bg-white shadow-md"
          }`}
        >
          Followers
        </button>
        <button
          onClick={() => setPicker("following")}
          className={`w-2/4 p-2 rounded-md mx-1 ${
            picker === "following"
              ? "bg-violet-400 shadow-sm"
              : "bg-white shadow-md"
          }`}
        >
          Following
        </button>
      </div>
      <div>
        {following?.length > 0 && (
          <div>
            {following?.map((followee) => (
              <div key={followee?.userId}>
                <p>{followee?.postedBy?.name}</p>
              </div>
            ))}
          </div>
        )}
        {followers?.length > 0 && (
          <div>
            {followers?.map((follower) => (
              <div key={follower?._id}>
                <p>{follower?.name}</p>
                <p>Follower</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowersFollowing;
