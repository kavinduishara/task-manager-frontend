"use client"
import { DragDropProvider } from '@dnd-kit/react';
import Column from "./Column";
import type { TaskColumn, TaskStatus } from "@/types/task";
import { updateTask } from '@/libs/api/tasks';

const STATUS_MAP: Record<string, TaskStatus> = {
    "todo-column": "TODO",
    "in-progress-column": "IN_PROGRESS",
    "done-column": "DONE"
};

interface BoardProps {
    data: TaskColumn[];
    onChange: (columns: TaskColumn[]) => void;
}

function Board({ data, onChange }: BoardProps) {
    
    const handleDragEnd = async (event: any) => {
        if (event.canceled) return;

        const { target, source } = event.operation;
        if (!source || !target) return;

        const sourceCardId = source.id;
        const targetColumnId = target.id;

        // Find positions
        const sourceColumnIndex = data.findIndex(col => col.cards.some(card => card._id === sourceCardId));
        const targetColumnIndex = data.findIndex(col => col.id === targetColumnId);

        if (sourceColumnIndex === -1 || targetColumnIndex === -1) return;
        if (sourceColumnIndex === targetColumnIndex) return; // Dropped in the same column

        // Save original state for a rollback fallback
        const originalColumns = data;

        // 2. Perform Optimistic UI calculation immediately
        const updatedColumns = data.map(col => ({ ...col, cards: [...col.cards] }));
        const sourceCards = updatedColumns[sourceColumnIndex].cards;
        const targetCards = updatedColumns[targetColumnIndex].cards;

        const sourceCardIndex = sourceCards.findIndex(card => card._id === sourceCardId);
        if (sourceCardIndex === -1) return;

        // Splice out from source and push into target column
        const [movedCard] = sourceCards.splice(sourceCardIndex, 1);
        targetCards.push(movedCard);

        // 3. Update the UI state instantly so it feels responsive
        onChange(updatedColumns);

        // 4. Fire the network request in the background
        try {
            console.log(targetColumnId)
            console.log(sourceCardId, targetColumnId)
            await updateTask(sourceCardId, {"status":targetColumnId});
        } catch (error) {
            console.error("Failed to sync drag status with backend:", error);
            // 5. Rollback UI if network fails
            onChange(originalColumns);
        }
    };

    return (
        <div className="flex h-full min-full w-full gap-4">
            <DragDropProvider onDragEnd={handleDragEnd}>
                {data.map((column) => (
                    <Column 
                        id={column.id} 
                        key={column.id} 
                        title={column.title} 
                        cards={column.cards}
                    />
                ))}
            </DragDropProvider>
        </div>
    );
}

export default Board;
