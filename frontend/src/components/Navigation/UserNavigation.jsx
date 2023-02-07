import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { ProfileContext } from "../../context/profileContext";
import { googleLogout } from "@react-oauth/google";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { containers } from "../../styles/containers";
import { elements, variants } from "../../styles/elements";
import { navAni } from "../../variants/variants.js";
import { BsArrowDownCircleFill } from "react-icons/bs";

const UserNavigation = () => {
  const { user, setUser } = useContext(UserContext);
  const { profile, setProfile } = useContext(ProfileContext);
  const [nav, setNav] = useState(false);

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(false);
    setProfile(false);
    googleLogout();
  };

  return (
    <motion.nav
      initial="hidden"
      animate={nav ? "show" : "hidden"}
      variants={navAni}
      className={`${containers.nav}`}
    >
      <ul>
        <li>
          <Link to="/dashboard">DashBoard</Link>
        </li>
        <li>
          <Link to="/blogs">Blogs</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/logout" onClick={() => logout()}>
            Logout
          </Link>
        </li>
      </ul>
      <p>{profile.name}</p>
      <img
        src={profile.picture}
        alt="user"
        className="w-[100px] h-[100px] rounded-full"
      />
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
