export type WorkEntry = {
  id: string;
  date: string;
  title: string;
  content: string;
  createdAt: string;
};

export type WorkEntryInput = Omit<WorkEntry, "id" | "createdAt">;
