import { useDraggable } from "@dnd-kit/react";
import { Clock } from "lucide-react";

type Label =
    | "design"
    | "development"
    | "backend"
    | "documentation"
    | "feature"
    | "frontend"
    | "devops"
    | "bug";

interface CardProps {
    id: number;
    title: string;
    label?: Label;
    description?: string;
    assignee?: { name: string; profilePicture: string };
    doneAt?: Date | null;
}

const labelColors: Record<Label, string> = {
    design: "bg-blue-100 text-blue-700",
    development: "bg-green-100 text-green-700",
    backend: "bg-purple-100 text-purple-700",
    documentation: "bg-gray-100 text-gray-700",
    feature: "bg-yellow-100 text-yellow-700",
    frontend: "bg-cyan-100 text-cyan-700",
    devops: "bg-orange-100 text-orange-700",
    bug: "bg-red-100 text-red-700",
};
function formatRelativeTime(date: Date | null) { 
    if (!date) return 'Not completed'; 
    const elapsedSeconds = Math.round((date.getTime() - Date.now()) / 1000); 
    const units = [ 
        { unit: 'year', seconds: 31536000 }, 
        { unit: 'month', seconds: 2592000 }, 
        { unit: 'day', seconds: 86400 }, 
        { unit: 'hour', seconds: 3600 }, 
        { unit: 'minute', seconds: 60 }, 
        { unit: 'second', seconds: 1 }, 
    ] as const; 
    const relativeUnit = units.find(({ seconds }) => 
        Math.abs(elapsedSeconds) >= seconds) ?? units[units.length - 1]; 
    const value = Math.round(elapsedSeconds / relativeUnit.seconds); 
    return new Intl
    .RelativeTimeFormat('en', { numeric: 'auto' })
    .format(value, relativeUnit.unit); 
}

function Card({
    id,
    title,
    label,
    description,
    assignee,
    doneAt
}: CardProps) {
    const { ref } = useDraggable({ id });

    return (
        <div
            ref={ref}
            className="flex flex-col gap-1 p-3 bg-white rounded-lg shadow"
        >
            <div>
               {label && (
                    <div className={`text-xs p-2 rounded-sm w-fit font-semibold ${labelColors[label]}`}>
                        {label.toLocaleUpperCase()}
                    </div>
                )} 
            </div>
            

            <h1 className="text-lg font-semibold text-gray-800">
                {title}
            </h1>

            {description && (
                <p className="text-md text-gray-600">
                    {description}
                </p>
            )}

            <div className="flex justify-between items-center mt-2 border-t border-gray-200 pt-2">
                <div className="flex items-center gap-2">
                    {assignee?.profilePicture && (
                        <img
                            src={assignee.profilePicture}
                            className="w-6 h-6 rounded-full"
                        />
                    )}
                    {!assignee?.profilePicture && assignee?.name && (
                        <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-700">
                            {assignee.name.split(' ')[0].charAt(0).toUpperCase() + assignee.name.split(' ')[1]?.charAt(0).toUpperCase()}
                        </div>
                    )}
                    {!assignee && (
                        <span className="text-sm text-gray-500 rounded-full px-2 py-1 bg-gray-100">
                            Unassigned
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock size={16} />
                    {formatRelativeTime(doneAt ?? null)}
                </div>
            </div>
        </div>
    );
}

export default Card;