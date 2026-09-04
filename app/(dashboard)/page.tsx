"use client"
import Board from "@/components/Board";
import { getTasks } from "@/libs/api/tasks";
import type { Task, TaskColumn } from "@/types/task";
import { useEffect, useState } from "react";

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
  const [columnData, setColumnData] = useState<TaskColumn[]>(() => makeColumns([]));

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasks();
        const columns = makeColumns(tasks);
        setColumnData(columns);
      } catch (error) {
        console.error("Fetching tasks failed:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="flex h-[calc(100vh-4rem)] min-h-0 flex-col gap-4 p-4">
      <div className="flex min-h-0 flex-1 gap-4">
        <Board data={columnData} onChange={setColumnData} />
      </div>
    </div>
  );
}
