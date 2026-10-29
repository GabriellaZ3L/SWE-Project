// Turns a number of days into friendly text.
function dueLabel(days) {
  if (days < 0) return "Overdue";
  if (days === 0) return "Due today";
  if (days === 1) return "Due tomorrow";
  return `Due in ${days} days`;
}

export default function AssignmentList({ assignments, onToggle }) {
  return (
    <ul className="assignment-list">
      {assignments.map((a) => (
        <li key={a.id} className={a.done ? "assignment done" : "assignment"}>
          <label className="assignment-check">
            <input type="checkbox" checked={a.done} onChange={() => onToggle(a.id)} />
            <span className="assignment-info">
              <span className="assignment-title">{a.title}</span>
              <span className="assignment-meta">
                {a.course} ·{" "}
                <span className={a.dueInDays <= 0 && !a.done ? "due urgent" : "due"}>
                  {a.done ? "Done" : dueLabel(a.dueInDays)}
                </span>
              </span>
            </span>
          </label>
          <span className="points-pill">+{a.points}</span>
        </li>
      ))}
    </ul>
  );
}
