"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

import NotificationCard from "@/components/NotificationCard";

import type {
  Notification,
  NotificationContextType,
  NotificationProviderProps,
  NotificationType,
} from "@/types/notification";

const NotificationContext =
  createContext<NotificationContextType | null>(null);

export function NotificationProvider({
  children,
}: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = (
    message: string,
    type: NotificationType = "info"
  ) => {
    const notification = {
      id: crypto.randomUUID(),
      message,
      type,
    };

    setNotifications((prev) => [...prev, notification]);
  };

  const clearNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        clearNotification,
      }}
    >
      <div className="fixed right-2 top-5 z-50 flex w-[90%] max-w-md flex-col gap-3">
        {notifications.map((notification) => (
          <NotificationCard
                key={notification.id}
                message={notification.message}
                type={notification.type}
                onClose={() => clearNotification(notification.id)} 
                id={""}
            />
        ))}
      </div>

      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification must be used inside NotificationProvider"
    );
  }

  return context;
}