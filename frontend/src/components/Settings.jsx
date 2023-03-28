import { useState, useEffect, useContext } from "react";
import { ProfileContext } from "../context/profileContext.js";
import { motion } from "framer-motion";
import colors from "../constants/colorPicker";

const Settings = ({ show, setShow }) => {
  const { profile } = useContext(ProfileContext);

  const [settings, setSettings] = useState(
    localStorage.getItem("settings") ? localstorage.getItem("settings") : {}
  );
  const [darkMode, setDarkMode] = useState(false);

  return (
    <motion.section
      initial={{ y: -5000, opacity: 0 }}
      animate={
        show
          ? {
              y: 0,
              opacity: 1,
              transition: { duration: 0.1, type: "spring", stiffness: 50 },
            }
          : { y: -5000, opacity: 0, transition: { duration: 0.75 } }
      }
      className="fixed inset-0 bg-white z-30 pt-10"
    >
      <div className="my-10 flex flex-wrap justify-center items-center gap-2 p-2">
        {colors.map((color) => (
          <div
            className={`${color.color} w-[50px] h-[50px] rounded-full shadow-md`}
          ></div>
        ))}
      </div>
      <div>
        <div className="flex justify-between items-center mx-5 px-5">
          <p>Dark Mode</p>
          <div className="w-[50px] h-[25px] rounded-full shadow-md relative bg-white">
            <div className="absolute left-0 top-0 bottom-0 right-[50%] rounded-full bg-red-300"></div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Settings;
