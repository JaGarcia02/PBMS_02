import React, { useEffect } from "react";
import { useState } from "react";
import "./Switch.css";
import useLocalStorage from "../Hooks/useLocalStorage";

const Switch = () => {
  let clickedClass = "clicked";
  const body = document.body;
  const lightTheme = "light";
  const darkTheme = "dark";
  let theme;

  const [value, setValue] = useLocalStorage("theme", localStorage.theme);

  if (localStorage) {
    theme = localStorage.getItem("theme");
  }

  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme);
  } else {
    body.classList.add(lightTheme);
  }

  const switchTheme = (e) => {
    if (value === darkTheme) {
      body.classList.replace(darkTheme, lightTheme);
      e.target.classList.remove(clickedClass);
      localStorage.setItem("theme", "light");
      setValue("light");
      theme = lightTheme;
    } else {
      body.classList.replace(lightTheme, darkTheme);
      e.target.classList.add(clickedClass);
      localStorage.setItem("theme", "dark");
      setValue("dark");
      theme = darkTheme;
    }
  };

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={value == "dark" ? true : false}
        onChange={(e) => switchTheme(e)}
      />
      <span className="slider" />
    </label>
  );
};

export default Switch;
