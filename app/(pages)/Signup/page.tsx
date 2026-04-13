"use client";
import Link from "next/link";
import React, { ReactEventHandler, useState } from "react";

const signupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const validatePasswords = (password: string, confirmPassword: string) => {
    let passwordError = "";
    let confirmError = "";

    if (password.length < 8) {
      passwordError = "Password must be at least 8 characters";
    }

    if (!/\d/.test(password)) {
      passwordError = "Password must contain a number";
    }

    if (confirmPassword && password !== confirmPassword) {
      confirmError = "Passwords do not match";
    }

    setErrors((prev) => ({
      ...prev,
      password: passwordError,
      confirmPassword: confirmError,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    if (name === 'username'){
      if (value.trim().length<3){
        setErrors((prev) => ({
          ...prev, username: "Username is less than three characters"
        }))
        
      }else{
        setErrors((prev) => ({...prev, username: ""}))
      }
    }

    if (name === "password" || name === "confirmPassword") {
      validatePasswords(updatedData.password, updatedData.confirmPassword);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const req = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!req.ok) {
        throw new Error(`Server responded with ${req.status}`);
      } else {
        const response = await req.json();
        setIsLoading(false);
        response.redirect(307, '/')
        return { success: true, data: response };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      return { success: false, error: errorMessage };
    }
  };

  return (
    <section className="flex flex-col justify-center items-center h-screen w-full">
      <div className="text-center flex flex-col gap-4 w-[400px]">
        <h1>Welcome to Cirvio </h1>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <input
              name="email"
              onChange={handleChange}
              type="email"
              placeholder="Email"
              value={formData.email}
              className="input"
            />
            <input
              name="username"
              onChange={handleChange}
              type="text"
              required
              placeholder="Username"
              value={formData.username}
              className="input"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
            <input
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="Password"
              value={formData.password}
              className="input"
            />
            <input
              name="confirmPassword"
              onChange={handleChange}
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              className="input"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <button type="submit" className="enter" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link href="/dashboard" className="font-bold">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default signupPage;
