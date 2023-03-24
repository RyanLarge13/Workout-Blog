import { useState } from "react";
import { updateBio } from "../../../client.js";
import { motion } from "framer-motion";
import { elements, variants } from "../../../styles/elements.js";

const Bio = ({ bioText, id, func }) => {
  const [bio, setBio] = useState(bioText);

  const submitBio = () => {
    updateBio(id, bio)
      .then((res) => {
        func(false);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="fixed inset-0 bg-[rgba(0,0,0,0.4)] z-50 flex justify-center items-end"
    >
      <motion.div
        initial={{ y: 100 }}
        whileInView={{ y: 0 }}
        className="mb-5 p-5 rounded-md bg-white w-[90%] md:w-[50%]"
      >
        <textarea
          type="text"
          value={bio}
          maxLength="200"
          onChange={(e) => setBio(e.target.value)}
          className="w-full min-h-[300px] p-2 outline-none shadow-md rounded-md text-center md:p-5"
        ></textarea>
        <div className=" flex justify-around mt-5">
          <button
            onClick={submitBio}
            className={`${elements.button} bg-gradient-to-r from-green-400 to-green-500`}
          >
            Save
          </button>
          <button
            onClick={() => func(false)}
            className={`${elements.button} bg-gradient-to-r from-red-500 to-red-400`}
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Bio;
