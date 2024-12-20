import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const create = async (data) => {
    setError("");
    try {
      const session = await authService.createAccount(data);
      // Once we create the account we will access currentAccount because in service we call login function in createAccount function so createAccount() perform itself

      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        console.log("userData: ", userData);
        navigate("/");
      }
    } catch (error) {
      console.log("Error in signUp: ", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100  rounded-xl p-10 border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create an account
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
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              type="name"
              {...register("name", { required: true })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi.test(value) ||
                    "Invalid email address",
                },
              })}
              // When we written register inother input then the value will overwrite the current value so we write ...register
            />

            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-700 to-blue-950 transform transition-transform  duration-400 hover:scale-105"
            >
              Create Account
              {error && console.log(error)}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
