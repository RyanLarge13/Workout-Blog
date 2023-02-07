import { NavLink } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi";
import { containers } from "../../styles/containers";
import { elements, variants } from "../../styles/elements";

const Nav = () => {
  return (
    <nav className={`${containers.nav}`}>
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
    </nav>
  );
};

export default Nav;
