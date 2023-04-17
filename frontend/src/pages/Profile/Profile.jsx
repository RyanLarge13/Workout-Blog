import { useState, useEffect, useContext } from "react";
import { ProfileContext } from "../../context/profileContext.js";
import { SettingsContext } from "../../context/settingsContext.js";
import { UserContext } from "../../context/userContext";
import {
  client,
  updateUsername,
  deleteUser,
  updateProfileImage,
  getPersonalPosts,
  getAllLikesAndComments,
} from "../../client.js";
import {
  AiFillPlusCircle,
  AiFillHeart,
  AiOutlineComment,
  AiFillEdit,
} from "react-icons/ai";
import { elements, variants } from "../../styles/elements.js";
import Conformation from "../../components/Conformation";
import Bio from "./components/Bio";
import HeaderImage from "./components/HeaderImage";
import FollowersFollowing from "./components/FollowersFollowing";

const Profile = () => {
  const { profile, setProfile } = useContext(ProfileContext);
  const { settings } = useContext(SettingsContext);
  const { setUser } = useContext(UserContext);

  const [newGradient, setNewGradient] = useState(false);
  const [picker, setPicker] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);
  const [imageload, setImageLoad] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [username, setUsername] = useState(null);
  const [postsCount, setPostsCount] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [changeBio, setChangeBio] = useState(false);

  useEffect(() => {
    if (settings) {
      if (settings.selectedColor) {
        setNewGradient(settings.selectedColor);
      }
    }
  }, [settings]);

  useEffect(() => {
    setProfileImage(profile.image);
    getPersonalPosts(profile._id)
      .then((res) => {
        const mostPopular = res;
        setPostsCount(res.length);
      })
      .catch((err) => console.log(err));

    getAllLikesAndComments(profile._id)
      .then((res) => {
        res.map((item) => {
          setTotalLikes((prev) =>
            item.save ? prev + item.save?.length : prev
          );
          setTotalComments((prev) =>
            item.comments ? prev + item.comments?.length : prev
          );
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteProfile = (userId) => {
    deleteUser(userId).then((res) => {
      setProfile(false);
      setUser(false);
    });
  };

  const newUsername = (userId) => {
    if (username)
      return updateUsername(userId, username)
        .then((res) => {
          console.log(res);
          setConfirm(false);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    else console.log("Not an exceptable username");
  };

  const addProfileImage = (e) => {
    const { type, name } = e.target.files[0];

    setImageLoad(true);

    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpeg" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      setWrongImageType(false);
      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filenam: name,
        })
        .then((doc) => {
          setImageLoad(false);
          setProfileImage(doc.url);
          setPicker("keepPhoto");
        })
        .catch((err) => console.log(err));
    } else {
      setImageLoad(false);
      setWrongImageType(true);
    }
  };

  const addPhoto = (id) => {
    updateProfileImage(id, profileImage)
      .then((res) => {
        setConfirm(false);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="pt-20 pb-5 md:px-10 lg:px-20">
      {changeBio && (
        <Bio bioText={profile.bio} id={profile._id} func={setChangeBio} />
      )}
      <div
        style={
          newGradient
            ? {
                backgroundImage: `linear-gradient(to top right, violet, ${newGradient})`,
              }
            : { backgroundColor: "#00ffff" }
        }
        className="py-5 mx-2 my-5 flex flex-col items-center justify-center rounded-md shadow-lg text-white bg-gradient-to-r from-blue-400 to-violet-500 relative"
      >
        <AiFillEdit
          onClick={() => setChangeBio(true)}
          className="absolute top-4 right-4 text-2xl cursor-pointer"
        />
        <h1 className="text-2xl text-center w-full">{profile.name}</h1>
        <div className="relative my-5">
          <label>
            <AiFillPlusCircle className="absolute top-2 right-2 text-2xl cursor-pointer" />
            <input
              type="file"
              name="uploadImage"
              className="h-0 w-0"
              onChange={addProfileImage}
            />
          </label>
          <img
            src={profileImage}
            alt="you"
            className="object-cover w-[100px] h-[100px] rounded-full shadow-md "
          />
        </div>
        <div>
          {picker === "keepPhoto" ? (
            <button
              onClick={() => setConfirm(true)}
              className={`${elements.button} ${variants.mainBtnBg} text-black`}
            >
              Keep?
            </button>
          ) : (
            <div className="text-center mx-4">
              <p className="mb-2">{profile.email}</p>
              <p className="text-xs mt-4 md:text-xl md:w-[50%] md:mx-auto md:mt-10">
                {profile.bio}
              </p>
            </div>
          )}
        </div>
      </div>
      <HeaderImage />
      <div
        style={
          newGradient
            ? {
                backgroundImage: `linear-gradient(to top right, violet, ${newGradient})`,
              }
            : { backgroundColor: "#00ffff" }
        }
        className={`py-5 mx-2 my-5 flex flex-col items-center justify-center rounded-md shadow-lg text-white bg-gradient-to-r from-blue-400 to-violet-500 text-center text-sm`}
      >
        <p className="md:text-xl">
          You have been a member since{" "}
          {new Date(profile._createdAt).toLocaleDateString()}
        </p>
        <p className="md:text-xl">
          You have contributed {postsCount} posts to Workout Blog
        </p>
        <div className="flex justify-around w-full md:justify-center md:mt-5">
          <p className="flex justify-center items-center md:mr-5 md:text-lg">
            {totalLikes} <AiFillHeart className="ml-1" />
          </p>
          <p className="flex justify-center items-center md:text-lg">
            {totalComments} <AiOutlineComment className="ml-1" />
          </p>
        </div>
      </div>
      <FollowersFollowing userId={profile._id} newGradient={newGradient} />
      <div
        style={
          newGradient
            ? {
                backgroundImage: `linear-gradient(to top right, violet, ${newGradient})`,
              }
            : { backgroundColor: "#00ffff" }
        }
        className="py-5 mx-2 my-5 flex flex-col items-center justify-center rounded-md shadow-lg text-white bg-gradient-to-r from-blue-400 to-violet-500"
      >
        <h2 className="text-2xl">Change Your Username</h2>
        <label htmlFor="username" className="hidden">
          Username
        </label>
        <input
          placeholder="New Username"
          name="username"
          id="username"
          className={`${elements.input}`}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className={`${elements.button} bg-gradient-to-tr from-green-400 to-blue-500`}
          onClick={() => {
            setPicker("username");
            setConfirm(true);
          }}
        >
          Submit
        </button>
      </div>
      <div
        style={
          newGradient
            ? {
                backgroundImage: `linear-gradient(to top right, violet, ${newGradient})`,
              }
            : { backgroundColor: "#00ffff" }
        }
        className="py-5 mx-2 my-5 flex flex-col items-center justify-center rounded-md shadow-lg text-white bg-gradient-to-r from-blue-400 to-violet-500"
      >
        <h2 className="text-2xl">Delete Your Account</h2>
        <button
          onClick={() => {
            setPicker("delete");
            setConfirm(true);
          }}
          className={`${elements.button} bg-gradient-to-r from-red-400 to-red-500`}
        >
          Delete
        </button>
      </div>
      {confirm ? (
        <Conformation
          displayToggle={(bool) => setConfirm(bool)}
          deleteFunc={(id) =>
            picker === "delete"
              ? deleteProfile(id)
              : picker === "keepPhoto"
              ? addPhoto(id)
              : newUsername(id)
          }
        />
      ) : null}
    </section>
  );
};

export default Profile;
