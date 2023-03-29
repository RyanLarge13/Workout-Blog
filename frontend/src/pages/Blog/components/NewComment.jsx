import { useState } from "react";
import { addComment } from "../../../client.js";
import { BounceLoader } from "react-spinners";
import { elements, variants } from "../../../styles/elements.js";

const NewComment = ({ postId, userId, callRefresh }) => {
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

  const submitComment = (e) => {
    e.preventDefault();
    setLoading(true);
    addComment(postId, userId, commentText)
      .then((res) => {
        setLoading(false);
        setCommentText("");
        callRefresh();
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className="p-5 my-5 shadow-lg rounded-md flex flex-col items-center justify-center w-full">
      <label className="hidden">Comment</label>
      <input
        type="text"
        placeholder="New Comment"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className={`${elements.input}`}
      />
      {loading ? (
        <BounceLoader color="#0b0" />
      ) : (
        <button
          type="submit"
          onClick={submitComment}
          className={`${elements.button} bg-gradient-to-tr from-green-300 to-green-500`}
        >
          Post
        </button>
      )}
    </form>
  );
};

export default NewComment;
