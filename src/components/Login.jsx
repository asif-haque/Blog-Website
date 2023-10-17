import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Input from "./Input";

export default function Login() {
  const { register, handleSubmit } = useForm();
  return (
    <div>
      <p>
        Don't have an account? <Link to="">Sign up</Link>
      </p>
      {/* Need to display errors */}
      <form>
        <Input
          label="Email : "
          type="email"
          placeholder="Enter your Email"
          {...register("email", {
            required: true
          })}
        />
      </form>
    </div>
  );
}
