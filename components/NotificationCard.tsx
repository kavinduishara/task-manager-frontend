"use client";

import {
  AlertCircle,
  CheckCircle,
  Info,
  TriangleAlert,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import type {
  NotificationCardProps,
  NotificationType,
} from "@/types/notification";

const notificationStyles: Record<NotificationType, string> = {
  success: "border-green-200 bg-green-50 text-green-700",
  info: "border-blue-200 bg-blue-50 text-blue-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  error: "border-red-200 bg-red-50 text-red-700",
};

const notificationIcons = {
  success: CheckCircle,
  info: Info,
  warning: TriangleAlert,
  error: AlertCircle,
} satisfies Record<NotificationType, typeof CheckCircle>;

const notificationProgressStyles: Record<NotificationType, string> = {
  success: "bg-green-500",
  info: "bg-blue-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
};

const NOTIFICATION_DURATION = 4000;
const ANIMATION_DURATION = 300;

export default function NotificationCard({
  message,
  type,
  onClose,
}: NotificationCardProps) {
  const Icon = notificationIcons[type];

  const [close, setClose] = useState(false);

  const closeNotification = () => {
    setClose(true);
  };

  useEffect(() => {
    const closeTimer = setTimeout(() => {
      setClose(true);
    }, NOTIFICATION_DURATION);

    return () => {
      clearTimeout(closeTimer);
    };
  }, []);

  useEffect(() => {
    if (!close) return;

    const removeTimer = setTimeout(() => {
      onClose();
    }, ANIMATION_DURATION);

    return () => {
      clearTimeout(removeTimer);
    };
  }, [close, onClose]);

  return (
    <div
      className={`w-[90%] max-w-md transition-all duration-300 ${
        close
          ? "translate-x-[120%] opacity-0"
          : "translate-x-0 opacity-100"
      }`}
    >
      <div
        className={`relative flex items-start gap-3 overflow-hidden rounded-xl border p-4 shadow-lg ${notificationStyles[type]}`}
      >
        <Icon className="mt-0.5 shrink-0" size={20} />

        <p className="flex-1 text-sm font-medium">
          {message}
        </p>

        <button
          type="button"
          onClick={closeNotification}
          aria-label="Close notification"
          className="opacity-60 transition-opacity hover:opacity-100"
        >
          <X size={18} />
        </button>

        <div
          className={`absolute bottom-0 left-0 h-1 w-full origin-left animate-[notification-progress_4s_linear_forwards] ${notificationProgressStyles[type]}`}
        />
      </div>
    </div>
  );
}