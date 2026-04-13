'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    email:'',
    password:''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
    setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
  }

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
  
  event.preventDefault();

  await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  }

  return (
    <section className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin}></form>
      <div className="text-center flex flex-col gap-4">
        <h1>Welcome to Cirvio</h1>
        <h2>Login</h2>

        <div className="flex flex-col gap-2">
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            className="input"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            className="input"
          />
        </div>
        <button className="enter" type="submit">Log In</button>
        <p>
          Don't have an account?{" "}
          <Link href="/Signup" className="font-bold">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}
