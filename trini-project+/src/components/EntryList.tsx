import type { WorkEntry } from "../types";
import { EntryCard } from "./EntryCard";

type EntryListProps = {
  entries: WorkEntry[];
  onDelete: (id: string) => void;
};

export const EntryList = ({ entries, onDelete }: EntryListProps) => {
  if (entries.length === 0) {
    return (
      <div className="empty-state">
        <p>No entries yet. Start documenting your work and learnings!</p>
      </div>
    );
  }

  return (
    <div className="entry-list">
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} onDelete={onDelete} />
      ))}
    </div>
  );
};
