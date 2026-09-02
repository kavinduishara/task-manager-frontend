import {useDraggable} from '@dnd-kit/react';

function Card({ id,title, label, description, assignee, doneAt }: { id:number;title: string; label: string; description: string; assignee: string; doneAt: Date }) {

    const {ref} = useDraggable({
        id,
    });
    const labelColor = label === 'design' ? 'blue' : label === 'development' ? 'green' : 'yellow';
    return (
        <div ref={ref} className="flex flex-col gap-1 p-3 bg-white rounded shadow ">
            
            <p className={`text-xs font-semibold text-gray-500 bg-${labelColor}-100`}>
                {label}
            </p>
            <h1 className="text-lg font-bold text-gray-800">{title}</h1>
            <p className="text-sm text-gray-600">{description}</p>
            <p className="text-sm text-gray-500">{assignee}</p>
            <p className="text-xs text-gray-400">{doneAt?.toLocaleString()}</p>
        </div>
    )
}

export default Card