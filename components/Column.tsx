import Card from './Card';

function Column({ title, count, cards }: { title: string; count: number; cards: any[] }) {
  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded shadow min-w-[200px] max-h-11/12 overflow-auto">
      
        <div className="flex items-center">
            <h3 className="text-sm text-gray-500 font-semibold">{title}</h3>
            <span className="text-sm rounded-full bg-gray-200 text-gray-700 px-2 py-1 ml-2">
                {count}
            </span>
        </div>
      
      <div>
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