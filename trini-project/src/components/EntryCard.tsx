import type { WorkEntry } from "../types";

type EntryCardProps = {
  entry: WorkEntry;
  onDelete: (id: string) => void;
};

export const EntryCard = ({ entry, onDelete }: EntryCardProps) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article className="entry-card">
      <div className="entry-header">
        <div className="entry-meta">
          <h2 className="entry-title">{entry.title}</h2>
          <span className="entry-date">{formatDate(entry.date)}</span>
        </div>
        <button
          onClick={() => onDelete(entry.id)}
          className="btn-delete"
          aria-label="Delete entry"
        >
          ×
        </button>
      </div>
      {entry.content && (
        <p className="entry-content">{entry.content}</p>
      )}
    </article>
  );
};
