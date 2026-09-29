"use client";

import { useNotification } from "./NotificationProvider";

const Notification = () => {
  const { msg, type } = useNotification();
  if (!msg) return null;
  const style: React.CSSProperties = {
    padding: "10px 16px",
    marginBottom: "10px",
    borderRadius: "4px",
    color: "white",
    backgroundColor: type === "success" ? "#16a34a" : "#dc2626",
  };
  return <div style={style}>{msg} </div>;
};

export default Notification;
