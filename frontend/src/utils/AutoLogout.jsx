import React, { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];

const AutoLogout = ({ children }) => {
  let timer;

  useEffect(() => {
    Object.values(events).forEach((item) => {
      window.addEventListener(item, () => {
        resetTimer();
        handleTimer();
      });
    });
  }, []);

  const resetTimer = () => {
    if (timer) clearTimeout(timer);
  };

  const handleTimer = () => {
    timer = setTimeout(() => {
      resetTimer();
      Object.values(events).forEach((item) => {
        window.removeEventListener(item, resetTimer);
      });
      logoutAction();
    }, 10000);
  };

  const logoutAction = () => {
    Cookies.remove("user_access_token");
    window.location.pathname = "/";
  };
  return children;
};

export default AutoLogout;
