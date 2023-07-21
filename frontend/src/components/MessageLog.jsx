import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import jwt from "jwt-decode";

const MessageLog = ({ message }) => {
  const { user } = useSelector((state) => state.user);
  const currentUser = jwt(user);

  const CURRENT_USER_CHAT = "flex justify-end p-1 ";
  const RECEIVER_CHAT = "flex justify-start p-1";

  return (
    <div
      className={
        message.from == currentUser.id ? CURRENT_USER_CHAT : RECEIVER_CHAT
      }
    >
      <label
        className={
          message.from == currentUser.id
            ? "p-3 text-white bg-black rounded-md max-w-70 text-left"
            : "p-3 text-black bg-gray-300 rounded-md text-left max-w-70"
        }
      >
        {message.text}
      </label>
    </div>
  );
};

export default MessageLog;
