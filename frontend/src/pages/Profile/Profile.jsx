import { useState, useEffect, useContext } from "react";
import { ProfileContext } from "../../context/profileContext.js";
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
import Moment from "moment";
import Conformation from "../../components/Conformation";
import Bio from "./components/Bio";

const Profile = () => {
  const { profile, setProfile } = useContext(ProfileContext);
  const { setUser } = useContext(UserContext);

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
          setTotalLikes((prev) => prev + item.save?.length);
          setTotalComments((prev) =>
            prev ? prev + item.comments?.length : item.comments?.length
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
    <section className="pt-20">
      {changeBio && (
        <Bio bioText={profile.bio} id={profile._id} func={setChangeBio} />
      )}
      <div className="py-5 mx-2 my-5 flex flex-col items-center justify-center rounded-md shadow-lg text-white bg-gradient-to-r from-blue-400 to-violet-500 relative">
        <AiFillEdit
          onClick={() => setChangeBio(true)}
          className="absolute top-4 right-4 text-2xl"
        />
        <h1 className="text-2xl text-center">{profile.name}</h1>
        <div className="relative my-5">
          <label>
            <AiFillPlusCircle className="absolute top-0 right-0 text-2xl" />
            <input
              type="file"
              name="uploadImage"
              className="h-0 w-0 absolute"
              onChange={addProfileImage}
            />
          </label>
          <div className="w-[100px] h-[100px] rounded-full shadow-md overflow-hidden">
            <img src={profileImage} alt="you" className="object-cover" />
          </div>
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
              <p className="text-xs mt-4">{profile.bio}</p>
            </div>
          )}
        </div>
      </div>
      <div className="py-5 mx-2 my-5 flex flex-col items-center justify-center rounded-md shadow-lg text-white bg-gradient-to-r from-blue-400 to-violet-500 text-center text-sm">
        <p>
          You have been a member since{" "}
          {new Date(profile._createdAt).toLocaleDateString()}
        </p>
        <p>You have contributed {postsCount} posts to Workout Blog</p>
        <div className="flex justify-around w-full">
          <p className="flex justify-center items-center">
            {totalLikes} <AiFillHeart className="ml-1" />
          </p>
          <p className="flex justify-center items-center">
            {totalComments} <AiOutlineComment className="ml-1" />
          </p>
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
