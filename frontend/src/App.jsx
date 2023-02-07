import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Navigation/Nav";
import Axios from "axios";
import { UserContext } from "./context/userContext";
import LoginSignup from "./pages/LoginSignup/LoginSignup";
import UserNavigation from "./components/Navigation/UserNavigation";
import Home from "./pages/Home/Home";
import { ProfileContext } from "./context/profileContext";

const App = () => {
  const [user, setUser] = useState(false);
  const [profile, setProfile] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  useEffect(() => {
    if (token) {
      Axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )
        .then((res) => {
          setProfile(res.data);
          setUser(true);
        })
        .catch((err) => console.log(err));
    }
    if (user && user.access_token) {
      Axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        }
      )
        .then((res) => {
          setProfile(res.data);
          setToken(user.access_token);
          localStorage.setItem("authToken", user.access_token);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <ProfileContext.Provider value={{ profile, setProfile }}>
          {user ? <UserNavigation /> : <Nav />}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/logout" element={<LoginSignup />} />
          </Routes>
        </ProfileContext.Provider>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
