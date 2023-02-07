import { useState } from "react";
import { motion } from "framer-motion";
import { BiLogInCircle } from "react-icons/bi";
//======Imports for styled components and Framer Motion Variants======
import { form, formItem, heading } from "../../variants/variants.js";
import { elements, variants } from "../../styles/elements.js";
import Signup from "./Components/Signup";
import GoogleLoginBtn from "../../components/GoogleLoginBtn.jsx";

const LoginSignup = () => {
  //======Component state=====
  const [login, setLogin] = useState(true);
  //======Email password login state======
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //======Node.js Login with MongoDB to be implimented later======
  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <section className="flex flex-col align-center justify-center h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500 overflow-x-hidden">
      {login ? (
        <div>
          <motion.h1
            initial="hidden"
            animate="show"
            variants={heading}
            className={`${elements.h1} text-white`}
          >
            Login
          </motion.h1>
          <motion.form
            initial="hidden"
            animate="visible"
            variants={form}
            onSubmit={handleLogin}
            className="min-h-[300px] flex flex-col align-center justify-center my-10"
          >
            <label className="hidden" htmlFor="username">
              Username
            </label>
            <motion.input
              variants={formItem}
              name="username"
              id="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className={`${elements.input}`}
            />
            <label className="hidden" htmlFor="password">
              Password
            </label>
            <motion.input
              variants={formItem}
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className={`${elements.input}`}
            />
            <motion.button
              variants={formItem}
              className={`${elements.button} ${variants.mainBtnBg}`}
            >
              <BiLogInCircle className="mx-auto" />
            </motion.button>
          </motion.form>
          <p className="text-center">or</p>
          <hr className="mb-10 w-[80%] mx-auto" />
          <div className="flex flex-col align-center justify-center">
            {<GoogleLoginBtn />}
          </div>
          <button
            onClick={() => setLogin(false)}
            className="block mx-auto mt-[100px] underline"
          >
            New User?
          </button>
        </div>
      ) : (
        <Signup login={(bool) => setLogin(bool)} />
      )}
    </section>
  );
};

export default LoginSignup;
