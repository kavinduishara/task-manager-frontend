import Board from "@/components/Board";

export default function Dashboard() {
  return (
    <div className="flex h-[calc(100vh-4rem)] min-h-0 flex-col gap-4 bg-blue-50 p-4">
      <div className="flex min-h-0 flex-1 gap-4">
        <Board />
      </div>
    </div>
  );
}
