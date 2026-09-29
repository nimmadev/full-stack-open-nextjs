"use client";
import { createContext, useContext, useState } from "react";

type NotificationErrorType = "success" | "error";

type NotificationContext = {
  msg: string;
  type: NotificationErrorType;
  showNotification: (message: string, type: NotificationErrorType) => void;
};

const notifictaionContext = createContext<NotificationContext>({
  msg: "",
  type: "success",
  showNotification: () => {},
});

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [msg, setMsg] = useState("");
  const [type, setType] = useState<NotificationErrorType>("success");
  const showNotification = (
    msg: string,
    type: NotificationErrorType = "success",
  ) => {
    setMsg(msg);
    setType(type);
    setTimeout(() => setMsg(""), 5000);
  };
  return (
    <notifictaionContext.Provider value={{ msg, type, showNotification }}>
      {children}
    </notifictaionContext.Provider>
  );
};

export const useNotification = () => useContext(notifictaionContext);
