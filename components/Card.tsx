import {
    labelColors,
    priorityStyles,
    type CardProps,
} from "@/types/cardTypes";
import { useDraggable } from "@dnd-kit/react";
import {
    ChevronDown,
    ChevronUp,
    Clock,
    CircleCheck,
    Circle,
} from "lucide-react";
import Avatar from "./Avatar";
import { useRouter } from "next/navigation";
import isOverdue from "@/libs/util/checkpassdue";
import formatRelativeTime from "@/libs/util/formatRelativeTime";
import { useState } from "react";
import { updateSubtask } from "@/libs/api/tasks";
import { useUserDetails } from "./providers/UserDetailsProvider";
import { useNotification } from "./providers/NotificationProvider";

function Card({ id, title, flag, description, priority, assignee, dueDate, creatorId, assigneeId, subtasks = [] }: CardProps) {
    const router = useRouter();
    const { user } = useUserDetails();
    const { showNotification } = useNotification();

    const { ref } = useDraggable({ id });

    const [isExpanded, setIsExpanded] = useState(false);
    const [localSubtasks, setLocalSubtasks] = useState(subtasks);

    const canEditSubtasks = Boolean(
        user?.role === "ADMIN" ||
            user?._id === creatorId ||
            user?._id === assigneeId
    );

    const completedSubtasks = localSubtasks.filter(
        (subtask) => subtask.checked
    ).length;

    const subtaskProgress =
        localSubtasks.length > 0
            ? Math.round((completedSubtasks / localSubtasks.length) * 100)
            : 0;

    const overdue = dueDate ? isOverdue(dueDate) : false;

    const handleSubtaskToggle = async (
        subtaskId: string | undefined,
        checked: boolean
    ) => {
        if (!subtaskId || !canEditSubtasks) return;

        setLocalSubtasks((current) =>
            current.map((subtask) =>
                subtask._id === subtaskId
                    ? { ...subtask, checked }
                    : subtask
            )
        );

        try {
            await updateSubtask(String(id), subtaskId, { checked });
        } catch (error) {
            console.error("Updating subtask failed:", error);

            setLocalSubtasks((current) =>
                current.map((subtask) =>
                    subtask._id === subtaskId
                        ? { ...subtask, checked: !checked }
                        : subtask
                )
            );

            showNotification("Failed to update subtask", "error");
        }
    };

    return (
        <div
            ref={ref}
            onClick={() => router.push(`/task/${id}`)}
            className="group relative flex cursor-pointer flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg active:scale-[0.99]"
        >
            <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                    {flag && (
                        <span
                            className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${labelColors[flag]}`}
                        >
                            {flag}
                        </span>
                    )}
                </div>

                {priority && (
                    <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${priorityStyles[priority]}`}
                    >
                        {priority}
                    </span>
                )}
            </div>

            <div>
                <h2 className="line-clamp-2 text-[15px] font-semibold leading-5 text-slate-800 transition-colors group-hover:text-indigo-600">
                    {title}
                </h2>

                {description && (
                    <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-slate-500">
                        {description}
                    </p>
                )}
            </div>

            {localSubtasks.length > 0 && (
                <div
                    className="rounded-lg bg-slate-50 px-3 py-2.5"
                    onClick={(event) => event.stopPropagation()}
                >
                    <button
                        type="button"
                        onClick={() =>
                            setIsExpanded((current) => !current)
                        }
                        className="flex w-full items-center justify-between text-left"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-slate-600">
                                Subtasks
                            </span>

                            <span className="rounded-full bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-500 shadow-sm">
                                {completedSubtasks}/{localSubtasks.length}
                            </span>
                        </div>

                        {isExpanded ? (
                            <ChevronUp
                                size={15}
                                className="text-slate-400"
                            />
                        ) : (
                            <ChevronDown
                                size={15}
                                className="text-slate-400"
                            />
                        )}
                    </button>

                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-200">
                        <div
                            className="h-full rounded-full bg-indigo-500 transition-all duration-300"
                            style={{
                                width: `${subtaskProgress}%`,
                            }}
                        />
                    </div>

                    {isExpanded && (
                        <div className="mt-3 space-y-2 border-t border-slate-200 pt-2">
                            {localSubtasks.map((subtask, index) => (
                                <label
                                    key={
                                        subtask._id ??
                                        `subtask-${index}`
                                    }
                                    className="flex cursor-pointer items-start gap-2 text-xs"
                                >
                                    <input
                                        type="checkbox"
                                        checked={Boolean(
                                            subtask.checked
                                        )}
                                        disabled={
                                            !canEditSubtasks ||
                                            !subtask._id
                                        }
                                        onChange={(event) =>
                                            handleSubtaskToggle(
                                                subtask._id,
                                                event.target.checked
                                            )
                                        }
                                        className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-indigo-600"
                                    />

                                    <span
                                        className={
                                            subtask.checked
                                                ? "text-slate-400 line-through"
                                                : "text-slate-600"
                                        }
                                    >
                                        {subtask.task}
                                    </span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {(dueDate || assignee) && (
                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                    <div>
                        {assignee ? (
                            <Avatar user={assignee} />
                        ) : (
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-500">
                                Unassigned
                            </span>
                        )}
                    </div>

                    {dueDate && (
                        <div
                            className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium ${
                                overdue
                                    ? "bg-red-50 text-red-500"
                                    : "bg-slate-50 text-slate-500"
                            }`}
                        >
                            <Clock size={13} />
                            <span>
                                {formatRelativeTime(dueDate)}
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Card;