import React, { useState } from "react";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { message } from "./post form/PostForm";
import { authService } from "../appwrite/authService";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Button from "./Button";
import toast from "react-hot-toast";

export default function SignupComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (data) => {
    try {
      const session = await authService.signUp(data);
      if (session) {
        const userData = await authService.getAccount();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
          toast(`Welcome ${userData.name} 👋`);
        }
      }
    } catch (error) {
      setError("Error from sign in: " + error.message);
    }
  };

  return (
    // <div className="flex items-center justify-center">
    <div
      className={`m-auto w-full max-w-lg bg-neutral-200 dark:bg-neutral-900 md:rounded-xl p-5 border border-black/10 dark:md:border-white/20`}
    >
      <div className="mb-2 flex justify-center">
        <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
          <Logo />
        </div>
      </div>
      <h2 className="text-center text-2xl font-bold leading-tight">
        Sign up, it's safe.
      </h2>
      <p className="mt-2 text-base opacity-60 hover:opacity-90 transition-all w-fit m-auto">
        Already have an account?&nbsp;
        <Link
          to="/login"
          className="font-bold text-primary underline hover:border-0 hover:text-xl transition-all duration-200"
        >
          <span>Login</span>
        </Link>
      </p>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      <form onSubmit={handleSubmit(submit)}>
        <div className="space-y-5">
          <div>
            <Input
              label="Name"
              placeholder="Enter Your Name"
              {...register("name", { required: message })}
            />
            {errors.name && (
              <p className="text-red-600 mt-1 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Input
              label="Email"
              type="email"
              placeholder="Enter Your Email"
              {...register("email", {
                required: message, // written in short
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Enter a valid Email!",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600 mt-1 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Input
              label="Password"
              type="password"
              placeholder="Enter your Password"
              {...register("password", {
                required: message,
              })}
            />
            {errors.password && (
              <p className="text-red-600 mt-1 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button
            className="w-full bg-gray-800 dark:bg-gray-700 hover:scale-[102%]"
            type="submit"
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
    // </div>
  );
}
