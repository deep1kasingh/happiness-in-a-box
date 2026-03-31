"use client";

import { useState, useRef, useEffect } from "react";
import type { Task } from "@/types";

interface JournalTaskCardProps {
  task: Task;
  value: string;
  onChange: (text: string) => void;
}

export function JournalTaskCard({ task, value, onChange }: JournalTaskCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [draft, setDraft] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasContent = value.trim().length > 0;

  // Sync draft when value changes externally (e.g. hydration)
  useEffect(() => {
    setDraft(value);
  }, [value]);

  // Auto-focus textarea on expand
  useEffect(() => {
    if (expanded) {
      textareaRef.current?.focus();
    }
  }, [expanded]);

  function handleSave() {
    onChange(draft);
    setExpanded(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Escape") {
      setDraft(value); // discard
      setExpanded(false);
    }
  }

  return (
    <div
      className={
        "rounded-2xl border-2 transition " +
        (hasContent
          ? "border-calm-300 bg-calm-50 dark:border-calm-700 dark:bg-calm-900/20"
          : "border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-800/50")
      }
    >
      {/* Header row — always visible */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-start gap-4 p-4 text-left focus:outline-none focus:ring-2 focus:ring-warmth-400 focus:ring-offset-2 dark:focus:ring-offset-[var(--bg)] rounded-2xl"
        aria-expanded={expanded}
      >
        <span
          className={
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium transition " +
            (hasContent
              ? "border-calm-500 bg-calm-500 text-white"
              : "border-stone-300 text-stone-500 dark:border-stone-600")
          }
          aria-hidden
        >
          {hasContent ? "✓" : "✏️"}
        </span>
        <div className="min-w-0 flex-1">
          <div className="font-display font-semibold text-stone-900 dark:text-stone-100">
            {task.title}
          </div>
          {task.description && (
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{task.description}</p>
          )}
          {hasContent && !expanded && (
            <p className="mt-1 line-clamp-2 text-sm italic text-stone-500 dark:text-stone-400">
              {value}
            </p>
          )}
        </div>
        <span className="mt-1 shrink-0 text-stone-400 transition" aria-hidden>
          {expanded ? "▲" : "▼"}
        </span>
      </button>

      {/* Expandable journal area */}
      {expanded && (
        <div className="px-4 pb-4">
          <textarea
            ref={textareaRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write your thoughts here…"
            rows={6}
            className="w-full resize-none rounded-xl border border-stone-200 bg-white p-3 text-sm text-stone-800 placeholder-stone-400 focus:border-warmth-400 focus:outline-none focus:ring-1 focus:ring-warmth-400 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100 dark:placeholder-stone-500 dark:focus:border-warmth-600"
          />
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="text-xs text-stone-400">{draft.trim().length} chars · Esc to discard</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => { setDraft(value); setExpanded(false); }}
                className="rounded-lg px-3 py-1.5 text-sm text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={!draft.trim()}
                className="rounded-lg bg-warmth-500 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-warmth-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
