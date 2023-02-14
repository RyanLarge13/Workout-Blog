import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserInfo } from "../../client";

const UserProfile = () => {
  const [userView, setUserView] = useState(false);

  const { userId } = useParams();

  useEffect(() => {
    getUserInfo(userId)
      .then((user) => {
        setUserView(user[0]);
        console.log(user[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="py-20">
      <header className="flex justify-center items-center">
        <div>
          <div className="w-[200px] h-[200px] overflow-hidden rounded-full shadow-lg">
            <img src={userView.image} alt="user" className="w-full h-full" />
          </div>
          <p className="text-center mt-5 text-2xl">{userView.name}</p>
        </div>
      </header>
      <hr />
    </section>
  );
};

export default UserProfile;
