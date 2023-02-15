import { motion } from "framer-motion";
import { useContext } from "react";
import { ProfileContext } from "../context/profileContext";
import { elements } from "../styles/elements";

const Conformation = ({ displayToggle, deleteFunc }) => {
  const { profile } = useContext(ProfileContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex justify-center items-end"
    >
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="p-4 py-5 mb-5 bg-white max-h-[500px] w-[300px] rounded-lg shadow-lg bottom-2"
      >
        <p className="text-center">Are you sure??</p>
        <div className="mt-5 flex justify-around align-center">
          <button
            onClick={() => deleteFunc(profile._id)}
            className={`${elements.button} bg-red-400`}
          >
            Yes
          </button>
          <button
            onClick={() => displayToggle(false)}
            className={`${elements.button} bg-gradient-to-tr from-green-400 to-blue-300`}
          >
            No
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Conformation;
