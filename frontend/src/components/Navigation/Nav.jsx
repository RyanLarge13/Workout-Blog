import { useState, useContext, useEffect } from "react";
import { ProfileContext } from "../../context/profileContext.js";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi";
import { containers } from "../../styles/containers";
import { elements, variants } from "../../styles/elements";
import { navAni } from "../../variants/variants.js";
import { BsArrowDownCircleFill } from "react-icons/bs";
import UserNavigation from "./UserNavigation";

const Nav = ({setToken}) => {
  const { profile } = useContext(ProfileContext);

  const [nav, setNav] = useState(false);

  return (
    <>
      {profile ? (
        <UserNavigation setToken={setToken} />
      ) : (
        <motion.nav
          initial="hidden"
          animate={nav ? "show" : "hidden"}
          variants={navAni}
          className={`${containers.nav} bg-gradient-to-r from-violet-500 to-blue-500`}
        >
          <ul className="flex justify-center items-center flex-col w-full list-none ml-0">
            <li>
              <NavLink
                onClick={() => setNav(false)}
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
          </ul>
          <li className="absolute right-5 list-none">
            <NavLink
              onClick={() => setNav(false)}
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? `${variants.navBtnActive} min-w-[50px]`
                  : `${elements.navBtn} ${variants.mainBtnBg} min-w-[50px]`
              }
            >
              <BiLogInCircle />
            </NavLink>
          </li>
          <div
            onClick={() => {
              nav ? setNav(false) : setNav(true);
            }}
            className={`absolute left-[50%] translate-x-[-50%] bg-white px-10 py-3 hover:cursor-pointer rounded-md ${
              nav ? "bottom-0" : "bottom-[-25px]"
            } shadow-lg`}
          >
            <BsArrowDownCircleFill
              className={`${nav ? "rotate-180" : "rotate-0"}`}
            />
          </div>
        </motion.nav>
      )}
    </>
  );
};

export default Nav;
