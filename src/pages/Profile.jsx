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

export default function Profile({ student, profile, onRename, points, stages, classes, badges }) {
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

  // Edit Username on Profile Page
  const [editing, setEditing] = useState(false); // Is the text box open?
  const [newName, setNewName] = useState(""); // What's typed in the box.
  const [saving, setSaving] = useState(false); // Waiting for Supabase to respond.
  const [nameError, setNameError] = useState(""); // Error message if the name is invalid.

  // Open the edit box, starting with the current name.
  function startEditing() {
    setNewName(profile.fullName);
    setNameError("");
    setEditing(true);
  }

  // Close the edit box without saving changes.
  function cancelEditing() {
    setEditing(false);
    setNameError("");
  }

  // Runs when "Save" is clicked (or Enter is pressed).
  async function saveName(event) {
    event.preventDefault(); // Stops the browser from reloading the page when the form is submitted.
    const trimmed = newName.trim();

    // Same rule as the signup page.
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(trimmed)) {
      setNameError("Use 3–20 letters, numbers, or underscores.");
      return;
    }

    // If nothing is changed, close the box.
    if (trimmed === profile.fullName) {
      setEditing(false);
      return;
    }

    setSaving(true);
    const error = await onRename(trimmed); // Calls the function passed in from App.jsx.
    setSaving(false);

    if (error) {
      setNameError(error); // Show the error message from Supabase.
      return;
    }

    setEditing(false); // Close the box if the name was saved successfully.
  }

  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <div className="page">
      {/* Top Section (Contains name and other info) */}
      <section className="card profile-hero">
        <div className="avatar" aria-hidden="true">{getInitials(profile.fullName)}</div>
        <div className="profile-info">
          {editing ? (
            <form className="name-form" onSubmit={saveName} noValidate>
              <label htmlFor="new-name" className="name-label">Username</label>
              <div className="name-row">
                <input
                  id="new-name"
                  className={nameError ? "input has-error" : "input"}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  maxLength={20}
                  autoFocus
                />
                <button type="submit" className="btn" disabled={saving}>
                  {saving ? "Saving..." : "Save"}
                </button>
                <button type="button" className="btn-secondary" onClick={cancelEditing} disabled={saving}>
                  Cancel
                </button>
              </div>
              {nameError && <p className="field-error">{nameError}</p>}
            </form>
          ) : (
            <div className="name-row">
              <h1>{profile.fullName}</h1>
              <button type="button" className="btn-link" onClick={startEditing}>
                Edit
              </button>
            </div>
          )}
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
