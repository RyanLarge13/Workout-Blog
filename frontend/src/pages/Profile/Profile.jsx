import { useContext } from "react";
import { ProfileContext } from "../../context/profileContext.js";
import { elements } from "../../styles/elements.js";

const Profile = () => {
  const { profile, setProfile } = useContext(ProfileContext);

  return (
    <section className="pt-20">
      <div className="py-5 mx-2 my-5 flex flex-col items-center justify-center rounded-md shadow-lg text-white bg-gradient-to-r from-blue-400 to-violet-500">
        <h1 className="text-2xl">{profile.name}</h1>
        <img
          src={profile.image}
          alt="you"
          className="my-5 rounded-full shadow-md"
        />
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
        />
        <button
          className={`${elements.button} bg-gradient-to-tr from-green-400 to-blue-500`}
        >
          Submit
        </button>
      </div>
      <div className="py-5 mx-2 my-5 flex flex-col items-center justify-center rounded-md shadow-lg text-white bg-gradient-to-r from-blue-400 to-violet-500">
        <h2 className="text-2xl">Delete Your Account</h2>
        <button className={`${elements.button} bg-gradient-to-r from-red-400 to-red-500`}>Delete</button>
      </div>
    </section>
  );
};

export default Profile;
