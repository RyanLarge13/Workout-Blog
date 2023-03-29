import { motion } from "framer-motion";

const CommentsAndLikes = ({ data, open }) => {
  const checkToClose = (e, info) => {
    if (info.point.y > window.innerHeight) {
      open(false);
    }
  };

  return (
    <motion.div
      initial={{ y: 1000 }}
      animate={{ y: 0 }}
      drag="y"
      dragSnapToOrigin="true"
      onDragEnd={(e, info) => checkToClose(e, info)}
      className="fixed inset-0 bg-white pt-20"
    >
      {data ? (
        data.map((interaction) => <div>{interaction?.postedBy?.name}</div>)
      ) : (
        <p>No Likes Or Comments On This Post</p>
      )}
    </motion.div>
  );
};

export default CommentsAndLikes;
