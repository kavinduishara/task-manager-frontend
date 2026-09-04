"use client"
import {DragDropProvider} from '@dnd-kit/react';

import Column from "./Column"
import type { TaskColumn } from "@/types/task";


function Board({ data, onChange }: { data: TaskColumn[]; onChange: (columns: TaskColumn[]) => void }) {

   

    return (
        
        <div className="flex h-full min-h-0 w-full gap-4">
            <DragDropProvider
                onDragEnd={(event) => {
                    if (event.canceled) return;

                    const {target} = event.operation;
                    const sourceColumnIndex = data.findIndex((column) =>
                        column.cards.some((card) => card._id === event.operation.source?.id)
                    );
                    const targetColumnIndex = data.findIndex((column) => column.id === target?.id);
                    if (sourceColumnIndex === -1 || targetColumnIndex === -1) return;

                    const updatedColumns = data.map((column) => ({
                        ...column,
                        cards: [...column.cards],
                    }));
                    const sourceCardIndex = updatedColumns[sourceColumnIndex].cards.findIndex(
                        (card) => card._id === event.operation.source?.id
                    );
                    if (sourceCardIndex === -1) return;

                    const [movedCard] = updatedColumns[sourceColumnIndex].cards.splice(sourceCardIndex, 1);
                    updatedColumns[targetColumnIndex].cards.push(movedCard);
                    onChange(updatedColumns);
                }}
            >
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
    )
}

export default Board