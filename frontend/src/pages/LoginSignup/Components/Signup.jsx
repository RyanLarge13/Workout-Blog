import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { form, formItem, heading } from "../../../varients/variants.js";
import { elements, variants } from "../../../styles/elements.js";
import { BiLogInCircle } from "react-icons/bi";
import { AiFillGoogleCircle } from "react-icons/ai";

const Signup = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
  };

  return (
    <AnimatePresence>
      <div>
        <motion.h1
          initial="hidden"
          animate="show"
          variants={heading}
          className={`${elements.h1} text-white`}
        >
          Sign Up
        </motion.h1>
        <motion.form
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
          variants={form}
          onSubmit={handleSignup}
          className="max-h-[300px] flex flex-col align-center justify-center my-10"
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
          <label className="hidden" htmlFor="confpassword">
            Confirm Password
          </label>
          <motion.input
            variants={formItem}
            name="confpassword"
            id="confpassword"
            placeholder="Confirm Password"
            onChange={(e) => setConfPassword(e.target.value)}
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
          <button className={`${elements.button} google-login`}>
            <AiFillGoogleCircle className="mx-auto" />
          </button>
        </div>
        <button
          onClick={() => login(true)}
          className="block mx-auto mt-[100px] underline"
        >
          Already Have An Account?
        </button>
      </div>
    </AnimatePresence>
  );
};

export default Signup;
