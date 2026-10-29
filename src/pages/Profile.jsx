// The Profile page: who the student is, their stats, badges, classes, and settings.
import { useState } from "react";
import StatCard from "../components/StatCard.jsx";
import CreatureCard from "../components/CreatureCard.jsx";
import "./profile.css"; // styles that only this page uses

// Turns "Alex Morgan" into "AM" for the profile circle.
function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// An on/off switch. It's really a checkbox styled to look like a switch (see profile.css).
function Toggle({ label, description, checked, onChange }) {
  return (
    <label className="toggle-row">
      <span>
        <span className="toggle-label">{label}</span>
        <span className="toggle-description">{description}</span>
      </span>
      <input type="checkbox" className="toggle" checked={checked} onChange={onChange} />
    </label>
  );
}

export default function Profile({ student, profile, points, stages, classes, badges }) {
  // Notification settings. Later these could be saved to Supabase.
  const [settings, setSettings] = useState({
    reminders: true,
    announcements: true,
    weeklySummary: false,
  });

  // Flip one setting on or off, keeping the others the same.
  function toggleSetting(name) {
    setSettings({ ...settings, [name]: !settings[name] });
  }

  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <div className="page">
      {/* Top Section (Contains name and other info) */}
      <section className="card profile-hero">
        <div className="avatar" aria-hidden="true">{getInitials(profile.fullName)}</div>
        <div className="profile-info">
          <h1>{profile.fullName}</h1>
          <p className="subtitle">{profile.major} · {profile.year}</p>
          <p className="profile-meta">
            {profile.email} · Member since {profile.memberSince}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-row profile-stats">
        <StatCard label="Points" value={points} note="Redeemable" />
        <StatCard label="Current streak" value={student.streak} note={`Best: ${profile.bestStreak}`} />
        <StatCard label="On-time rate" value={`${profile.onTimeRate}%`} note="all classes" />
        <StatCard label="Completed" value={profile.completed} note="assignments" />
      </section>

      <div className="dashboard-grid">
        <div className="side-column">
          {/* Badges */}
          <section className="card">
            <div className="card-header">
              <h2>Badges</h2>
              <span className="count-text">{earnedCount} of {badges.length} earned</span>
            </div>
            <ul className="badge-grid">
              {badges.map((badge) => (
                <li key={badge.id} className={badge.earned ? "badge-item" : "badge-item locked"}>
                  <span className="badge-icon" aria-hidden="true">{badge.icon}</span>
                  <span className="badge-name">{badge.name}</span>
                  <span className="badge-description">{badge.description}</span>
                  {!badge.earned && <span className="locked-text">Locked</span>}
                </li>
              ))}
            </ul>
          </section>

          {/* Classes */}
          <section className="card">
            <div className="card-header">
              <h2>My classes</h2>
            </div>
            <ul className="class-list">
              {classes.map((c) => {
                const percent = Math.round((c.onTime / c.total) * 100);
                return (
                  <li key={c.id} className="class-item">
                    <div className="class-top">
                      <span>
                        <span className="class-name">{c.name}</span>
                        <span className="class-meta">{c.course} · {c.instructor}</span>
                      </span>
                      <span className="class-score">{c.onTime}/{c.total} on time</span>
                    </div>
                    <div className="progress small">
                      <div className="progress-fill" style={{ width: `${percent}%` }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

        <div className="side-column">
          <CreatureCard points={points} stages={stages} />

          {/* Settings */}
          <section className="card">
            <div className="card-header">
              <h2>Notifications</h2>
            </div>
            <div className="toggle-list">
              <Toggle
                label="Assignment reminders"
                description="Reminders from class owners before work is due"
                checked={settings.reminders}
                onChange={() => toggleSetting("reminders")}
              />
              <Toggle
                label="New announcements"
                description="When a class posts an announcement"
                checked={settings.announcements}
                onChange={() => toggleSetting("announcements")}
              />
              <Toggle
                label="Weekly summary"
                description="Your points and progress every Sunday"
                checked={settings.weeklySummary}
                onChange={() => toggleSetting("weeklySummary")}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
