import { useContext } from "react";
import { ProfileContext } from "../../context/profileContext";
import { FaCog } from "react-icons/fa";

const Dashboard = () => {
  const { profile, setProfile } = useContext(ProfileContext);

  return (
    <section className="mt-10">
      <FaCog className="absolute bottom-3 right-3 text-xl" />
      <div>
        <h1>{profile.name}</h1>
      </div>
	  <div>
	  </div>
    </section>
  );
};

export default Dashboard;
