import { useDroppable } from '@dnd-kit/react';
import Card from './Card';

function Column({ id, title, count, cards }: { id:number;title: string; count: number; cards: any[] }) {
    const {ref} = useDroppable({
        id,
    });
    return (
    <div ref={ref} className="flex flex-col gap-2 p-4 bg-white rounded shadow min-w-[200px] max-h-11/12 ">
      
        <div className="flex items-center">
            <h3 className="text-sm text-gray-500 font-semibold">{title}</h3>
            <span className="text-sm rounded-full bg-gray-200 text-gray-700 px-2 py-1 ml-2">
                {count}
            </span>
        </div>
      
      <div className='flex flex-col gap-2 p-4 overflow-auto'>
        {cards.map((card) => (
          <Card 
            key={card.id} 
            id={card.id} 
            title={card.title} 
            label={card.label} 
            description={card.description} 
            assignee={card.assignee} 
            doneAt={card.doneAt}
          />
        ))}
      </div>
    </div>
  )
}

export default Column