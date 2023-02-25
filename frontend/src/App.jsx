import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UserContext } from "./context/userContext";
import { ProfileContext } from "./context/profileContext";
import { newBlogContext } from "./context/newBlogContext";
import { PickerContext } from "./context/pickerContext";
import { createUser } from "./client";
import { DotLoader } from "react-spinners";
import Nav from "./components/Navigation/Nav";
import Axios from "axios";
import LoginSignup from "./pages/LoginSignup/LoginSignup";
import Home from "./pages/Home/Home";
import Blog from "./pages/Blog/Blog";
import BlogDetails from "./pages/Blog/components/BlogDetails";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import UserProfile from "./pages/UserProfile/UserProfile";

const App = () => {
  const [user, setUser] = useState(false);
  const [profile, setProfile] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [picker, setPicker] = useState("myposts");
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  useEffect(() => {
    if (token) {
      setLoading(true);
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
          if (res.error) {
          	localStorage.removeItem("authToken");
            setToken(false);
            setProfile(false);
            setUser(false);
            return setLoading(false);
          }
          createProfile(res.data);
        })
        .catch((err) => {
          if (err.response?.status === 401) {
            localStorage.removeItem("authToken");
          }
          setProfile(false);
          setUser(false);
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (user && user.access_token) {
      setLoading(true);
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
        .catch((err) => {
          setLoading(false);
          setProfile(false);
          console.log(err);
        });
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
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <ProfileContext.Provider value={{ profile, setProfile }}>
          <newBlogContext.Provider value={{ content, setContent }}>
            <PickerContext.Provider value={{ picker, setPicker }}>
              <Nav />
              {loading ? (
                <section className="h-screen flex justify-center items-center">
                  <DotLoader color="#f4f" />
                </section>
              ) : (
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/login"
                    element={
                      token ? <Navigate to="/dashboard" /> : <LoginSignup />
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      token ? <Profile /> : <Navigate to="/login" replace />
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      token ? <Dashboard /> : <Navigate to="/login" replace />
                    }
                  />
                  <Route
                    path="/blogs"
                    element={
                      token ? <Blog /> : <Navigate to="/login" replace />
                    }
                  />
                  <Route
                    path="/posts/:postId"
                    element={
                      token ? <BlogDetails /> : <Navigate to="/login" replace />
                    }
                  />
                  <Route
                    path="/users/:userId"
                    element={
                      token ? <UserProfile /> : <Navigate to="/login" replace />
                    }
                  />
                </Routes>
              )}
            </PickerContext.Provider>
          </newBlogContext.Provider>
        </ProfileContext.Provider>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
