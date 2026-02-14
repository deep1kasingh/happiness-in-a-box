"use client";

import { useState, useEffect, useCallback } from "react";
import { useJournalStore } from "@/store/use-journal-store";

interface JournalEditorProps {
  taskId: string;
  taskTitle: string;
  date: string;
  placeholder?: string;
}

export function JournalEditor({ taskId, taskTitle, date, placeholder }: JournalEditorProps) {
  const getEntry = useJournalStore((s) => s.getEntry);
  const saveEntry = useJournalStore((s) => s.saveEntry);

  const existing = getEntry(date, taskId);
  const [text, setText] = useState(existing?.content ?? "");
  const [saved, setSaved] = useState(false);

  // Sync when date or taskId changes
  useEffect(() => {
    const entry = getEntry(date, taskId);
    setText(entry?.content ?? "");
  }, [date, taskId, getEntry]);

  const handleSave = useCallback(() => {
    saveEntry(date, taskId, text);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [date, taskId, text, saveEntry]);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="rounded-2xl border-2 border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-800/50">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-display font-semibold text-stone-900 dark:text-stone-100">
          {taskTitle}
        </h3>
        {saved && (
          <span className="text-sm font-medium text-calm-600 dark:text-calm-400">
            Saved
          </span>
        )}
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleSave}
        placeholder={placeholder ?? "Start writing..."}
        rows={5}
        className="w-full resize-y rounded-xl border border-stone-200 bg-stone-50 p-3 text-stone-800 placeholder:text-stone-400 focus:border-calm-400 focus:outline-none focus:ring-2 focus:ring-calm-400/30 dark:border-stone-600 dark:bg-stone-900/50 dark:text-stone-200 dark:placeholder:text-stone-500 dark:focus:border-calm-500"
      />
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-stone-400 dark:text-stone-500">
          {wordCount} {wordCount === 1 ? "word" : "words"}
        </span>
        <button
          type="button"
          onClick={handleSave}
          className="rounded-lg bg-calm-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-calm-600 focus:outline-none focus:ring-2 focus:ring-calm-400 focus:ring-offset-2 dark:focus:ring-offset-stone-800"
        >
          Save
        </button>
      </div>
    </div>
  );
}
