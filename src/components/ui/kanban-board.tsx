"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { GripVertical, Plus, MoreHorizontal } from "lucide-react";

interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  priority?: "low" | "medium" | "high" | "urgent";
}

interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
}

interface KanbanBoardProps {
  columns: KanbanColumn[];
  onCardMove?: (cardId: string, fromColumn: string, toColumn: string) => void;
  className?: string;
}

const priorityColors: Record<string, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-info/10 text-info",
  high: "bg-warning/10 text-warning",
  urgent: "bg-destructive/10 text-destructive",
};

export function KanbanBoard({ columns: initialColumns, onCardMove, className }: KanbanBoardProps) {
  const [columns, setColumns] = useState(initialColumns);
  const [dragCard, setDragCard] = useState<{ cardId: string; colId: string } | null>(null);

  const handleDragStart = (cardId: string, colId: string) => {
    setDragCard({ cardId, colId });
  };

  const handleDrop = (targetColId: string) => {
    if (!dragCard) return;
    if (dragCard.colId === targetColId) {
      setDragCard(null);
      return;
    }

    setColumns((prev) => {
      const fromCol = prev.find((c) => c.id === dragCard.colId);
      const toCol = prev.find((c) => c.id === targetColId);
      if (!fromCol || !toCol) return prev;

      const card = fromCol.cards.find((c) => c.id === dragCard.cardId);
      if (!card) return prev;

      return prev.map((col) => {
        if (col.id === dragCard.colId) {
          return { ...col, cards: col.cards.filter((c) => c.id !== dragCard.cardId) };
        }
        if (col.id === targetColId) {
          return { ...col, cards: [...col.cards, card] };
        }
        return col;
      });
    });

    onCardMove?.(dragCard.cardId, dragCard.colId, targetColId);
    setDragCard(null);
  };

  return (
    <div className={cn("flex gap-4 overflow-x-auto pb-4", className)}>
      {columns.map((col) => (
        <div
          key={col.id}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(col.id)}
          className="flex w-72 shrink-0 flex-col rounded-xl border bg-muted/30"
        >
          <div className="flex items-center justify-between border-b px-3 py-2.5">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium">{col.title}</h3>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                {col.cards.length}
              </span>
            </div>
            <button className="rounded p-1 hover:bg-muted cursor-pointer">
              <Plus className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
          <div className="flex flex-col gap-2 p-2">
            {col.cards.map((card) => (
              <div
                key={card.id}
                draggable
                onDragStart={() => handleDragStart(card.id, col.id)}
                className={cn(
                  "rounded-lg border bg-card p-3 shadow-sm transition-shadow hover:shadow-md",
                  dragCard?.cardId === card.id && "opacity-50"
                )}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="cursor-grab active:cursor-grabbing rounded p-0.5 hover:bg-muted"
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <button className="rounded p-0.5 hover:bg-muted cursor-pointer">
                    <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                </div>
                <p className="mt-1 text-sm font-medium">{card.title}</p>
                {card.description && (
                  <p className="mt-1 text-xs text-muted-foreground">{card.description}</p>
                )}
                <div className="mt-3 flex items-center justify-between">
                  {card.priority && (
                    <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-medium uppercase", priorityColors[card.priority])}>
                      {card.priority}
                    </span>
                  )}
                  {card.assignee && (
                    <span className="text-xs text-muted-foreground">{card.assignee}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
