import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, signUpProvider, forgotPassword } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password);
  };

  return (
    <div className="overflow-hidden flex-1 h-screen justify-center items-center dark:bg-gray-dark-main">
      <div
        className={`mt-[10vh] mx-auto overflow-hidden relative w-[380px] h-[500px] rounded-[8px] dark:bg-[#1c1c1c] 
   before:content-[""] before:absolute before:w-[380px] before:h-[420px] before:top-[-50%] before:left-[-50%] 
    after:content-[""] after:absolute after:w-[380px] after:h-[420px] after:top-[-50%] after:left-[-50%]
    custom-linear-gradient 

    `}
      >
        {/* It is better to use Formik, to validate the password formik and yup. With Formik the difference is that it is not necessary to define the controlled input. But it is needed the initial values */}
        <form
          onSubmit={handleSubmit}
          className="absolute inset-[2px] rounded-[8px] bg-gray-100 dark:bg-[#28292d] z-[10] flex flex-col py-[50px] px-[40px]"
        >
          <h2 className="text-red-main text-2xl font-[500] text-center mb-3 tracking-[0.1em]">
            Sign In
          </h2>
          <div className="relative z-0 w-full mb-6 group">
            <input
              className="peer"
              id="floating_email"
              name="floating_email"
              type="email"
              placeholder=" "
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floating_email"> Email</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              className="peer"
              id="floating_password"
              name="floating_password"
              type="password"
              placeholder=" "
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floating_password"> Password</label>
          </div>

          <div className="flex justify-between">
            <span
              className="py-3 font-[0.75em] cursor-pointer decoration-none text-gray-500 hover:text-[#ff4b45]"
              onClick={() => forgotPassword(email)}
            >
              Forgot Password
            </span>

            <Link
              to="/register"
              className="py-3 font-[0.75em] cursor-pointer decoration-none text-gray-500 hover:text-[#ff4b45]"
            >
              Sign Up
            </Link>
          </div>
          <button className="btn-danger" type="submit">
            Login
          </button>
          <button
            type="button"
            className="btn-danger flex justify-between items-center"
            onClick={() => signUpProvider()}
          >
            <span> Continue with Google</span>
            <FcGoogle className="text-3xl" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

// If the registration is with google and then try to sign in with just email and password, it is not possible to do it
// But in case the registration is with email and password and then use google, it is possible
// Forgot password: reset the password it can do with normal registration email or with google authentication
