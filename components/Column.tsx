import { useDroppable } from '@dnd-kit/react';
import Card from './Card';
import type { Task, TaskStatus } from '@/types/task';

function Column({ id, title, cards }: { id: TaskStatus; title: string; cards: Task[] }) {
    const {ref} = useDroppable({
        id,
    });
    return (
    <div ref={ref} className="flex h-full min-h-0 w-full  flex-col gap-2 rounded bg-gray-100 p-4 shadow">
      
        <div className="flex items-center">
            <h3 className="text-sm text-gray-500 font-semibold">{title}</h3>
            <span className="text-sm rounded-full bg-gray-200 text-gray-700 px-2 py-1 ml-2">
              {cards.length}
            </span>
        </div>
      
      <div className='flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-4'>
        {cards.map((card) => (
          <Card 
            key={card._id} 
            id={card._id} 
            title={card.title} 
            flag={card.flag}
            description={card.description} 
            priority={card.priority}
            status={card.status}
            assignee={card.assignee} 
            dueDate={card.dueDate ? new Date(card.dueDate) : null}
          />
        ))}
      </div>
    </div>
  )
}

export default Column