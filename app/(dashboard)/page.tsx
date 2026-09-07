"use client"
import Board from "@/components/Board";
import BoardToolbar from "@/components/BoardToolbar";
import { getTasks } from "@/libs/api/tasks";
import { getAllUsers } from "@/libs/api/users";
import { type Label, type Priority } from "@/types/cardTypes";
import type { Task, TaskColumn, TaskUser } from "@/types/task";
import { UserDetails } from "@/types/user";
import { useEffect, useMemo, useState } from "react";

function makeColumns(tasks: Task[]): TaskColumn[] {
  return [
    {
      id: "TODO",
      title: "To do",
      cards: tasks.filter((task) => task.status === "TODO"),
    },
    {
      id: "IN_PROGRESS",
      title: "In progress",
      cards: tasks.filter((task) => task.status === "IN_PROGRESS"),
    },
    {
      id: "DONE",
      title: "Done",
      cards: tasks.filter((task) => task.status === "DONE"),
    },
  ];
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<UserDetails[]>([]);
  const [query, setQuery] = useState("");
  const [label, setLabel] = useState<Label | "">("");
  const [priority, setPriority] = useState<Priority | "">("");
  const [assignee, setAssignee] = useState("");
  const [dueDateSort, setDueDateSort] = useState<"asc" | "desc" | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [taskData, userData] = await Promise.all([getTasks(), getAllUsers()]);
        setTasks(taskData);
        setUsers(userData);
      } catch (error) {
        console.error("Fetching dashboard data failed:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const visibleTasks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = tasks.filter((task) => {
      const matchesQuery = !normalizedQuery || task.title.toLowerCase().includes(normalizedQuery);
      const matchesLabel = !label || task.flag === label;
      const matchesPriority = !priority || task.priority === priority;
      const matchesAssignee = !assignee || task.assignee?._id === assignee;
      return matchesQuery && matchesLabel && matchesPriority && matchesAssignee;
    });

    return [...filtered].sort((first, second) => {
      if (!dueDateSort) return 0;
      if (!first.dueDate) return 1;
      if (!second.dueDate) return -1;
      const difference = new Date(first.dueDate).getTime() - new Date(second.dueDate).getTime();
      return dueDateSort === "asc" ? difference : -difference;
    });
  }, [tasks, query, label, priority, assignee, dueDateSort]);

  const columnData = useMemo(() => makeColumns(visibleTasks), [visibleTasks]);

  function handleBoardChange(updatedColumns: TaskColumn[]) {
    const statusByTaskId = new Map(
      updatedColumns.flatMap((column) => column.cards.map((task) => [task._id, column.id] as const))
    );
    setTasks((currentTasks) => currentTasks.map((task) => {
      const nextStatus = statusByTaskId.get(task._id);
      return nextStatus ? { ...task, status: nextStatus } : task;
    }));
  }

  function clearFilters() {
    setQuery("");
    setLabel("");
    setPriority("");
    setAssignee("");
    setDueDateSort(null);
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] min-h-0 flex-col gap-4 p-4">
      <BoardToolbar
        query={query}
        label={label}
        priority={priority}
        assignee={assignee}
        dueDateSort={dueDateSort}
        users={users}
        onQueryChange={setQuery}
        onLabelChange={setLabel}
        onPriorityChange={setPriority}
        onAssigneeChange={setAssignee}
        onDueDateSortChange={() => setDueDateSort((current) => current === null ? "asc" : current === "asc" ? "desc" : null)}
        onClear={clearFilters}
      />
      <div className="flex min-h-0 flex-1 gap-4">
        <Board data={columnData} onChange={handleBoardChange} />
      </div>
    </div>
  );
}
