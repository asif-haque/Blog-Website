import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";
import Logo from "./Logo";
import { message } from "./post form/PostForm";
import Button from "./Button";
import { authService } from "../appwrite/authService";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

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
      const session = await authService.login(data);
      // 2. Get the userdata and dispatch to the store and get them on home page
      if (session) {
        const userData = await authService.getAccount();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
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
                <p className="text-red-600 mt-8 text-center">
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
                <p className="text-red-600 mt-8 text-center">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button className="w-full" type="submit">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
