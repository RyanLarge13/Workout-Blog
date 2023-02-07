import { useContext } from "react";
import { ProfileContext } from "../../context/profileContext.js";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi";
import { containers } from "../../styles/containers";
import { elements, variants } from "../../styles/elements";
import { BsArrowDownCircleFill } from "react-icons/bs";
import UserNavigation from "./UserNavigation";

const Nav = () => {
  const { profile, setProfile } = useContext(ProfileContext);

  return (
    <>
      {profile ? (
        <UserNavigation />
      ) : (
        <motion.nav
          initial={{ y: "-75%" }}
          whileHover={{ y: 0 }}
          className={`${containers.nav}`}
        >
          <ul className="flex w-full">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? `${variants.navBtnActive}`
                    : `${elements.navBtn} ${variants.mainBtnBg}`
                }
              >
                Home
              </NavLink>
            </li>
            <li className="absolute right-5">
              <NavLink
                to="/login"
                className={`${elements.navBtn} ${variants.mainBtnBg}`}
              >
                <BiLogInCircle />
              </NavLink>
            </li>
          </ul>
          <div className="absolute bottom-[-25%] left-[50%] translate-x-[-50%] bg-white px-10 py-3 hover:cursor-pointer rounded-md">
            <BsArrowDownCircleFill />
          </div>
        </motion.nav>
      )}
    </>
  );
};

export default Nav;
