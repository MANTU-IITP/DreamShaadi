import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const response = await api.get("/auth/notifications");
        setNotifications(response.data || []);
      } catch {
        setNotifications([]);
      }
    };
    loadNotifications();
  }, []);

  const markRead = async (notification) => {
    if (!notification.read) {
      await api.patch(`/auth/notifications/${notification._id}/read`);
      setNotifications((current) => current.map((item) => (
        item._id === notification._id ? { ...item, read: true } : item
      )));
    }
    setOpen(false);
  };

  const unread = notifications.filter((item) => !item.read).length;
  return (
    <div className="notification-menu">
      <button type="button" className="icon-button bell-button" onClick={() => setOpen((value) => !value)} aria-label="Notifications">
        ♢
        {unread > 0 && <span className="notification-dot">{unread}</span>}
      </button>
      {open && (
        <div className="notification-dropdown">
          <h3>Notifications</h3>
          {notifications.length === 0 && <p className="muted">No notifications yet.</p>}
          {notifications.slice(0, 8).map((item) => (
            <Link
              key={item._id}
              to={item.link || "#"}
              className={item.read ? "" : "unread"}
              onClick={() => markRead(item)}
            >
              {item.message}
              <small>{new Date(item.createdAt).toLocaleDateString("en-IN")}</small>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
