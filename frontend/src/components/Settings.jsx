import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import colors from "../constants/colorPicker";

const Settings = ({ show }) => {
  const [rendered, setRendered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setRendered(true);
    const storage = localStorage.getItem("settings");
    if (storage) {
      const parsedSettings = JSON.parse(storage);
      setSelectedColor(parsedSettings.selectedColor);
      setDarkMode(parsedSettings.darkMode);
    }
    if (!storage) {
      const newSettings = {
        darkMode,
        selectedColor,
      };
      localStorage.setItem("settings", JSON.stringify(newSettings));
    }
  }, []);

  useEffect(() => {
    if (rendered) {
      const newSettings = {
        darkMode,
        selectedColor,
      };
      localStorage.setItem("settings", JSON.stringify(newSettings));
    }
  }, [darkMode, selectedColor]);

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
      className={`fixed inset-0 z-30 pt-10 ${
        darkMode ? "bg-[#281838] text-white" : "bg-white"
      }`}
    >
      <div className="my-10 flex flex-wrap justify-center items-center gap-2 p-2">
        {colors.map((color, index) => (
          <div
            key={index}
            onClick={() => setSelectedColor(color.color)}
            className={`${
              color.color === selectedColor && "outline outline-gray-300"
            } ${
              color.color
            } w-[50px] h-[50px] rounded-full shadow-md duration-200`}
          ></div>
        ))}
      </div>
      <div>
        <div className="flex justify-between items-center mx-5 gap-5 px-5">
          <p>Dark Mode</p>
          <div
            onClick={() => setDarkMode((prev) => !prev)}
            className="w-[50px] h-[25px] rounded-full shadow-md relative bg-white"
          >
            <div
              className={`rounded-full top-0 bottom-0 absolute duration-200 ${
                darkMode
                  ? "right-0 left-[50%] bg-green-300"
                  : "left-0 right-[50%] bg-red-300"
              }`}
            ></div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Settings;
