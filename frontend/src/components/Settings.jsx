import { useState, useEffect, useContext } from "react";
import { SettingsContext } from "../context/settingsContext.js";
import { motion } from "framer-motion";
import colors from "../constants/colorPicker";

const Settings = ({ show }) => {
  const { settings, setSettings } = useContext(SettingsContext);
  const [rendered, setRendered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setRendered(true);
    if (settings) {
      setSelectedColor(settings.selectedColor);
      setDarkMode(settings.darkMode);
    }
    if (!settings) {
      const newSettings = {
        darkMode,
        selectedColor,
      };
      setSettings(newSettings);
      localStorage.setItem("settings", JSON.stringify(newSettings));
    }
  }, []);

  useEffect(() => {
    if (rendered) {
      const newSettings = {
        darkMode,
        selectedColor,
      };
      setSettings(newSettings);
      localStorage.setItem("settings", JSON.stringify(newSettings));
    }
  }, [darkMode, selectedColor]);

  return (
    <motion.section
      initial={{ y: "-100%", opacity: 0 }}
      animate={
        show
          ? {
              y: 0,
              opacity: 1,
            }
          : {
              y: "-100%",
              opacity: 0,
            }
      }
      className={`fixed inset-0 z-30 pt-10 ${
        darkMode ? "bg-[#281838] text-white" : "bg-white"
      }`}
    >
      <div className="my-10 flex flex-wrap justify-center items-center gap-3 p-2">
        {colors.map((color, index) => (
          <motion.div
            key={index}
            animate={color.color === selectedColor ? { scale: 1.25 } : {scale: 1}}
            onClick={() =>
              setSelectedColor((prev) =>
                prev === color.color ? "#00ffff" : color.color
              )
            }
            style={{ backgroundColor: color.color }}
            className={"w-[35px] h-[35px] rounded-full shadow-md duration-200"}
          ></motion.div>
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
