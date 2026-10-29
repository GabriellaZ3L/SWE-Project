import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Announcements from "./pages/Announcements.jsx";
import Profile from "./pages/Profile.jsx";
import * as sample from "./data/sampleData.js";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [points, setPoints] = useState(sample.student.points);
  const [assignments, setAssignments] = useState(sample.assignments);
  const [announcements, setAnnouncements] = useState(sample.announcements);

  // Check or uncheck an assignment.
  // Finishing on time earns points. Unchecking takes them back.
  function toggleAssignment(id) {
    const item = assignments.find((a) => a.id === id);
    const onTime = item.dueInDays >= 0;

    if (onTime) {
      setPoints(item.done ? points - item.points : points + item.points);
    }
    setAssignments(assignments.map((a) => (a.id === id ? { ...a, done: !a.done } : a)));
  }

  function markRead(id) {
    setAnnouncements(announcements.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  function markAllRead() {
    setAnnouncements(announcements.map((n) => ({ ...n, read: true })));
  }

  const unreadCount = announcements.filter((n) => !n.read).length;

  return (
    <div className="app">
      <Sidebar page={page} onNavigate={setPage} unreadCount={unreadCount} />

      <main className="main">
        {page === "dashboard" && (
          <Dashboard
            student={sample.student}
            points={points}
            stages={sample.creatureStages}
            assignments={assignments}
            announcements={announcements}
            onToggle={toggleAssignment}
            onNavigate={setPage}
          />
        )}

        {page === "announcements" && (
          <Announcements
            announcements={announcements}
            onMarkRead={markRead}
            onMarkAllRead={markAllRead}
          />
        )}

        {page === "profile" && (
          <Profile
            student={sample.student}
            profile={sample.profile}
            points={points}
            stages={sample.creatureStages}
            classes={sample.classes}
            badges={sample.badges}
          />
        )}
      </main>
    </div>
  );
}
