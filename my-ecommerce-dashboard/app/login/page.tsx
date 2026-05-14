"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleLogin = () => {
    setError("");
    if (login(user, pass)) {
      router.push("/");
    } else {
      setError("Tài khoản hoặc mật khẩu không chính xác!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-4 relative overflow-hidden">
      
      <div className="absolute -top-10 -left-10 text-white opacity-10">
        <svg width="150" height="150" viewBox="-11.5 -10.232 23 20.463" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
          <ellipse rx="11" ry="4.2" stroke="currentColor" strokeWidth="0.8"/>
          <ellipse rx="11" ry="4.2" stroke="currentColor" strokeWidth="0.8" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" stroke="currentColor" strokeWidth="0.8" transform="rotate(120)"/>
        </svg>
      </div>

      <div className="absolute top-1/4 -right-12 text-white opacity-10 font-mono text-[10rem] font-black">
        {"{/>}"}
      </div>

      <div className="absolute -bottom-20 left-1/3 text-white opacity-5">
        <svg width="200" height="200" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
        </svg>
      </div>

      <div className="absolute top-1/2 left-10 text-white opacity-10">
        <svg width="60" height="60" fill="currentColor" viewBox="0 0 16 16">
          <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-1.357 1.215-2.383 2.564-2.383z"/>
        </svg>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Chào mừng trở lại</h1>
          <p className="text-gray-500 mt-2">Đăng nhập</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tài khoản</label>
            <input 
              type="text" 
              placeholder="admin" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              onChange={(e) => setUser(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <input 
              type="password" 
              placeholder="123456" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium animate-bounce">{error}</p>
          )}

          <button 
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg transform active:scale-95 transition-all duration-200"
          >
            Đăng nhập ngay
          </button>
        </div>

        <p className="text-center text-gray-400 text-xs mt-8">
          &copy; 2026 Modern Front-End Ecosystems Dashboard.
        </p>
      </div>
    </div>
  );
}