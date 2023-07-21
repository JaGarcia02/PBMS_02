import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import jwt from "jwt-decode";
import MessageLog from "../../components/MessageLog";

const Chat = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [message, setMessage] = useState([]);
  const currentUser = jwt(user);
  const receiver = useParams();

  useEffect(() => {
    const collectionRef = collection(db, "messages");

    const q = query(
      collectionRef,

      orderBy("date", "asc")
    );

    const getMessage = onSnapshot(q, (snapshot) => {
      setMessage(snapshot.docs.map((doc) => doc.data()));
    });

    return getMessage;
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="h-15 flex w-full" />
      <div className="flex w-full h-full">
        <div className="flex flex-[0.3] bg-blue-100"></div>
        <div className="flex flex-1">
          <div className="flex flex-col w-full h-full">
            <div className="h-[10%] border-b border-b-gray-600 w-full">a</div>
            <div className="h-120 w-full overflow-scroll">
              {message
                .filter(
                  (data) =>
                    (data.from == currentUser.id || data.from == receiver.id) &&
                    (data.to == currentUser.id || data.to == receiver.id)
                )
                .map((mess) => {
                  return <MessageLog message={mess} key={mess.time} />;
                })}
            </div>
            <div className="flex h-[15%] border-t border-t-gray-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
