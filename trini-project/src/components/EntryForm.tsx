import { useState } from "react";
import type { WorkEntryInput } from "../types";

type EntryFormProps = {
  onSubmit: (entry: WorkEntryInput) => void;
  onCancel?: () => void;
};

export const EntryForm = ({ onSubmit, onCancel }: EntryFormProps) => {
  const [formData, setFormData] = useState<WorkEntryInput>({
    date: new Date().toISOString().split("T")[0],
    title: "",
    content: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onSubmit(formData);
    setFormData({
      date: new Date().toISOString().split("T")[0],
      title: "",
      content: "",
    });
  };

  const handleChange = (
    field: keyof WorkEntryInput,
    value: string
  ): void => {
    setFormData((prev: WorkEntryInput) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="entry-form">
      <input
        type="date"
        value={formData.date}
        onChange={(e) => handleChange("date", e.target.value)}
        className="form-input"
        required
      />
      <input
        type="text"
        placeholder="Entry title (e.g., 'Team Meeting', 'Code Review', 'New Feature')"
        value={formData.title}
        onChange={(e) => handleChange("title", e.target.value)}
        className="form-input"
        required
      />
      <textarea
        placeholder="Write your work notes, learnings, tasks, or reflections..."
        value={formData.content}
        onChange={(e) => handleChange("content", e.target.value)}
        className="form-textarea"
        rows={10}
      />
      <div className="form-actions">
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          Save Entry
        </button>
      </div>
    </form>
  );
};
