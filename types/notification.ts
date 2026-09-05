import type { ReactNode } from "react";

export type NotificationType = "success" | "info" | "warning" | "error";

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}

export interface NotificationCardProps extends Notification {
  onClose: () => void;
}

export interface NotificationContextType {
  showNotification: (
    message: string,
    type?: NotificationType
  ) => void;

  clearNotification: (id: string) => void;
}

export interface NotificationProviderProps {
  children: ReactNode;
}