import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import api from "../api/api";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<User>();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = (login: User) => {
    setIsLoading(true);
    api
      .post("/v1/auth/authenticate", login)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        checkprivilege(navigate); // Pass navigate here
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data);
        } else if (error.request) {
          setError(error.request);
        } else {
          setError(error.message);
        }
        setIsLoading(false);
      });
  };

  const checkprivilege = (navigate: any) => {
    api.post("/v1/auth/checkprevelige").then((response) => {
      if (response.data === "admin") {
        navigate("/admin");
      } else {
        navigate("/client");
      }
    });
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <motion.form
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <motion.img
            src="../public/images/login.jpeg"
            alt="Profile"
            className="h-28 w-28 rounded-full mb-6 border-4 border-gray-700"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
          {error && (
            <div className="h-12 bg-red-500 font-semibold p-2 rounded-md my-2">
              {error}
            </div>
          )}
          <input
            type="text"
            placeholder="Username"
            className="rounded-lg w-80 h-12 bg-gray-700 text-white mb-4 p-3 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mb-4">{errors.username.message}</p>
          )}
          <input
            type="password"
            placeholder="Password"
            className="rounded-lg w-80 h-12 bg-gray-700 text-white mb-4 p-3 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-6">{errors.password.message}</p>
          )}
          <motion.button
            className="p-3 rounded-lg w-40 text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            Login
          </motion.button>
        </motion.form>
      </div>
      {isLoading && <Loading />}
    </>
  );
};

export default Login;
