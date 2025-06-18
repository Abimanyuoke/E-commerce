"use client";

import React, { useEffect, useState } from 'react';
import LightPng from "../../../public/website/light-mode-button.png";
import DarkPng from "../../../public/website/dark-mode-button.png";

const DarkMode = () => {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    setTheme(savedTheme ?? "light");
  }, []);

  useEffect(() => {
    if (!theme) return;
    const element = document.documentElement;

    if (theme === "dark") {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  if (!theme) return null;

  return (
    <div className='relative'>
      <img
        src={LightPng.src}
        alt="Light mode"
        onClick={toggleTheme}
        className={`w-12 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300 absolute right-0 z-10 ${
          theme !== "dark" ? "opacity-0" : "opacity-100"
        }`}
      />
      <img
        src={DarkPng.src}
        alt="Dark mode"
        onClick={toggleTheme}
        className={`w-12 h-5 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300`}
      />
    </div>
  );
};

export default DarkMode;
