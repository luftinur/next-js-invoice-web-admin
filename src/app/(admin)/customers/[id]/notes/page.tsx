"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Clock } from "lucide-react";
import { formatDateTime } from "@/lib/formatting";

interface Note {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

export default function CustomerNotesPage() {
  const [notes, setNotes] = useState<Note[]>([
    { id: "1", content: "Prefers email communication for payment reminders.", author: "John Doe", createdAt: "2026-05-10T09:00:00" },
    { id: "2", content: "Discussed volume discount for quarterly billing. Follow up in June.", author: "Jane Smith", createdAt: "2026-04-28T14:30:00" },
  ]);
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (!newNote.trim()) return;
    setNotes([{ id: String(Date.now()), content: newNote, author: "John Doe", createdAt: new Date().toISOString() }, ...notes]);
    setNewNote("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Notes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Textarea
            placeholder="Add a note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[60px]"
          />
          <Button size="icon" onClick={addNote} disabled={!newNote.trim()} className="shrink-0">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-3">
          {notes.map((note) => (
            <div key={note.id} className="rounded-lg border p-3">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                <button
                  type="button"
                  onClick={() => setNotes((prev) => prev.filter((n) => n.id !== note.id))}
                  className="shrink-0 text-muted-foreground hover:text-destructive cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {note.author} &middot; {formatDateTime(note.createdAt)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
