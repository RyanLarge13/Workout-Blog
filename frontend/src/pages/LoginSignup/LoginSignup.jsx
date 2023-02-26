import { motion } from "framer-motion";
import { heading } from "../../variants/variants.js";
import { elements } from "../../styles/elements.js";
import GoogleLoginBtn from "../../components/GoogleLoginBtn.jsx";

const LoginSignup = () => {
  return (
    <section className="flex flex-col align-center justify-center h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500 overflow-x-hidden">
      <div>
        <motion.h1
          initial="hidden"
          animate="show"
          variants={heading}
          className={`${elements.h1} text-white`}
        >
          SignIn With Google
        </motion.h1>
        <div className="flex flex-col align-center justify-center">
          {<GoogleLoginBtn />}
        </div>
      </div>
    </section>
  );
};

export default LoginSignup;
