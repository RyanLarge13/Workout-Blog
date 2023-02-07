import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { ProfileContext } from "../../context/profileContext";
import { googleLogout } from "@react-oauth/google";
import { Link } from "react-router-dom";

const UserNavigation = () => {
  const { user, setUser } = useContext(UserContext);
  const { profile, setProfile } = useContext(ProfileContext);

  const logout = () => {
    localStorage.removeItem("authToken");
    googleLogout();
    setUser(false);
    setProfile(false);
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/logout" onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default UserNavigation;
