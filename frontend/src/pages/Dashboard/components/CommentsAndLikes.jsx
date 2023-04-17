import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../../context/profileContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CommentsAndLikes = ({ data, open, dataType }) => {
  const { profile } = useContext(ProfileContext);

  const navigate = useNavigate();

  const [start, setStart] = useState(0);

  const checkToClose = (e) => {
    const end = e.clientY;
    if (end - start > window.innerHeight / 1.25) {
      open(false);
    }
  };

  return (
    <motion.div
      initial={{ y: 1000 }}
      animate={{ y: 0 }}
      drag="y"
      dragSnapToOrigin="true"
      dragConstraints={{ top: 0 }}
      onDragStart={(e) => setStart(e.clientY)}
      onDragEnd={(e) => checkToClose(e)}
      className="fixed inset-0 bg-white pt-20 px-5 overflow-y-auto"
    >
      <h2>{dataType}</h2>
      <p>{data?.length}</p>
      {data ? (
        data.map((interaction, index) => (
          <div key={index}>
            {interaction?.postedBy?._id !== profile._id && (
              <div
                onClick={() => navigate(`/users/${interaction.postedBy._id}`)}
                className={`py-3 px-5 rounded-md shadow-md my-5`}
              >
                <div
                  className={`flex justify-between items-center ${
                    dataType === "comments"
                      ? "shadow-md mb-3 p-2 rounded-md"
                      : ""
                  }`}
                >
                  <img
                    src={interaction.postedBy.image}
                    alt="user"
                    className="rounded-full w-[50px] h-[50px] shadow-md"
                  />
                  <p className={dataType === "comments" ? "ml-3 mr-5" : ""}>
                    {interaction.postedBy.name}
                  </p>
                </div>
                {dataType === "comments" && <p>{interaction.comment}</p>}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No {dataType} On This Post</p>
      )}
    </motion.div>
  );
};

export default CommentsAndLikes;
