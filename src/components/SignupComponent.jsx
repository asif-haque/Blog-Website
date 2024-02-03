import React, { useState } from "react";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { message } from "./post form/PostForm";
import { authService } from "../appwrite/authService";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Button from "./Button";

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
        const userData = authService.getAccount();
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
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(submit)}>
          <div className="space-y-5">
            <div>
              <Input
                label="Name : "
                placeholder="Enter Your Name"
                {...register("name", { required: message })}
              />
              {errors.name && (
                <p className="text-red-600 mt-8 text-center">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Input
                label="Email : "
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
