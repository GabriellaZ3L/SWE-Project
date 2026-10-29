// Full list of announcements, with a filter by class.
import { useState } from "react";
import AnnouncementCard from "../components/AnnouncementCard.jsx";

export default function Announcements({ announcements, onMarkRead, onMarkAllRead }) {
  const [filter, setFilter] = useState("All");

  // Build the list of filter buttons from the courses in the data.
  const courses = ["All", ...new Set(announcements.map((n) => n.course))];

  const visible = filter === "All" ? announcements : announcements.filter((n) => n.course === filter);

  // Pinned announcements go first.
  const sorted = [...visible].sort((a, b) => b.pinned - a.pinned);

  const unread = announcements.filter((n) => !n.read).length;

  return (
    <div className="page">
      <header className="page-header row">
        <div>
          <h1>Announcements</h1>
          <p className="subtitle">
            {unread > 0 ? `${unread} unread from your classes` : "You're all caught up."}
          </p>
        </div>
        {unread > 0 && (
          <button className="btn" onClick={onMarkAllRead}>
            Mark all as read
          </button>
        )}
      </header>

      <div className="filters">
        {courses.map((c) => (
          <button key={c} className={filter === c ? "chip active" : "chip"} onClick={() => setFilter(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="announcement-list">
        {sorted.map((item) => (
          <AnnouncementCard key={item.id} item={item} onMarkRead={onMarkRead} />
        ))}
        {sorted.length === 0 && <p className="empty">No announcements for this class yet.</p>}
      </div>
    </div>
  );
}
