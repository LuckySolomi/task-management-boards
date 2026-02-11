import type { ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import styles from "./Notification.module.css";

interface NotificationProps {
  children: ReactNode;
  onCloseClick: () => void;
}

export default function Notification({
  children,
  onCloseClick,
}: NotificationProps) {
  return (
    <div className={styles.notification}>
      <p className={styles.notificationText}>{children}</p>
      <button onClick={onCloseClick} className={styles.closeBtn}>
        <XMarkIcon className={styles.closeIcon} />
      </button>
    </div>
  );
}
