import { useDroppable } from '@dnd-kit/react';
import Card from './Card';
import type { Task, TaskStatus } from '@/types/task';

function Column({ id, title, cards }: { id: TaskStatus; title: string; cards: Task[] }) {
    const { ref } = useDroppable({
        id,
    });

    return (
        <div ref={ref} className="flex h-full min-h-0 w-full flex-col gap-3 rounded-2xl border border-gray-200 bg-gray-50/80 p-3 shadow-sm">
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-700">{title}</h3>
                    <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-gray-500 shadow-sm ring-1 ring-gray-200">
                        {cards.length}
                    </span>
                </div>
            </div>


            <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-1 py-1 pr-1.5 [scrollbar-color:#d1d5db_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb:hover]:bg-gray-400">
                {cards.length > 0 ? (
                    cards.map((card) => (
                        <Card
                            key={card._id}
                            id={card._id}
                            title={card.title}
                            flag={card.flag}
                            description={card.description}
                            priority={card.priority}
                            status={card.status}
                            assignee={card.assignee}
                            creatorId={card.creator._id}
                            assigneeId={card.assignee?._id}
                            subtasks={card.subtasks}
                            dueDate={card.dueDate ? new Date(card.dueDate) : null}
                        />
                    ))
                ) : (
                    <div className="flex min-h-24 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white/60">
                        <span className="text-xs font-medium text-gray-400">No tasks</span>
                    </div>
                )}
            </div>

        </div>
    );
}

export default Column;