import {
    labelColors,
    labelTextColors,
    priorityStyles,
    priorityTextStyles,
    type CardProps,
} from "@/types/cardTypes";
import { useDraggable } from "@dnd-kit/react";
import { Clock, Dot } from "lucide-react";
import Avatar from "./Avatar";
import { useRouter } from "next/navigation";
import isOverdue from "@/libs/util/checkpassdue";
import formatRelativeTime from "@/libs/util/formatRelativeTime";





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
    

    return (
        <div
            ref={ref}
            className={`flex flex-col gap-1 p-3 bg-white  rounded-lg shadow`}
            onClick={() => router.push(`/task/${id}`)}
        >
            <div className="flex justify-between">
               {flag && (
                    <div
                        className={`text-xs p-2 rounded-sm w-fit font-semibold bg-${labelColors[flag]}-100 ${labelTextColors[flag]}`}
                    >
                        {flag.toLocaleUpperCase()}
                    </div>
                )} 

                {priority && (
                <div
                    className={`flex items-center justify-between rounded px-1 text-xs font-medium bg-${priorityStyles[priority]}-100 ${priorityTextStyles[priority]}`}
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
