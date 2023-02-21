import { useState, useEffect, useContext } from "react";
import { ProfileContext } from "../../context/profileContext.js";
import { UserContext } from "../../context/userContext";
import {client, updateUsername, deleteUser } from "../../client.js";
import { AiFillPlusCircle } from "react-icons/ai";
import { elements } from "../../styles/elements.js";
import Conformation from "../../components/Conformation.jsx";

const Profile = () => {
  const { profile, setProfile } = useContext(ProfileContext);
  const { setUser } = useContext(UserContext);

  const [picker, setPicker] = useState();
  const [profileImage, setProfileImage] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);
  const [imageload, setImageLoad] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    setProfileImage(profile.image);
  }, []);

  const deleteProfile = (userId) => {
    deleteUser(userId).then((res) => {
      setProfile(false);
      setUser(false);
      console.log(res);
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
          setProfileImage(doc);
        })
        .catch((err) => console.log(err));
    } else {
      setImageLoad(false);
      setWrongImageType(true);
    }
  };

  return (
    <section className="pt-20">
      <div className="py-5 mx-2 my-5 flex flex-col items-center justify-center rounded-md shadow-lg text-white bg-gradient-to-r from-blue-400 to-violet-500">
        <h1 className="text-2xl">{profile.name}</h1>
        <div className="relative my-5">
          <label>
            <AiFillPlusCircle className="absolute top-0 right-0 text-2xl" />
            <input
              type="file"
              className="h-0 w-0 absolute"
              onChange={addProfileImage}
            />
          </label>
          <div>
          <img
            src={profileImage}
            alt="you"
            className="rounded-full shadow-md"
          />
          </div>
        </div>
        <div>
          <p>{profile.email}</p>
        </div>
      </div>
      <div className="py-5 mx-2 my-5 flex flex-col items-center justify-center rounded-md shadow-lg text-white bg-gradient-to-r from-blue-400 to-violet-500">
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
      <div className="py-5 mx-2 my-5 flex flex-col items-center justify-center rounded-md shadow-lg text-white bg-gradient-to-r from-blue-400 to-violet-500">
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
            picker === "delete" ? deleteProfile(id) : newUsername(profile._id)
          }
        />
      ) : null}
    </section>
  );
};

export default Profile;
