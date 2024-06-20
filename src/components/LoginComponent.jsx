import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";
import Logo from "./Logo";
import { message } from "./post form/PostForm";
import Button from "./Button";
import { authService } from "../appwrite/authService";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/authSlice";
import toast from "react-hot-toast";

export default function LoginComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (data) => {
    setError("");
    // 1. login to the account through appwrite
    try {
      const session = await authService.login(data); // session is the token, not userData
      // 2. Get the userdata and dispatch to the store and get them on home page
      if (session) {
        const userData = await authService.getAccount();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
          toast.success(`Welcome back ${userData.name} 🤝`);
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    // <div className="flex items-center justify-center w-full">
    <div
      className={`m-auto w-full max-w-lg bg-neutral-200 dark:bg-neutral-900 rounded-xl p-10 border border-black/10 dark:md:border-white/20`}
    >
      <div className="mb-2 flex justify-center">
        <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
          <Logo />
        </div>
      </div>
      <h2 className="text-center text-2xl font-bold leading-tight">
        Login, we know you!
      </h2>
      <p className="mt-2 text-center text-base opacity-60">
        Don&apos;t have any account?&nbsp;
        <Link
          to="/signup"
          className="font-bold text-primary transition-all duration-200 hover:border-0 underline hover:text-xl"
        >
          Sign Up
        </Link>
      </p>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

      <form onSubmit={handleSubmit(submit)} className="mt-8">
        <div className="space-y-5">
          <div>
            <Input
              label="Email : "
              type="email"
              placeholder="Enter your Email"
              {...register("email", {
                required: {
                  value: true,
                  message,
                },
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
              label="Password : "
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
          <Button className="w-full bg-gray-800 dark:bg-gray-700" type="submit">
            Login
          </Button>
        </div>
      </form>
    </div>
    // </div>
  );
}
