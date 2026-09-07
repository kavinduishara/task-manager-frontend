import { labelColors, type CardProps } from "@/types/cardTypes";
import { useDraggable } from "@dnd-kit/react";
import { Clock, Dot } from "lucide-react";
import Avatar from "./Avatar";
import { useRouter } from "next/navigation";
import isOverdue from "@/libs/util/checkpassdue";



function formatRelativeTime(date: Date | null) { 
    if (!date) return ''; 
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
    flag,
    description,
    priority,
    assignee,
    dueDate
}: CardProps) {
    const router = useRouter();
    const { ref } = useDraggable({ id });
    const priorityStyles = {
        Low: "bg-slate-100 text-slate-600",
        Med: "bg-blue-100 text-blue-700",
        High: "bg-orange-100 text-orange-700",
        Urgent: "bg-red-100 text-red-700",
    };

    return (
        <div
            ref={ref}
            className={`flex flex-col gap-1 p-3 bg-white  rounded-lg shadow`}
            onClick={() => router.push(`/task/${id}`)}
        >
            <div className="flex justify-between">
               {flag && (
                    <div className={`text-xs p-2 rounded-sm w-fit font-semibold ${flag in labelColors ? labelColors[flag as keyof typeof labelColors] : "bg-gray-100 text-gray-700"}`}>
                        {flag.toLocaleUpperCase()}
                    </div>
                )} 

                {priority && (
                <div
                    className={`flex items-center justify-between  rounded px-1 text-xs font-medium ${
                    priorityStyles[priority as keyof typeof priorityStyles]
                    }`}
                >
                    <Dot size={30} />
                    {priority}
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

            {(dueDate || assignee) && (
                <div className="flex justify-between items-center mt-2 border-t border-gray-200 pt-2">
                    {assignee && <Avatar user={assignee} />}
                    {!assignee && (
                        <span className="text-sm text-gray-500 rounded-full px-2 py-1 bg-gray-100">
                            Unassigned
                        </span>
                    )}
                    {dueDate && (
                    <div className={`flex items-center gap-1 text-xs  ${isOverdue(dueDate)?"text-red-400":"text-gray-400"}`}>
                        <Clock size={16} />
                        {formatRelativeTime(dueDate ?? null)}
                    </div>
                )}
                </div>
            )}
                
        </div>
    );
}

export default Card;
