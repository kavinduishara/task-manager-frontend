import Board from "@/components/Board";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4 p-4 bg-blue-50">
      <div className="flex gap-4">
        <Board />
      </div>
    </div>
  );
}
