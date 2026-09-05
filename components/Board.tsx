"use client"
import { DragDropProvider } from '@dnd-kit/react';
import Column from "./Column";
import type { TaskColumn, TaskStatus } from "@/types/task";
import { updateTaskStatus } from '@/libs/api/tasks';
import { useNotification } from "@/components/providers/NotificationProvider";
import axios from 'axios';

interface BoardProps {
    data: TaskColumn[];
    onChange: (columns: TaskColumn[]) => void;
}

function Board({ data, onChange }: BoardProps) {
    const { showNotification } = useNotification();
    
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
            await updateTaskStatus(sourceCardId, targetColumnId);
            showNotification("updated task status.","success");
        } catch (error) {
            console.error(
                "Failed to sync drag status with backend:",
                error
            );

            // Rollback UI
            onChange(originalColumns);
            

            if (axios.isAxiosError(error)) {
                showNotification(
                error.response?.data?.message ??
                "Failed to update task status.","error"
                );
            } else {
                showNotification("Failed to update task status.","error");
            }
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
