import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useGoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import { elements } from "../styles/elements";
import { AiFillGoogleCircle } from "react-icons/ai";

const GoogleLoginBtn = () => {
  const { user, setUser } = useContext(UserContext);

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <div className="flex flex-col align-center justify-center">
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={googleLogin}
        className={`${elements.button} google-login`}
      >
        <AiFillGoogleCircle className="mx-auto" />
      </motion.button>
    </div>
  );
};

export default GoogleLoginBtn;
