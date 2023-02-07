import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { ProfileContext } from "../../context/profileContext";
import { googleLogout } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { containers } from "../../styles/containers";
import { elements, variants } from "../../styles/elements";

const UserNavigation = () => {
  const { user, setUser } = useContext(UserContext);
  const { profile, setProfile } = useContext(ProfileContext);

  useEffect(() => {
    console.log(profile);
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");
    googleLogout();
    setUser(false);
    setProfile(false);
  };

  return (
    <nav className={`${containers.nav}`}>
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
          <Link to="/logout" onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
      <p>{profile.name}</p>
      <img
        src={profile.picture}
        alt="user"
        className="w-[50px] h-[50px] rounded-full"
      />
    </nav>
  );
};

export default UserNavigation;
