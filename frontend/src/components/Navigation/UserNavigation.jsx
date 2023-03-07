import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { ProfileContext } from "../../context/profileContext";
import { googleLogout } from "@react-oauth/google";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { containers } from "../../styles/containers";
import { elements, variants } from "../../styles/elements";
import { navAni } from "../../variants/variants.js";
import { BsArrowDownCircleFill } from "react-icons/bs";
import { BiLogOutCircle } from "react-icons/bi";

const UserNavigation = () => {
  const { setUser } = useContext(UserContext);
  const { profile, setProfile } = useContext(ProfileContext);
  const [nav, setNav] = useState(false);

  const navigate = useNavigate();

  const logout = async () => {
    localStorage.removeItem("authToken");
    await setUser(false);
    await setProfile(false);
    googleLogout();
    navigate("/");
  };

  return (
    <motion.nav
      initial="hidden"
      animate={nav ? "show" : "hidden"}
      variants={navAni}
      className={`${containers.nav}`}
    >
      <ul className="flex justify-center aling-center flex-col w-full list-none ml-0">
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
        <li>
          <NavLink
            onClick={() => setNav(false)}
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? `${variants.navBtnActive}`
                : `${elements.navBtn} ${variants.mainBtnBg}`
            }
          >
            DashBoard
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={() => setNav(false)}
            to="/blogs"
            className={({ isActive }) =>
              isActive
                ? `${variants.navBtnActive}`
                : `${elements.navBtn} ${variants.mainBtnBg}`
            }
          >
            Blogs
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            onClick={() => setNav(false)}
            className={({ isActive }) =>
              isActive
                ? `${variants.navBtnActive}`
                : `${elements.navBtn} ${variants.mainBtnBg}`
            }
          >
            Profile
          </NavLink>
        </li>
      </ul>
      <li className="absolute left-5 list-none">
        <NavLink
          onClick={() => logout()}
          className={({ isActive }) =>
            isActive
              ? `${variants.navBtnActive}`
              : `${elements.navBtn} ${variants.mainBtnBg}`
          }
        >
          <BiLogOutCircle />
        </NavLink>
      </li>
      <div className="absolute flex flex-col items-center justify-center top-0 right-0 rounded-md text-white p-3">
        <NavLink to={`/profile`} onClick={() => setNav(false)}>
          <img
            src={profile?.image}
            alt="user"
            className="w-[50px] h-[50px] rounded-full mb-2"
          />
        </NavLink>
        <p>{profile.name}</p>
      </div>
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
  );
};

export default UserNavigation;
