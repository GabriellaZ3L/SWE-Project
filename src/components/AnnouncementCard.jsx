// One announcement from a class owner (Teacher).
// "compact" = short version used on the Dashboard (no body text, no button).
export default function AnnouncementCard({ item, onMarkRead, compact = false }) {
  return (
    <article className={item.read ? "announcement" : "announcement unread"}>
      <div className="announcement-top">
        <span className="course-tag">{item.course}</span>
        {item.pinned && <span className="pinned">Pinned</span>}
        <span className="time">{item.postedAgo}</span>
      </div>

      <h3 className="announcement-title">
        {!item.read && <span className="unread-dot" aria-label="Unread" />}
        {item.title}
      </h3>

      {!compact && (
        <>
          <p className="announcement-body">{item.body}</p>
          <div className="announcement-footer">
            <span className="author">{item.author}</span>
            {!item.read && (
              <button className="btn-link" onClick={() => onMarkRead(item.id)}>
                Mark as read
              </button>
            )}
          </div>
        </>
      )}
    </article>
  );
}
