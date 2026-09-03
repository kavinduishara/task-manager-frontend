function UserStats({
  completedTasks,
  taskCount,
}: {
  completedTasks: number;
  taskCount: number;
}) {
  const remainingTasks = taskCount - completedTasks;

  const completedPercent =
    taskCount > 0
      ? Math.round((completedTasks / taskCount) * 100)
      : 0;

  const remainingPercent = 100 - completedPercent;

  return (
    <div className="bg-slate-50 rounded-xl p-3 mb-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[13px] text-slate-500">
          Task Progress
        </span>

        <span className="text-[13px] font-semibold text-slate-900">
          {completedPercent}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all"
          style={{
            width: `${completedPercent}%`,
          }}
        />
      </div>

      {/* Task counts */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500">
          Completed:{" "}
          <span className="font-medium text-slate-700">
            {completedTasks}
          </span>
        </span>

        <span className="text-slate-500">
          Remaining:{" "}
          <span className="font-medium text-slate-700">
            {remainingTasks}
          </span>
        </span>
      </div>
    </div>
  );
}

export default UserStats;