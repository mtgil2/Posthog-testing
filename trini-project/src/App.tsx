import { useState, useEffect } from "react";
import { usePostHog } from "posthog-js/react";
import { EntryForm } from "./components/EntryForm";
import { EntryList } from "./components/EntryList";
import type { WorkEntry, WorkEntryInput } from "./types";
import { getEntries, saveEntry, deleteEntry } from "./utils/storage";

export const App = () => {
  const posthog = usePostHog();
  const [entries, setEntries] = useState<WorkEntry[]>([]);
  const [showForm, setShowForm] = useState(false);


  useEffect(() => {
    setEntries(getEntries());
  }, []);

  useEffect(() => {
    if (!posthog) return;

    // Ensure feature flags are loaded
    posthog.onFeatureFlags(() => {
      console.log('Feature flags loaded');
      console.log('  - "show-title":', posthog.isFeatureEnabled('show-title'));
      console.log('  - "new-entry-button":', posthog.isFeatureEnabled('new-entry-button'));
    });

    // Reload flags on mount to get latest values
    posthog.reloadFeatureFlags();
  }, [posthog]);

  // Check feature flags directly - most reactive approach
  // Note: You may need to refresh the page after changing flags in PostHog dashboard
  const showTitle = posthog?.isFeatureEnabled('show-title') ?? false;
  const showNewEntryButton = posthog?.isFeatureEnabled('new-entry-button') ?? false;

  const handleSubmit = (input: WorkEntryInput): void => {
    const newEntry: WorkEntry = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    saveEntry(newEntry);
    setEntries(getEntries());
    setShowForm(false);
  };

  const handleDelete = (id: string): void => {
    deleteEntry(id);
    setEntries(getEntries());
  };

  return (
    <div className="app">
      <header className="app-header">
        {showTitle && <h1 className="app-title">Buk Journal</h1>}
        {!showForm && showNewEntryButton && (
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
          >
            New Entry
          </button>
        )}
      </header>

      <main className="app-main">
        {showForm ? (
          <div className="form-container">
            <EntryForm
              onSubmit={handleSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        ) : (
          <EntryList entries={entries} onDelete={handleDelete} />
        )}
      </main>
    </div>
  );
};
