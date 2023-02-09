import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UserContext } from "./context/userContext";
import { ProfileContext } from "./context/profileContext";
import { createUser } from "./client";
import Nav from "./components/Navigation/Nav";
import Axios from "axios";
import LoginSignup from "./pages/LoginSignup/LoginSignup";
import Home from "./pages/Home/Home";
import Blog from "./pages/Blog/Blog";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";

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
          createProfile(res.data);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            localStorage.removeItem("authToken");
          }
          setProfile(false);
          setUser(false);
        });
    }
  }, []);

  useEffect(() => {
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
          createProfile(res.data);
          setToken(user.access_token);
          localStorage.setItem("authToken", user.access_token);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const createProfile = (data) => {
    const { name, email, id, picture } = data;
    const newUser = {
      _id: id,
      _type: "user",
      name: name,
      image: picture,
      bio: "",
      email: email,
    };
    createUser(newUser)
      .then((user) => {
        setProfile(user);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <ProfileContext.Provider value={{ profile, setProfile }}>
          <Nav />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                profile ? <Navigate to="/dashboard" replace /> : <LoginSignup />
              }
            />
            <Route
              path="/profile"
              element={profile ? <Profile /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/dashboard"
              element={
                profile ? <Dashboard /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/blogs"
              element={profile ? <Blog /> : <Navigate to="/login" replace />}
            />
            <Route path="/post/:slug" element={null} />
          </Routes>
        </ProfileContext.Provider>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
