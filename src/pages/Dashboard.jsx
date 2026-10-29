// The home page: stats, assignments, creature, and the newest announcements.
import StatCard from "../components/StatCard.jsx";
import AssignmentList from "../components/AssignmentList.jsx";
import CreatureCard from "../components/CreatureCard.jsx";
import AnnouncementCard from "../components/AnnouncementCard.jsx";

export default function Dashboard({ student, points, stages, assignments, announcements, onToggle, onNavigate }) {
  const dueThisWeek = assignments.filter((a) => !a.done && a.dueInDays >= 0 && a.dueInDays <= 7).length;
  const latest = announcements.slice(0, 3); // only show the 3 newest

  return (
    <div className="page">
      <header className="page-header">
        <h1>Welcome back, {student.name}</h1>
        <p className="subtitle">Finish work on time to earn points and grow your creature.</p>
      </header>

      <section className="stats-row">
        <StatCard label="Points" value={points} note="Redeemable" />
        <StatCard label="On-time streak" value={student.streak} note="assignments in a row" />
        <StatCard label="Due this week" value={dueThisWeek} note="still to do" />
      </section>

      <div className="dashboard-grid">
        <section className="card">
          <div className="card-header">
            <h2>Upcoming assignments</h2>
          </div>
          <AssignmentList assignments={assignments} onToggle={onToggle} />
        </section>

        <div className="side-column">
          <CreatureCard points={points} stages={stages} />

          <section className="card">
            <div className="card-header">
              <h2>Announcements</h2>
              <button className="btn-link" onClick={() => onNavigate("announcements")}>
                View all
              </button>
            </div>
            <div className="announcement-stack">
              {latest.map((item) => (
                <AnnouncementCard key={item.id} item={item} compact />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
